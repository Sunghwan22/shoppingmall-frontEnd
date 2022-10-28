import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail';
import useProductStore from '../hooks/useProductStore';

export default function ProductDetailPage() {
  const productStore = useProductStore();

  const { productId } = useParams();

  useEffect(() => {
    productStore.fetchProduct(productId);
  });

  const { product } = productStore;

  return (
    <ProductDetail
      prodcut={product}
    />
  );
}
