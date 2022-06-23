import React, { useState, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import 'styles/Modals/WorkSpaceModal.scss';

// types
import { IWorkSpace } from 'components/Bar/Workspace/WorkSpaceBar';
import { useMutation, useQueryClient } from 'react-query';
import { patchWorkspace, postImageUpload } from 'utils/api';

interface iProps {
  onClickToggleModal: () => void;
  workspace: IWorkSpace;
}

function EditWorkSpaceModal({ onClickToggleModal, workspace }: iProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IWorkSpace>();

  const [image, setImage] = useState<string | undefined>(
    workspace.workspace_img
  );
  const [imageFile, setImageFile] = useState<File>();
  const { ref, ...rest } = register('workspace_img');

  // 폼 제출
  const queryClient = useQueryClient();
  const mutation = useMutation(patchWorkspace, {
    onSuccess: () => {
      queryClient.invalidateQueries('workspaces');
    },
  });

  const onSubmit: SubmitHandler<IWorkSpace> = async (data) => {
    const { name } = data;
    let newImage;
    if (imageFile) {
      newImage = await postImageUpload(imageFile);
    }
    mutation.mutate({
      workspace_idx: workspace.workspace_idx,
      name,
      workspace_img: newImage,
    });
    onClickToggleModal();
  };

  // 사진 업로드 버튼 커스터마이징
  const photoInputRef = useRef<HTMLInputElement | null>(null);

  const handleClickImgUpload = () => {
    photoInputRef.current?.click();
  };

  // 사진 미리보기
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append('img', img);
    setImageFile(img);
    setImage(URL.createObjectURL(img));
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
            <h1>서버 수정</h1>
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
                {...rest}
                name="image"
                style={{ display: 'none' }}
                ref={(e) => {
                  ref(e);
                  photoInputRef.current = e;
                }}
                onChange={onFileChange}
              />
              {/* 이미지 업로드 버튼 */}
              <img
                src={image}
                alt="workspace-img"
                className="Modal__Form__image-preview"
                onClick={handleClickImgUpload}
                aria-hidden="true"
              />
            </label>

            <label htmlFor="name" className="Modal__Form__Title">
              <span>서버 이름</span>
              {errors.name && (
                <div className="Modal__Form__error-message">
                  Title is Required!
                </div>
              )}
              <input
                defaultValue={workspace.name}
                {...register('name', { required: true })}
              />
            </label>

            {/* 서버 추가 버튼 */}
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

export default EditWorkSpaceModal;
