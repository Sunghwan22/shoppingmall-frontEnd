import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import ProductBestReviews from '../components/ProductBestReviews';

import ProductDetailDescription from '../components/ProductDetaiDescription';
import ProductInformation from '../components/ProductInformation';
import ProductInquiries from '../components/ProductInquiries';
import ProductReviews from '../components/ProductReviews';
import ReviewDetail from '../components/ReviewDetail';

import useProductStore from '../hooks/useProductStore';
import useReviewStore from '../hooks/userReviewStore';

export default function ProductDetailPage() {
  const productStore = useProductStore();
  const reviewStore = useReviewStore();

  const location = useLocation();

  const productId = Number(location.pathname.split('/')[2]);

  const [accessToken] = useLocalStorage('accessToken', '');
  const navigate = useNavigate();

  useEffect(() => {
    productStore.fetchProduct(productId);
    reviewStore.fetchReviews(productId);
    // inquiryStore.fetchInquiries(productId);
  }, []);

  const {
    product, thumbnailUrl, productOptions, totalPayment, quantity,
    productImages,
  } = productStore;

  const {
    reviews, totalRating, reviewImages, bestReviews,
    recommendations, pageNumbers, totalReviewsNumber, isReviewDetail,
    review, reviewImage, isBestReviewDetail,
  } = reviewStore;

  const handleSelectOption = (productOption) => {
    const amount = productOption.addAmount;

    productStore.selectOption(amount, productOption);
  };

  const handleClickAddQuantity = () => {
    productStore.addQuantity();
  };

  const handleClickReduceQuantity = () => {
    productStore.reduceQuantity();
  };

  const handleClickResetOption = () => {
    productStore.resetQuantityAndTotalPayment();
  };

  const handleClickWishes = () => {
    if (!accessToken) {
      navigate('/login');
    }

    productStore.fetchwishes(productId, accessToken);
  };

  const handleClickAddCart = () => {
    if (!accessToken) {
      navigate('/login');
      return;
    }

    productStore.addCartItem(productId, accessToken);

    if (window.confirm('장바구니에 상품이 추가됬습니다 장바구니로 이동하시겠습니까?')) {
      navigate('/cart');
    }
  };

  const handleClickRecommendation = (reviewId) => {
    if (!accessToken) {
      navigate('/login');
    }

    reviewStore.fetchRecommendation(accessToken, reviewId, productId);
  };

  const handleClickPageNumbers = (number) => {
    reviewStore.changePageNumber(productId, number);
  };

  const handleClickReview = (reviewId) => {
    reviewStore.fetchReview(reviewId);
  };

  const handleBestClickReview = (reviewId) => {
    reviewStore.fetchBestReview(reviewId);
  };

  const handleClickExitReviewDetail = () => {
    reviewStore.exitReviewDetail();
  };

  const handleClickExitBestReviewDetail = () => {
    reviewStore.exitBestReviewDetail();
  };

  return (
    <div>
      <ProductInformation
        product={product}
        thumbnailUrl={thumbnailUrl}
        productOptions={productOptions}
        handleSelectOption={handleSelectOption}
        totalPayment={totalPayment}
        handleClickAddQuantity={handleClickAddQuantity}
        handleClickReduceQuantity={handleClickReduceQuantity}
        quantity={quantity}
        handleClickResetOption={handleClickResetOption}
        handleClickWishes={handleClickWishes}
        handleClickAddCart={handleClickAddCart}
      />
      {isBestReviewDetail ? (
        <ReviewDetail
          review={review}
          recommendations={recommendations}
          reviewImage={reviewImage}
          onClickRecommendation={handleClickRecommendation}
          onClickExitReviewDetail={handleClickExitBestReviewDetail}
        />
      ) : (
        <ProductBestReviews
          totalRating={totalRating}
          bestReviews={bestReviews}
          reviewImages={reviewImages}
          recommendations={recommendations}
          pageNumbers={pageNumbers}
          onClickRecommendation={handleClickRecommendation}
          onClickPageNumber={handleClickPageNumbers}
          totalReviewsNumber={totalReviewsNumber}
          onClickBestReview={handleBestClickReview}
        />
      )}
      <ProductDetailDescription
        product={product}
        productImages={productImages}
      />
      {isReviewDetail
        ? (
          <ReviewDetail
            review={review}
            recommendations={recommendations}
            reviewImage={reviewImage}
            onClickRecommendation={handleClickRecommendation}
            onClickExitReviewDetail={handleClickExitReviewDetail}
          />
        )
        : (
          <ProductReviews
            totalRating={totalRating}
            reviews={reviews}
            reviewImages={reviewImages}
            recommendations={recommendations}
            pageNumbers={pageNumbers}
            onClickRecommendation={handleClickRecommendation}
            onClickPageNumber={handleClickPageNumbers}
            totalReviewsNumber={totalReviewsNumber}
            onClickReview={handleClickReview}
          />
        )}
      <ProductInquiries />
    </div>
  );
}
