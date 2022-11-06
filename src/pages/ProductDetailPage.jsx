import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductBestReview from '../components/ProductBestReview';
import ProductDetailDescription from '../components/ProductDetaiDescription';
import ProductInformation from '../components/ProductInformation';
import ProductReviews from '../components/ProductReviews';

import useProductStore from '../hooks/useProductStore';
import useReviewStore from '../hooks/userReviewStore';

export default function ProductDetailPage() {
  const productStore = useProductStore();
  const reviewStore = useReviewStore();

  const location = useLocation();

  const productId = Number(location.pathname.split('/')[2]);

  useEffect(() => {
    productStore.fetchProduct(productId);
    reviewStore.fetchReviews(productId);
  }, []);

  const {
    product, thumbnailUrl, productOptions, totalPayment, quantity,
    productImages,
  } = productStore;

  const {
    reviews, bestReviews, totalRating, reviewImages,
    recommendations,
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

  const handleClickWishes = (accessToken) => {
    productStore.fetchwishes(productId, accessToken);
  };

  const handleClickAddCart = (accessToken) => {
    productStore.addCartItem(productId, accessToken);
  };

  const handleClickRecommendation = (accessToken, reviewId) => {
    reviewStore.fetchRecommendation(accessToken, reviewId, productId);
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
      <ProductBestReview
        totalRating={totalRating}
        bestReviews={bestReviews}
        reviews={reviews}
        reviewImages={reviewImages}
      />
      <ProductDetailDescription
        product={product}
        productImages={productImages}
      />
      <ProductReviews
        totalRating={totalRating}
        reviews={reviews}
        reviewImages={reviewImages}
        recommendations={recommendations}
        onClickRecommendation={handleClickRecommendation}
      />
    </div>
  );
}
