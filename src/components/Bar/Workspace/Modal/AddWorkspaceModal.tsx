import React, { useState, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { useMutation, useQueryClient } from 'react-query';
import { postImageUpload, postWorkspace, postChatRoom } from 'utils/api';

import defaultImg from 'assets/default-img.jpeg';

// types
import { IWorkSpace } from 'components/Bar/Workspace/WorkspaceBar/WorkspaceBar';

import styles from './WorkspaceModal.module.scss';

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
    onSuccess: (data) => {
      queryClient.invalidateQueries('workspaces');
      postChatRoom(data.data.workspace_idx);
    },
  });

  const onSubmit: SubmitHandler<IWorkSpace> = async (data) => {
    const { name } = data;

    // 이미지 따로, 이름 따로 api 요청
    let imageSrc = defaultImg;
    if (preview) {
      imageSrc = await postImageUpload(imageFile);
    }
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
    <div className={styles.background}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {/* 나가기 버튼 */}
          <button
            type="button"
            onClick={onClickToggleModal}
            className={styles.close_button}
          >
            X
          </button>

          <div className={styles.description}>
            <h1>서버 만들기</h1>
            <h2>서버는 나와 친구들이 함께 어울리는 공간입니다.</h2>
          </div>

          {/* title, image 입력 */}
          <div className={styles.input}>
            <label htmlFor="image" className={styles.image}>
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
                  className={styles.image_preview}
                  onClick={handleClickImgUpload}
                  aria-hidden="true"
                />
              ) : (
                <div className={styles.image_upload}>
                  <FontAwesomeIcon
                    icon={faCamera}
                    onClick={handleClickImgUpload}
                    className={styles.upload_icon}
                  />
                  <p>Upload</p>
                </div>
              )}
            </label>

            <label htmlFor="Name" className={styles.title}>
              <span>서버 이름</span>
              {errors.name && (
                <div className={styles.error_message}>Name is Required!</div>
              )}
              <input
                placeholder="Name..."
                {...register('name', { required: true })}
              />
            </label>

            <input
              type="submit"
              value="제출"
              className={styles.submit_button}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddWorkSpaceModal;
