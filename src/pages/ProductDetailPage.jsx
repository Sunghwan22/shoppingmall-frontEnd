import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail';
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
  } = productStore;

  const handleSelectOption = (productOption) => {
    const amount = productOption.addAmount;

    productStore.selectOption(amount);
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

  return (
    <ProductDetail
      product={product}
      thumbnailUrl={thumbnailUrl}
      productOptions={productOptions}
      handleSelectOption={handleSelectOption}
      totalPayment={totalPayment}
      handleClickAddQuantity={handleClickAddQuantity}
      handleClickReduceQuantity={handleClickReduceQuantity}
      quantity={quantity}
      handleClickResetOption={handleClickResetOption}
    />
  );
}
