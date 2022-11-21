/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

/* eslint-disable jsx-a11y/label-has-associated-control */
export default function SearchProductForm() {
  const {
    register, handleSubmit, formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const { word } = data;

    navigate(`/search/${word}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="search-product">
        상품 검색
      </label>
      <input
        id="search-product"
        placeholder="원하는 상품을 검색해주세요"
        {...register(
          'word',
          {
            required: {
              value: true, message: '한 글자 이상 입력해주세요',
            },
          },
        )}
      />
      <button type="submit">
        검색
      </button>
      {errors.word ? <p>검색어를 입력해주세요</p> : null}
    </form>
  );
}
