import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { ModalProvider } from 'styled-react-modal';
import { Reset } from 'styled-reset';
import HomePage from '../pages/HomePage';
import InquiryFormPage from '../pages/InquiryFormPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import SearchProductResultPage from '../pages/SearchProductResultPage';

import Header from './Header';

const Main = styled.main`
  max-width: 768px;
  min-height: 100%;
  display: flex;
`;

export default function App() {
  return (
    <div>
      <Reset />
      <Header />
      <ModalProvider>
        <Main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/:productId" element={<ProductDetailPage />} />
            <Route path="/inquiry/write" element={<InquiryFormPage />} />
            <Route path="/search/:word" element={<SearchProductResultPage />} />
          </Routes>
        </Main>
      </ModalProvider>
    </div>
  );
}
