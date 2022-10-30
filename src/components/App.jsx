import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { Reset } from 'styled-reset';
import HomePage from '../pages/HomePage';
import ProductDetailPage from '../pages/ProductDetailPage';
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
      <Main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:1" element={<ProductDetailPage />} />
        </Routes>
      </Main>
    </div>
  );
}
