import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import LoginConfirmModal from '../components/LoginConfirmModal';
import Products from '../components/Products';

import useProductStore from '../hooks/useProductStore';
import useWishStore from '../hooks/useWishStore';

const Container = styled.div`
  width: 100%;
`;

export default function ProductsPage() {
  const [accessToken] = useLocalStorage('accessToken', '');
  const navigate = useNavigate();
  const [loginConfirm, setLoginConfirm] = useState(false);

  const productStore = useProductStore();
  const wishStore = useWishStore();

  useEffect(() => {
    productStore.fetchProducts({ page: 1 });
  }, []);

  const { products, pageNumbers } = productStore;

  const onClickProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  const onClickPageNumbers = (number) => {
    productStore.fetchProducts({ page: number });
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
    <Container>
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
    </Container>
  );
}
