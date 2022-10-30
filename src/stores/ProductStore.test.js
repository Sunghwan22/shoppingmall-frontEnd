import { waitFor } from '@testing-library/dom';
import ProductStore from './ProductStore';

const context = describe;

describe('productStore', () => {
  let productStore;

  beforeEach(() => {
    productStore = new ProductStore();
  });

  describe('상세 페이지 상품 정보 확인', () => {
    context('id가 1인 상품을 불러옴', () => {
      it('상품 정보를 불러옴', () => {
        waitFor(() => {
          expect(productStore.fetchProduct(1)).toStrictEqual(
            {
              id: 1,
              productNumber: 12,
              name: '아이폰 14',
              image: 's3://test-s3-image/스크린샷 2022-10-20 오후 10.55.03.png',
              maker: '애플',
              views: 1000,
              cumulativesales: 150,
              like: 100,
              options: ['맥스 + 300000', '그라파이트', '블랙', '실버'],
              price: 1500000,
              wish: 30,
            },
          );
        });
      });
    });
  });
});
