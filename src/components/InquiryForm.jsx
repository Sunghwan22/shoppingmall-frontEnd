/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  padding-left: 20%;
  padding-right: 20%;
`;

const H2 = styled.h2`
  width: 25%;
  padding-top: 2.5em;
  padding-bottom: 2em;
  font-size: 1.5em;
  font-weight: bold;
  color: #000000;
`;

const TextAreaBox = styled.div`
  display: flex;
  flex-direction: column;

  label {
    display: none;
  }

  textArea {
    padding: .7em;
    font-size: 1.2em;
  }
`;

const CheckBox = styled.div`
   padding-top: 1.5em;

   label {
    padding-left: .7em;
   }

   input {
    padding-left: 1em;
    -webkit-transform: scale(1.5);
   }
`;

const Buttons = styled.div`
  width: 100%;
  padding-top: 3em;
  display: flex;
  justify-content: center;
`;

const RegisterButton = styled.button`
    padding: .6em 2.5em;
    font-size: 1.2em;
    background-color: green;
    border: 1px solid #adadad;
    border-radius: 3px;
    margin-left: .5em;
    color: #FFFFFF;
    cursor: pointer;
`;

const CancelButton = styled.button`
    padding: .6em 2.5em;
    font-size: 1.2em;
    background: transparent;
    border: 1px solid #adadad;
    border-radius: 3px;
    margin-left: .5em;
    cursor: pointer;
`;

const Error = styled.p`
  width: 100%;
  padding-bottom: 1em;
  padding-top: 1.5em;
  text-align: center;
  color: red;
  font-size: 1.5em;
  font-weight: bold;
`;

export default function InquiryForm(
  { onClickRegister, onClickCancel },
) {
  const {
    register, handleSubmit, formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { content, isSecret } = data;

    const inquiryInformation = { content, isSecret };

    onClickRegister(inquiryInformation);
  };

  const handleClickCancel = () => {
    onClickCancel();
  };

  return (
    <Container>
      <H2>상품 Q&A 작성하기</H2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextAreaBox>
          <label
            htmlFor="write-inquiry-form"
          >
            문의 내용
          </label>
          <textarea
            id="write-inquiry-form"
            rows="20"
            cols="75"
            maxLength="1000"
            {...register(
              'content',
              {
                required: {
                  value: true, message: '문의하실 내용을 입력해주세요',
                },
              },
            )}
            placeholder="문의하실 내용을 입력하세요"
          />
        </TextAreaBox>
        <CheckBox>
          <input
            type="checkBox"
            id="secret-inquiry"
            {...register(
              'isSecret',
            )}
          />
          <label htmlFor="secret-inquiry">
            비공개
          </label>
          {errors.content
            ? <Error>{errors.content.message}</Error> : null}
        </CheckBox>
        <Buttons>
          <RegisterButton
            type="submit"
          >
            등록
          </RegisterButton>
          <CancelButton
            type="button"
            onClick={handleClickCancel}
          >
            취소
          </CancelButton>
        </Buttons>
      </form>
    </Container>
  );
}
