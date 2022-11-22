import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Products from '../components/Products';

import useProductStore from '../hooks/useProductStore';
import useWishStore from '../hooks/useWishStore';

export default function ProductsPage() {
  const navigate = useNavigate();

  const productStore = useProductStore();
  const wishStore = useWishStore();

  useEffect(() => {
    productStore.fetchProducts();
  });

  const { products } = productStore;

  const onClickProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  const onClickPageNumber = (number) => {
    // productStore.changeProducts(number);
  };

  const onClickWishes = (productId) => {
    wishStore.createWishes(productId);
  };

  return (
    <div>
      <Products
        onClickProduct={onClickProduct}
        products={products}
        onClickWishes={onClickWishes}
      />
    </div>
  );
}
