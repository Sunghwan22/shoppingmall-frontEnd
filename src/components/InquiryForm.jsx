/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';

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
    <div>
      <h2>상품 Q&A 작성하기</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label
          htmlFor="write-inquiry-form"
        >
          문의 내용
        </label>
        <textarea
          id="write-inquiry-form"
          rows="5"
          cols="100"
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
        <p>
          글자 수
          {' '}
          /
          50
        </p>
        <label htmlFor="secret-inquiry">비공개</label>
        <input
          type="checkBox"
          id="secret-inquiry"
          {...register(
            'isSecret',
          )}
        />
        <button
          type="submit"
        >
          등록
        </button>
        <button
          type="button"
          onClick={handleClickCancel}
        >
          취소
        </button>
      </form>
      {errors.content
        ? <p>{errors.content.message}</p> : null}
    </div>
  );
}
