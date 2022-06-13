import React, { useState, Dispatch, SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import 'styles/Modals/WorkSpaceModal.scss';

interface iForm {
  title: string;
  content?: string;
}

interface iProps {
  onClickToggleModal: () => void;
  workSpaceList: iForm[];
  setWorkSpaceList: Dispatch<SetStateAction<iForm[]>>;
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
  } = useForm<iForm>();

  const onSubmit: SubmitHandler<iForm> = (newWorkSpaceList) => {
    setWorkSpaceList(workSpaceList.concat(newWorkSpaceList));
    onClickToggleModal();
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

          {/* title, content 입력 */}
          <div className="Modal__Form__Input">
            <label htmlFor="title" className="Modal__Form__Title">
              <span>서버 이름</span>
              <input
                placeholder="Title..."
                {...register('title', { required: true })}
              />
            </label>
            {errors.title && 'Title is Required!'}
            <label htmlFor="content" className="Modal__Form__Content">
              <span>서버 설명</span>
              <textarea
                placeholder="Content..."
                {...register('content', { required: true })}
              />
            </label>
            {errors.content && 'Content is Required!'}

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
