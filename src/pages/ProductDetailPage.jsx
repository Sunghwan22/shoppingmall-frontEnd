import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductBestReview from '../components/ProductBestReview';
import ProductDetailDescription from '../components/ProductDetaiDescription';
import ProductInformation from '../components/ProductInformation';
import ProductReviews from '../components/ProductReviews';

import useProductStore from '../hooks/useProductStore';

export default function ProductDetailPage() {
  const productStore = useProductStore();

  const location = useLocation();

  const productId = Number(location.pathname.split('/')[2]);

  useEffect(() => {
    productStore.fetchProduct(productId);
  }, []);

  const {
    product, thumbnailUrl, productOptions, totalPayment, quantity,
    productImages, reviews, bestReviews, totalRating, reviewImages,
  } = productStore;

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
      />
    </div>
  );
}
