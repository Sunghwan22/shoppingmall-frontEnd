/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MagnifyingGlass from '../assets/Vector.png';

const Container = styled.div`
  width: 100%;
  padding-inline: 4%;
  display: flex;
  justify-content: space-around;
  padding-top: 1.5em;
  padding-bottom: 1.5em;
  border-bottom: 1px solid #D9D9D9;
`;

const CategoryButtons = styled.div`
    button {
      border: none;
      background-color: transparent;
      padding-right: 1em;
      font-size: 1.1em;
      cursor: pointer;

      :hover {
        &:focus , &:hover, &:visited{
        text-decoration: underline; text-decoration-color: #22DAAB;
        text-underline-position: under;
        text-decoration-thickness: .2em;
       }
      }
    }
`;

const Label = styled.label`
  display: none;
`;

const Input = styled.input`
    padding-block: .3em;
    padding-left: 1em;
    padding-right : 1em;
`;

const SearchButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: transparent;
    padding-left: .3em;
    cursor: pointer;
`;

const SearchArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function SearchProductForm() {
  const {
    register, handleSubmit, formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const { word } = data;

    navigate(`/search/${word}`);
  };

  const handleClickCategory = () => {

  };

  return (
    <Container>
      <CategoryButtons>
        <button
          type="button"
          onClick={handleClickCategory}
        >
          남성패션
        </button>
        <button
          type="button"
          onClick={handleClickCategory}
        >
          여성패션
        </button>
        <button
          type="button"
          onClick={handleClickCategory}
        >
          액세서리
        </button>
        <button
          type="button"
          onClick={handleClickCategory}
        >
          가구/인테리어
        </button>
        <button
          type="button"
          onClick={handleClickCategory}
        >
          식품
        </button>
        <button
          type="button"
          onClick={handleClickCategory}
        >
          가전
        </button>
        <button
          type="button"
          onClick={handleClickCategory}
        >
          전자기기
        </button>
      </CategoryButtons>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="search-product">
          상품 검색
        </Label>
        <SearchArea>
          <Input
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
          <SearchButton
            type="submit"
          >
            <img
              src={MagnifyingGlass}
              alt="magnifyingGlass-imagess"
            />
            검색
          </SearchButton>
        </SearchArea>
        {errors.word ? <p>검색어를 입력해주세요</p> : null}
      </form>
    </Container>
  );
}
