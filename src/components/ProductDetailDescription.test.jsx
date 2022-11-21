import { render, screen } from '@testing-library/react';
import ProductDetailDescription from './ProductDetaiDescription';

const product = {
  id: 1,
  productNumber: 12,
  productName: '아이폰 14',
  maker: '애플',
  category: '전자기기',
  views: 1000,
  cumulativesales: 150,
  price: 10000,
  stock: 100,
  maximumQuantity: '50',
  description: '이것은 아이폰 14입니다',
  deliveryFee: 3000,
  options: [{ addAmount: 3000, description: '블랙' },
    { addAmount: 5000, description: '화이트' }],
  productImages: [{ url: 'imageUrl', isThumbnailImage: true },
    { url: 'imageUrl', isThumbnailImage: false }],
};

const subProductImages = [{ url: 'imageUrl', isThumbnailImage: false },
  { url: 'imageUrl', isThumbnailImage: false }];

const context = describe;

describe(('ProductDetailDescription'), () => {
  context(('상품 이미지와 설명'), () => {
    it(('썸네일 이미지가 아닌 이미지와 상품 설명'), () => {
      render(<ProductDetailDescription
        product={product}
        subProductImages={subProductImages}
      />);

      screen.getByText('이것은 아이폰 14입니다');

      screen.getAllByAltText('productImage');
    });
  });
});
