import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import LoginConfirmModal from '../components/LoginConfirmModal';
import Products from '../components/Products';

import useProductStore from '../hooks/useProductStore';
import useWishStore from '../hooks/useWishStore';

export default function ProductsPage() {
  const [accessToken] = useLocalStorage('accessToken', '');
  const navigate = useNavigate();
  const [loginConfirm, setLoginConfirm] = useState(false);

  const productStore = useProductStore();
  const wishStore = useWishStore();

  useEffect(() => {
    productStore.fetchProducts();
  }, []);

  const { products, pageNumbers } = productStore;

  const onClickProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  const onClickPageNumbers = (number) => {
    productStore.changeProductsPageNumber(number);
  };

  const onClickWishes = (productId) => {
    if (!accessToken) {
      setLoginConfirm(true);
      return;
    }

    wishStore.createWishes(productId, accessToken);
  };

  const onClickConfirm = () => {
    navigate('/login');
    setLoginConfirm(false);
  };

  const onClickStay = () => {
    setLoginConfirm(false);
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
      {loginConfirm ? (
        <LoginConfirmModal
          onClickConfirm={onClickConfirm}
          onClickStay={onClickStay}
        />
      ) : null}
    </div>
  );
}
