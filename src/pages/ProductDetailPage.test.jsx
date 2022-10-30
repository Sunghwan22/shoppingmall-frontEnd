const fetchProduct = jest.fn();

jest.mock('../hooks/useProductStore', () => () => ({
  fetchProduct,
  product: {
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
}));
