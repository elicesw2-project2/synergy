import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postImageUpload, postWorkspace, postChatRoom } from 'api/api';
import defaultImg from 'assets/default-img.jpeg';
import { IWorkSpace } from '../WorkspaceBar';
import { StaticImageData } from 'next/image';

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
  const [imageFile, setImageFile] = useState<File | StaticImageData>(
    defaultImg
  );
  const [preview, setPreview] = useState<string>('');

  // ref에서 이미지 File 가져오기
  const { ref } = register('workspace_img');

  // 폼 제출
  const queryClient = useQueryClient();
  const mutation = useMutation(postWorkspace, {
    onSuccess: (data: any) => {
      queryClient.invalidateQueries(['workspaces']);
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
    <Background>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* 나가기 버튼 */}
          <CloseButton type="button" onClick={onClickToggleModal}>
            X
          </CloseButton>

          <Description>
            <h1>서버 만들기</h1>
            <h2>서버는 나와 친구들이 함께 어울리는 공간입니다.</h2>
          </Description>

          {/* title, image 입력 */}
          <Input>
            <Image htmlFor="image">
              {/* 업로드 버튼으로 참조 */}
              <input
                type="file"
                accept="image/*"
                placeholder="Image Upload..."
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
                <Preview
                  src={preview}
                  alt="preview-img"
                  onClick={handleClickImgUpload}
                  aria-hidden="true"
                />
              ) : (
                <Upload>
                  <UploadIcon icon={faCamera} onClick={handleClickImgUpload} />
                  <p>Upload</p>
                </Upload>
              )}
            </Image>

            <Title>
              <span>서버 이름</span>
              {errors.name && <ErrorMessage>Name is Required!</ErrorMessage>}
              <input
                placeholder="Name..."
                {...register('name', { required: true })}
              />
            </Title>
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
  color: white;
  position: relative;
  width: 80%;
  height: 30rem;
  max-width: 30rem;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 15px;
  overflow: hidden;
  background-color: #495057;
`;

const Form = styled.form`
  height: 80%;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1rem;
  color: white;
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
  h1 {
    font-size: 2rem;
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
      font-size: 1.3rem;
      margin-bottom: 0.8rem;
      margin-right: auto;
    }
    input,
    textarea {
      width: 95%;
      padding: 1rem;
    }
    input {
      margin-bottom: 0.3rem;
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
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
`;

const Upload = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 5rem;
  padding: 2rem;
  border: 1px solid gray;
  border-radius: 50%;
  p {
    font-size: 1.2rem;
    padding: 0.3rem;
    opacity: 0.7;
  }
`;

const UploadIcon = styled(FontAwesomeIcon)`
  width: 3rem;
  height: 3rem;
`;

const SubmitButton = styled.input`
  position: absolute;
  right: 1.5rem;
  bottom: 2rem;
  cursor: pointer;
  border: 0;
  padding: 8px 16px;
  border-radius: 4px;
  color: black;
  background: #a9e34b;
  &:hover {
    opacity: 0.7;
  }
`;

export default AddWorkSpaceModal;
