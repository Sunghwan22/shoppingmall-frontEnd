import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { ModalProvider } from 'styled-react-modal';
import { Reset } from 'styled-reset';
import CartPage from './pages/CartPage';
import EditOrderAddressPage from './pages/EditOrderAddressPage';
import EditOrderFormPage from './pages/EditOrderFormPage';
import HomePage from './pages/HomePage';
import InquiryFormPage from './pages/InquiryFormPage';
import KakaoRedirectPage from './pages/KakaoRedirectPage';
import LoginFormPage from './pages/LoginFormPage';
import OrderFormPage from './pages/OrderFormPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductsPage from './pages/ProductsPage';
import GlobalStyle from './styles/GlobalStyle';
import Header from './components/Header';
import OrderSuccess from './components/OrderSuccess';
import SearchProductForm from './components/SearchProductForm';

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
      <SearchProductForm />
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
            <Route path="/edit-orderForm" element={<EditOrderFormPage />} />
            <Route path="/oauth/callback/kakao" element={<KakaoRedirectPage />} />
            <Route path="/edit-orderAddress" element={<EditOrderAddressPage />} />
          </Routes>
        </Main>
      </ModalProvider>
    </div>
  );
}
