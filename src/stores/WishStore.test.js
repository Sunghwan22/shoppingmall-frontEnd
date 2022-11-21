import WishStore from './WishStore';

const context = describe;

let wishStore;

describe('WishStore', () => {
  wishStore = new WishStore();

  context('상품 상세페이지를 확인할 경우', () => {
    it('상품의 찜 목록을 가져옴', async () => {
      const productId = 1;

      await wishStore.fetchProductWishes(productId);

      const { productWishes } = wishStore;

      expect(productWishes.length).toBe(2);
    });
  });

  context('상품 찜하기를 누름', () => {
    it('상품의 찜하기 갯수가 1올라감', async () => {
      const productId = 1;

      await wishStore.createWishes(productId, 'AccessToken');

      const { productWishes } = wishStore;

      expect(productWishes.length).toBe(3);
    });

    it('로그인 하지 않은 상태에서 찜하기', async () => {
      const productId = 1;

      await wishStore.createWishes(productId, '');

      const { errorMessage } = wishStore;

      expect(errorMessage).toBe('로그인 후 이용가능한 서비스 입니다');
    });
  });
});
