import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import LoginConfirmModal from '../components/LoginConfirmModal';
import ProductBestReviews from '../components/ProductBestReviews';

import ProductDetailDescription from '../components/ProductDetaiDescription';
import ProductInformation from '../components/ProductInformation';
import ProductInquiries from '../components/ProductInquiries';
import ProductReviews from '../components/ProductReviews';
import ReviewDetail from '../components/ReviewDetail';
import useInquiryStore from '../hooks/useInquiryStore';

import useProductStore from '../hooks/useProductStore';
import useReviewStore from '../hooks/useReviewStore';
import useWishStore from '../hooks/useWishStore';

const Container = styled.div`
    width: 100%;
    padding: 0 5vw 12vw 5vw;
`;

export default function ProductDetailPage() {
  const productStore = useProductStore();
  const reviewStore = useReviewStore();
  const inquiryStore = useInquiryStore();
  const wishStore = useWishStore();

  const location = useLocation();

  const productId = location.state !== null
    ? location.state.productId
    : Number(location.pathname.split('/')[2]);

  const [accessToken] = useLocalStorage('accessToken', '');
  const [loginConfirm, setLoginConfirm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    productStore.fetchProduct(productId);
    wishStore.fetchProductWishes(productId);
    reviewStore.fetchReviews({ productId, page: 1 });
    reviewStore.fetchBestReviews({ productId, page: 1 });
    inquiryStore.fetchInquiries({ productId, accessToken });
  }, []);

  const {
    product, totalPayment, quantity, options, thumbnailImage,
    subProductImages, guideMessage, selectedProductOption,
  } = productStore;

  const {
    reviews, review, bestReviews, totalRating, totalReviewsNumber, pageNumbers
    , isBestReviewDetail, bestReviewPageNumbers, isReviewDetail,
  } = reviewStore;

  const {
    inquiries, inquiry, totalInquiryNumber
    , inquiryPageNumbers,
  } = inquiryStore;

  const { productWishes } = wishStore;

  const onClickPurchase = () => {
    if (!selectedProductOption) {
      return;
    }

    if (Object.keys(selectedProductOption).length === 0) {
      productStore.checkOption();
      return;
    }

    if (!accessToken) {
      setLoginConfirm(true);
      return;
    }

    navigate('/orderForm', {
      state: {
        product,
        quantity,
        selectedProductOption,
        totalPayment,
      },
    });
  };

  const onClickSelectOption = (productOption) => {
    const amount = productOption.addAmount;

    productStore.selectOption(amount, productOption);
  };

  const onClickAddQuantity = () => {
    productStore.addQuantity();
  };

  const onClickReduceQuantity = () => {
    productStore.reduceQuantity();
  };

  const onClickResetOption = () => {
    productStore.resetQuantityAndTotalPayment();
  };

  const onClickWishes = () => {
    if (!accessToken) {
      setLoginConfirm(true);
      return;
    }

    wishStore.createWishes(productId, accessToken);
  };

  const onClickAddCart = () => {
    if (!accessToken) {
      setLoginConfirm(true);
      return;
    }

    productStore.addCartItem(productId, accessToken);
  };

  const onClickRecommendation = (reviewId) => {
    if (!accessToken) {
      setLoginConfirm(true);
      return;
    }

    reviewStore.fetchRecommendation(accessToken, reviewId, productId);
  };

  const onClickPageNumbers = (number) => {
    reviewStore.fetchReviews({ productId, page: number });
  };

  const onClickBestReviewPageNumbers = (number) => {
    reviewStore.fetchBestReviews({ productId, page: number });
  };

  const onClickBestReview = (reviewId) => {
    reviewStore.fetchBestReview(reviewId);
  };

  const onClickReview = (reviewId) => {
    reviewStore.fetchReview(reviewId);
  };

  const onClickExitReviewDetail = () => {
    reviewStore.exitReviewDetail();
  };

  const onClickExitBestReviewDetail = () => {
    reviewStore.exitBestReviewDetail();
  };

  const onClickInquiryPageNumbers = (number) => {
    inquiryStore.fetchInquiries({ productId, accessToken, page: number });
  };

  const onClickInquiry = (inquiryId) => {
    inquiryStore.fetchInquiry(inquiryId, accessToken);
  };

  const onClickWriteInquiry = () => {
    if (!accessToken) {
      setLoginConfirm(true);
      return;
    }

    navigate('/inquiry/write', {
      state: {
        productId,
      },
    });
  };

  const onClickFindMyInquiries = () => {
    if (!accessToken) {
      setLoginConfirm(true);
      return;
    }

    navigate('/mypage/');
  };

  const onClickConfirm = () => {
    navigate('/login');
    setLoginConfirm(false);
  };

  const onClickStay = () => {
    setLoginConfirm(false);
  };

  return (
    <Container>
      <ProductInformation
        product={product}
        thumbnailImage={thumbnailImage}
        options={options}
        quantity={quantity}
        totalPayment={totalPayment}
        productWishes={productWishes}
        onClickSelectOption={onClickSelectOption}
        onClickAddQuantity={onClickAddQuantity}
        onClickReduceQuantity={onClickReduceQuantity}
        onClickResetOption={onClickResetOption}
        onClickWishes={onClickWishes}
        onClickAddCart={onClickAddCart}
        onClickPurchase={onClickPurchase}
        guideMessage={guideMessage}
      />
      {isBestReviewDetail ? (
        <ReviewDetail
          review={review}
          onClickExitReviewDetail={onClickExitBestReviewDetail}
        />
      ) : (
        <ProductBestReviews
          totalRating={totalRating}
          bestReviews={bestReviews}
          bestReviewPageNumbers={bestReviewPageNumbers}
          onClickRecommendation={onClickRecommendation}
          onClickBestReviewPageNumbers={onClickBestReviewPageNumbers}
          totalReviewsNumber={totalReviewsNumber}
          onClickBestReview={onClickBestReview}
        />
      )}
      <ProductDetailDescription
        product={product}
        subProductImages={subProductImages}
      />
      {isReviewDetail
        ? (
          <ReviewDetail
            review={review}
            onClickExitReviewDetail={onClickExitReviewDetail}
          />
        )
        : (
          <ProductReviews
            totalRating={totalRating}
            reviews={reviews}
            pageNumbers={pageNumbers}
            onClickRecommendation={onClickRecommendation}
            onClickPageNumber={onClickPageNumbers}
            totalReviewsNumber={totalReviewsNumber}
            onClickReview={onClickReview}
          />
        )}
      <ProductInquiries
        inquiries={inquiries}
        totalInquiryNumber={totalInquiryNumber}
        inquiryPageNumbers={inquiryPageNumbers}
        onClickInquiryPageNumbers={onClickInquiryPageNumbers}
        onClickInquiry={onClickInquiry}
        inquiry={inquiry}
        onClickFindMyInquiries={onClickFindMyInquiries}
        onClickWriteInquiry={onClickWriteInquiry}
      />
      {loginConfirm ? (
        <LoginConfirmModal
          onClickConfirm={onClickConfirm}
          onClickStay={onClickStay}
        />
      ) : null}
    </Container>
  );
}
