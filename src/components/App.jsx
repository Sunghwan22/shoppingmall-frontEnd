import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { ModalProvider } from 'styled-react-modal';
import { Reset } from 'styled-reset';
import CartPage from '../pages/CartPage';
import HomePage from '../pages/HomePage';
import InquiryFormPage from '../pages/InquiryFormPage';
import LoginFormPage from '../pages/LoginFormPage';
import OrderFormPage from '../pages/OrderFormPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import ProductsPage from '../pages/ProductsPage';
import GlobalStyle from '../styles/GlobalStyle';

import Header from './Header';
import OrderSuccess from './OrderSuccess';

const Main = styled.main`
  min-width: 768px;
  max-width: 1920px;
  min-height: 100%;
  display: flex;
`;

export default function App() {
  return (
    <div>
      <Reset />
      <GlobalStyle />
      <Header />
      <ModalProvider>
        <Main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:productId" element={<ProductDetailPage />} />
            <Route path="/inquiry/write" element={<InquiryFormPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/orderForm" element={<OrderFormPage />} />
            <Route path="/order/success" element={<OrderSuccess />} />
            <Route path="/order/cancel" element={<OrderSuccess />} />
            <Route path="/order/fail" element={<OrderSuccess />} />
            <Route path="/login" element={<LoginFormPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Main>
      </ModalProvider>
    </div>
  );
}
