import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import Products from '../components/Products';

import useProductStore from '../hooks/useProductStore';
import useWishStore from '../hooks/useWishStore';

export default function ProductsPage() {
  const [accessToken] = useLocalStorage('accessToken', '');
  const navigate = useNavigate();

  const productStore = useProductStore();
  const wishStore = useWishStore();

  useEffect(() => {
    productStore.fetchProducts();
  });

  const { products, pageNumbers } = productStore;

  const onClickProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  const onClickPageNumbers = (number) => {
    productStore.changeProductsPageNumber(number);
  };

  const onClickWishes = (productId) => {
    wishStore.createWishes(productId, accessToken);
  };

  return (
    <div>
      <Products
        onClickProduct={onClickProduct}
        products={products}
        onClickWishes={onClickWishes}
        onClickPageNumbers={onClickPageNumbers}
        pageNumbers={pageNumbers}
      />
    </div>
  );
}
