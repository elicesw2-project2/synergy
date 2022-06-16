import React, { useState, Dispatch, SetStateAction, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

import 'styles/Modals/WorkSpaceModal.scss';

// types
import { iWorkSpace } from 'types';

import defaultImg from 'assets/default-img.jpeg';

interface iProps {
  onClickToggleModal: () => void;
  workSpaceList: iWorkSpace[];
  setWorkSpaceList: Dispatch<SetStateAction<iWorkSpace[]>>;
}

function WorkSpaceModal({
  onClickToggleModal,
  workSpaceList,
  setWorkSpaceList,
}: iProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iWorkSpace>();

  const [preview, setPreview] = useState<string>('');

  // 폼 제출
  const onSubmit: SubmitHandler<iWorkSpace> = (data) => {
    const { idx, title } = data;
    let image = preview;
    if (!preview) {
      image = defaultImg;
    }
    const newWorkSpace = { idx, title, image };
    setWorkSpaceList(workSpaceList.concat(newWorkSpace));
    onClickToggleModal();
  };

  // 사진 업로드 버튼 커스터마이징
  const photoInput = useRef<HTMLInputElement>(null);

  const handleClickImgUpload = () => {
    photoInput.current?.click();
  };

  // 사진 미리보기
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append('img', img);
    // axios FormData type?
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
                {...register('image')}
                style={{ display: 'none' }}
                ref={photoInput}
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

            <label htmlFor="title" className="Modal__Form__Title">
              <span>서버 이름</span>
              {errors.title && (
                <div className="Modal__Form__error-message">
                  Title is Required!
                </div>
              )}
              <input
                placeholder="Title..."
                {...register('title', { required: true })}
              />
            </label>

            {/* <label htmlFor="content" className="Modal__Form__Content">
              <span>서버 설명</span>
              <textarea
              placeholder="Content..."
              {...register('content', { required: true })}
              />
              </label>
            {errors.content && 'Content is Required!'} */}

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

export default WorkSpaceModal;
