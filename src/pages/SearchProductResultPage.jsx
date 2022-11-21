import { useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import SearchProductsResults from '../components/SearchProductsResults';
import useProductStore from '../hooks/useProductStore';
import numberFormat from '../utils/NumberFormat';

export default function SearchProductResultPage() {
  const params = useParams();
  const navigate = useNavigate();

  const productStore = useProductStore();

  const { word } = params;

  useEffect(() => {
    productStore.searchProduct(word);
  });

  const { products } = productStore;

  const onClickProduct = (productId) => {
    navigate(`/products/${productId}`);
  };

  const onClickPageNumber = (number) => {
    // productStore.changeProducts(number);
  };

  return (
    <div>
      <SearchProductsResults
        onClickProduct={onClickProduct}
      />
    </div>
  );
}
