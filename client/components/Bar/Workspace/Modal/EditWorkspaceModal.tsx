import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchWorkspace, postImageUpload } from 'apis';
import { IWorkSpace } from '../WorkspaceBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

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
      queryClient.invalidateQueries(['workspaces']);
    },
  });

  const onSubmit: SubmitHandler<IWorkSpace> = async (data) => {
    const { name } = data;
    let newImage = workspace.workspace_img;
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
    <Background>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* 나가기 버튼 */}
          <CloseButton type="button" onClick={onClickToggleModal}>
            <FontAwesomeIcon icon={faX} />
          </CloseButton>

          <Description>
            <h1>워크스페이스 수정</h1>
          </Description>

          {/* title, image 입력 */}
          <Input>
            <Image htmlFor="image">
              {/* 업로드 버튼으로 참조 */}
              <input
                type="file"
                accept="image/*"
                placeholder="Image Upload..."
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
              <Preview
                src={image}
                alt="workspace-img"
                onClick={handleClickImgUpload}
                aria-hidden="true"
              />
            </Image>

            <Title htmlFor="name">
              <span>서버 이름</span>
              {errors.name && <ErrorMessage>Title is Required!</ErrorMessage>}
              <input
                defaultValue={workspace.name}
                {...register('name', { required: true })}
              />
            </Title>

            {/* 서버 추가 버튼 */}
            <SubmitButton type="submit" value="제출" />
          </Input>
        </Form>
      </Container>
    </Background>
  );
}

const Background = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
`;

const Container = styled.div`
  position: relative;
  width: 80%;
  height: 450px;
  max-width: 450px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 15px;
  overflow: hidden;
  color: #3b4463;
  background-color: #fff;
`;

const Form = styled.form`
  height: 80%;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 1.5rem;
  border: 0;
  border-radius: 4px;
  padding: 4px 8px;
  background: inherit;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background: #ced4da;
  }
`;

const Description = styled.div`
  text-align: center;
  margin-top: 20px;
  line-height: 1.2;
  h1 {
    font-size: 25px;
    margin-bottom: 0.7rem;
  }

  h2 {
    opacity: 0.5;
    margin-bottom: 0.7rem;
  }
`;

const Image = styled.label``;

const Title = styled.label``;

const Input = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;

  ${Image}, ${Title} {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.8rem 0;
    span {
      font-size: 20px;
      margin: 10px auto 12px 5px;
    }
    input,
    textarea {
      width: 100%;
      padding: 1rem;
    }
    input {
      margin-bottom: 0.3rem;
      border: 1px solid #a3a6ba;
      border-radius: 24px;
    }
    textarea {
      height: 10rem;
      resize: none;
    }
  }
`;

const ErrorMessage = styled.div`
  position: absolute;
  right: 2rem;
  color: red;
  opacity: 0.8;
`;

const Preview = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 50%;
`;

const SubmitButton = styled.input`
  position: absolute;
  right: 2.5rem;
  bottom: 2rem;
  cursor: pointer;
  border: 0;
  padding: 8px 16px;
  border-radius: 4px;
  color: #fff;
  background: #8270ff;
  &:hover {
    opacity: 0.7;
  }
`;

export default EditWorkSpaceModal;
