import ProductStore from './ProductStore';

const context = describe;

describe('productStore', () => {
  let productStore;

  beforeEach(() => {
    productStore = new ProductStore();
  });

  context('id가 1인 상품을 불러옴', () => {
    it('상품 정보를 불러옴', async () => {
      const productId = 1;

      await productStore.fetchProduct(productId);

      const { product } = productStore;

      expect(product).toStrictEqual({
        id: 1,
        productNumber: 12,
        productName: '아이폰 14',
        maker: '애플',
        category: '전자기기',
        views: 1000,
        cumulativesales: 150,
        price: 1500000,
        stock: 100,
        maximumQuantity: '50',
        description: '이것은 아이폰 14입니다',
        deliveryFee: '3000',
        options: [{ addAmount: 3000, description: '블랙' },
          { addAmount: 5000, description: '화이트' }],
        productImages: [{ url: 'imageUrl', isThumbnailImage: true },
          { url: 'imageUrl', isThumbnailImage: false }],
      });
    });
  });

  context('상품 옵션 선택', () => {
    it('selectOption함수 실행', async () => {
      const productId = 1;

      await productStore.fetchProduct(productId);

      const amount = 20000;
      const productOption = { addAmount: 3000, description: '블랙' };

      await productStore.selectOption(amount, productOption);

      const { product, totalPayment, selectOptionPrice } = productStore;

      expect(product.price).toBe(1500000);
      expect(totalPayment).toBe(1520000);
      expect(selectOptionPrice).toBe(1520000);
    });
  });

  context('상품 수량 +1', () => {
    it('addQuantity함수 실행', async () => {
      const productId = 1;

      await productStore.fetchProduct(productId);

      const amount = 20000;
      const productOption = { addAmount: 3000, description: '블랙' };

      await productStore.selectOption(amount, productOption);

      await productStore.addQuantity();

      const { quantity, totalPayment } = productStore;

      expect(quantity).toBe(2);
      expect(totalPayment).toBe(3040000);
    });
  });

  context('상품 수량 -1', () => {
    it('reduceQuantity함수 실행', async () => {
      const productId = 1;

      await productStore.fetchProduct(productId);

      const amount = 20000;
      const productOption = { addAmount: 3000, description: '블랙' };

      await productStore.selectOption(amount, productOption);

      await productStore.addQuantity();

      await productStore.reduceQuantity();

      const { quantity, totalPayment } = productStore;

      expect(quantity).toBe(1);
      expect(totalPayment).toBe(1520000);
    });
  });

  context('상품 수량 -1', () => {
    it('reduceQuantity함수 실행', async () => {
      const productId = 1;

      await productStore.fetchProduct(productId);

      const amount = 20000;
      const productOption = { addAmount: 3000, description: '블랙' };

      await productStore.selectOption(amount, productOption);

      await productStore.addQuantity();

      await productStore.resetQuantityAndTotalPayment();

      const { quantity, totalPayment } = productStore;

      expect(quantity).toBe(1);
      expect(totalPayment).toBe(0);
    });
  });

  context('상품 목록 불러오기', () => {
    it('fetchProducts함수 실행', async () => {
      await productStore.fetchProducts();

      const { products } = productStore;

      expect(products.length).toBe(1);
      expect(products[0].productName).toBe('아이폰 13');
      expect(products[0].price).toBe(1000000);
      expect(products[0].cumulativesales).toBe(120);
    });
  });

  context('상품 목록 페이지 전환하기', () => {
    it('2페이지에 있는 상품을 보여줌 ', async () => {
      await productStore.changeProductsPageNumber(2);

      const { products } = productStore;

      expect(products.length).toBe(1);
      expect(products[0].productName).toBe('아이폰 14');
      expect(products[0].price).toBe(1500000);
      expect(products[0].cumulativesales).toBe(150);
    });
  });
});
