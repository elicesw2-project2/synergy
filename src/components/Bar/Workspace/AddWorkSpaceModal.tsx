import React, { useState, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

import defaultImg from 'assets/default-img.jpeg';

import 'styles/Modals/WorkSpaceModal.scss';

// types
import { IWorkSpace } from 'components/Bar/Workspace/WorkSpaceBar';
import { postImageUpload, postWorkspace } from 'utils/api';
import { useMutation, useQueryClient } from 'react-query';

interface iProps {
  onClickToggleModal: () => void;
}

function AddWorkSpaceModal(props: iProps) {
  const { onClickToggleModal } = props;

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IWorkSpace>();

  // state
  const [imageFile, setImageFile] = useState<File>(defaultImg);
  const [preview, setPreview] = useState<string>('');

  // ref에서 이미지 File 가져오기
  const { ref, ...rest } = register('workspace_img');

  // 폼 제출
  const queryClient = useQueryClient();
  const mutation = useMutation(postWorkspace, {
    onSuccess: () => {
      queryClient.invalidateQueries('workspaces');
    },
  });

  const onSubmit: SubmitHandler<IWorkSpace> = async (data) => {
    const { name } = data;

    // 이미지 따로, 이름 따로 api 요청
    const imageSrc = await postImageUpload(imageFile);
    const newWorkSpace = { name, profile: imageSrc };
    mutation.mutate(newWorkSpace);

    // 모달창 닫기
    onClickToggleModal();
  };

  // 사진 업로드 버튼 커스터마이징
  const photoInputRef = useRef<HTMLInputElement | null>(null);
  const handleClickImgUpload = () => {
    photoInputRef.current?.click();
  };

  // 사진 미리보기
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const img = e.target.files[0];
    setImageFile(img);
    setPreview(URL.createObjectURL(img));
  };

  return (
    <div className="Modal__Background">
      <div className="Modal__Container">
        <form onSubmit={handleSubmit(onSubmit)} className="Modal__Form">
          {/* 나가기 버튼 */}
          <button
            type="button"
            onClick={onClickToggleModal}
            className="Modal__Form__CloseBtn"
          >
            X
          </button>

          <div className="Modal__Form__Description">
            <h1>서버 만들기</h1>
            <h2>서버는 나와 친구들이 함께 어울리는 공간입니다.</h2>
          </div>

          {/* title, image 입력 */}
          <div className="Modal__Form__Input">
            <label htmlFor="image" className="Modal__Form__Image">
              {/* 업로드 버튼으로 참조 */}
              <input
                type="file"
                accept="image/*"
                placeholder="Image Upload..."
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...register('workspace_img')}
                style={{ display: 'none' }}
                ref={(e) => {
                  ref(e);
                  photoInputRef.current = e;
                }}
                onChange={onFileChange}
              />
              {/* 이미지 업로드 버튼 */}
              {preview ? (
                <img
                  src={preview}
                  alt="preview-img"
                  className="Modal__Form__image-preview"
                  onClick={handleClickImgUpload}
                  aria-hidden="true"
                />
              ) : (
                <div className="Modal__Form__image-upload">
                  <FontAwesomeIcon
                    icon={faCamera}
                    onClick={handleClickImgUpload}
                    className="Modal__Form__image-upload-icon"
                  />
                  <p>Upload</p>
                </div>
              )}
            </label>

            <label htmlFor="Name" className="Modal__Form__Title">
              <span>서버 이름</span>
              {errors.name && (
                <div className="Modal__Form__error-message">
                  Name is Required!
                </div>
              )}
              <input
                placeholder="Name..."
                {...register('name', { required: true })}
              />
            </label>

            <input
              type="submit"
              value="제출"
              className="Modal__Form__SubmitBtn"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddWorkSpaceModal;
