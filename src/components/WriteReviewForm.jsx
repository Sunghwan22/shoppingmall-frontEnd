/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';
import { useLocalStorage } from 'usehooks-ts';
import useWriteableReviewProductStore from '../hooks/useWriteableReviewProductStore';
import useReviewFormStore from '../hooks/useReviewFormStore';
import useReviewStore from '../hooks/useReviewStore';

const Container = styled.div`
  width: 100%;
`;

const H2 = styled.h2`
   font-size: 1.1em;
`;

const ProductInformation = styled.div`
    display: flex; 
    width: 90%;
    padding-top: 2em;
`;

const Image = styled.img`
  
`;

const Date = styled.p`
  padding-bottom: 1em;
`;

const ProductName = styled.div`
  padding-left: 2em;
  font-size: .8em;
`;

const StarRating = styled.div`
  display: flex;
  align-items: center;
  padding-top: 2em;
  font-size: .8em;

  p {
    padding-right: 1.5em;
  }
`;

const Scoring = styled.div`
  padding-right: 1em;

 & svg {
    color: #C4C4C4;
    cursor: pointer;
  }

  :hover svg{
    color:#fcc419;
  }

  & svg:hover ~ svg {
    color: #C4C4C4;
  }

  .yellowStar {
    color: #fcc419;
  }
`;

const ReviewForm = styled.div`
  padding-top: 1.5em;
  width: 100%;

  p {
    padding-bottom: 1em;
    font-size: .8em;
  }

  textarea {
    padding: 1em;
    font-size: .8em;
    width: 90%;
  }
`;

const ButtonArea = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  padding-bottom: 1em;
  padding-top: 3em;
`;

const RegisterButton = styled.button`
    font-size: .7em;
    padding-inline: 3em;
    padding-block: 0.5em;
    border-radius: 5px;
    cursor: pointer;
    background-color: #35992D;
    color: white;
    border: none;

    :hover {
      background-color: #1F561B;
    }
`;

const PreviewImages = styled.div`
  width: 100%;
  display: flex;
  overflow: scroll;
  padding-top: 1em;
`;

const PreviewImage = styled.img`
  padding-right: 1em;
`;

const ImageUploadInput = styled.div`
  margin-top: 1em;
  width: 15%;
  background-color: #35992D;
  text-align: center;
  padding-top: .4em;
  padding-bottom: .4em;
  border-radius: 5px;

  :hover {
    background-color: #1F561B;
  }

  label {
    font-size: .6em;
    line-height: normal;
    vertical-align: middle;
    cursor: pointer;   
    color: white;
    padding-bottom  : 1em;
  }
    
  input {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;

const PreviewImageBox = styled.div` 
  width: 50%;
  font-size: 1.5em;
  display: flex;   
  padding-right: 1em;
`;

const Error = styled.p`
  width: 90%;
  text-align: center;
  align-items: center;
  padding-bottom: 3em;
  color: red;
`;

const ContentLength = styled.p`
  font-size: .6em;
  width: 90%;
  padding-top: 1em;
  text-align: end;
`;

export default function WriteReviewForm({
  writeReviewId,
}) {
  const [clicked, setClicked] = useState([false, false, false, false, false]);

  const [accessToken] = useLocalStorage('accessToken', '');

  const writeableReviewProductStore = useWriteableReviewProductStore();
  const reviewFormStore = useReviewFormStore();
  const reviewStore = useReviewStore();

  useEffect(() => {
    if (writeReviewId) {
      writeableReviewProductStore.fetchWriteableProduct(writeReviewId);
    }
  }, []);

  const { writeableReviewProduct } = writeableReviewProductStore;
  const {
    preViewImages, rating, content, errorMessage, uploadImages,
  } = reviewFormStore;

  const handleClickStar = async (index) => {
    const clickStates = [...clicked];

    for (let i = 0; i < 5; i += 1) {
      clickStates[i] = i <= index;
    }

    setClicked(clickStates);

    await reviewFormStore.changeRating(clickStates);
  };

  const handleChangeContent = (event) => {
    const { value } = event.target;

    reviewFormStore.changeContent(value);
  };

  const array = [0, 1, 2, 3, 4];

  const handleChangeUploadFile = async (event) => {
    const imageList = [...event.target.files];

    await reviewFormStore.changeUploadImage(imageList);

    const imageUrlLists = [];

    imageList.forEach((image) => (
      imageUrlLists.push(URL.createObjectURL(image))
    ));

    if (imageUrlLists.length > 6) {
      const images = imageUrlLists.slice(0, 6);
      await reviewFormStore.changeUploadImage(images);
      return;
    }

    await reviewFormStore.changePreViewImage(imageUrlLists);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!rating) {
      await reviewFormStore.ratingErrorMessage();
      return;
    }

    if (content.length < 20) {
      await reviewFormStore.contentLengthErrorMessage();
      return;
    }

    await reviewStore.createReview({
      uploadImages,
      rating,
      content,
      accessToken,
      productId: writeableReviewProduct.productId,
      description: writeableReviewProduct.description,
      writeReviewId,
    });
  };

  return (
    <Container>
      <form onSubmit={(event) => handleSubmit(event)}>
        <H2>리뷰 작성하기</H2>
        <ProductInformation>
          <Image
            src={writeableReviewProduct.imageUrl}
            alt="productImage"
            width="200px"
            height="190px"
          />
          <ProductName>
            <Date>
              {writeableReviewProduct.createdAt}
            </Date>
            <p>
              {writeableReviewProduct.name}
              {' '}
              옵션
              /
              {' '}
              {writeableReviewProduct.description}
            </p>
          </ProductName>
        </ProductInformation>
        <StarRating>
          <p>
            상품은 만족하셨나요?
          </p>
          <Scoring>
            {array.map((element) => (
              <FaStar
                key={element}
                onClick={() => handleClickStar(element)}
                className={clicked[element] && 'yellowStar'}
                size="30"
              />
            ))}
          </Scoring>
        </StarRating>
        <ReviewForm>
          <p>
            상품에 대한 평을 20자 이상 작성해 주세요
          </p>
          <textarea
            minLength="20"
            rows="20"
            maxLength="500"
            placeholder="내용"
            onChange={(event) => handleChangeContent(event)}
          />
        </ReviewForm>
        <ContentLength>
          {content.length}
          {' '}
          / 500자
        </ContentLength>
        <ImageUploadInput>
          <label htmlFor="uploadFile">
            이미지 업로드
          </label>
          <input
            id="uploadFile"
            type="file"
            multiple
            accept="image/*"
            onChange={(event) => handleChangeUploadFile(event)}
          />
        </ImageUploadInput>
        <PreviewImages>
          {preViewImages.length ? (
            preViewImages.map((image) => (
              <PreviewImageBox>
                <PreviewImage
                  key={image}
                  src={image}
                  alt="PreviewImage"
                  width="200px"
                  height="180px"
                />
              </PreviewImageBox>
            ))
          ) : null}
        </PreviewImages>
        <ButtonArea>
          <RegisterButton
            type="submit"
          >
            등록
          </RegisterButton>
        </ButtonArea>
      </form>
      {errorMessage ? (
        <Error>{errorMessage}</Error>
      ) : null}
    </Container>
  );
}
