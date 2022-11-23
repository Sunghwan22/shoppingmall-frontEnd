import {
  fireEvent, render, screen,
} from '@testing-library/react';
import ProductInformation from './ProductInformation';

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

const thumbnailImage = { url: 'imageUrl', isThumbnailImage: true };

const options = [{ addAmount: 3000, description: '블랙' },
  { addAmount: 5000, description: '화이트' }];

const productWishes = [{ id: 1, userId: 1, productId: 1 },
  { id: 2, userId: 2, productId: 1 }];

let totalPayment;
let quantity;
const onClickSelectOption = jest.fn();
const onClickAddQuantity = jest.fn();
const onClickReduceQuantity = jest.fn();
const onClickResetOption = jest.fn();
const onClickWishes = jest.fn();
const onClickAddCart = jest.fn();

const context = describe;

describe(('상품 상세 페이지'), () => {
  context(('상품 정보 확인'), () => {
    it('상품 이미지와 가격 확인', async () => {
      render(<ProductInformation
        product={product}
        thumbnailImage={thumbnailImage}
        options={options}
        productWishes={productWishes}
      />);

      screen.getByText('Product Info');
      screen.getByText(/애플/);
      screen.getByText('1,000회');
      screen.getByText('10,000원');
      screen.getByAltText('productProfile');
      screen.getByText('배송비');
      screen.getByText('3,000원');
    });

    it('상품 옵션 선택하기', () => {
      render(<ProductInformation
        product={product}
        onClickSelectOption={onClickSelectOption}
        totalPayment={totalPayment}
        quantity={quantity}
        options={options}
        thumbnailImage={thumbnailImage}
        productWishes={productWishes}
      />);

      fireEvent.change(screen.getByLabelText('상품 옵션'), {
        target: { value: '{"addAmount":3000,"description":"블랙"}' },
      });

      expect(onClickSelectOption).toBeCalledWith(
        { addAmount: 3000, description: '블랙' },
      );
    });

    it('상품 옵션 초기화 하기', async () => {
      render(<ProductInformation
        product={product}
        onClickSelectOption={onClickSelectOption}
        totalPayment={totalPayment}
        quantity={quantity}
        options={options}
        thumbnailImage={thumbnailImage}
        productWishes={productWishes}
        onClickResetOption={onClickResetOption}
      />);

      fireEvent.change(screen.getByLabelText('상품 옵션'), {
        target: { value: '{"addAmount":3000,"description":"블랙"}' },
      });

      expect(onClickSelectOption).toBeCalledWith(
        { addAmount: 3000, description: '블랙' },
      );

      fireEvent.change(screen.getByLabelText('상품 옵션'), {
        target: { value: '옵션을 선택해주세요' },
      });

      expect(onClickResetOption).toBeCalled();
    });

    it('장바구니 추가 하기', () => {
      render(<ProductInformation
        product={product}
        onClickSelectOption={onClickSelectOption}
        totalPayment={totalPayment}
        quantity={quantity}
        options={options}
        thumbnailImage={thumbnailImage}
        productWishes={productWishes}
        onClickResetOption={onClickResetOption}
        onClickAddCart={onClickAddCart}
      />);

      fireEvent.change(screen.getByLabelText('상품 옵션'), {
        target: { value: '{"addAmount":3000,"description":"블랙"}' },
      });

      fireEvent.click(screen.getByText('장바구니'));

      expect(onClickAddCart).toBeCalled();
    });

    it('옵션을 추가 하지 않고 장바구니 추가 하기', async () => {
      render(<ProductInformation
        product={product}
        onClickSelectOption={onClickSelectOption}
        totalPayment={totalPayment}
        quantity={quantity}
        options={options}
        thumbnailImage={thumbnailImage}
        productWishes={productWishes}
        onClickResetOption={onClickResetOption}
        onClickAddCart={onClickAddCart}
      />);

      fireEvent.click(screen.getByText('장바구니'));

      screen.getByText('옵션을 선택해주세요');
    });
  });

  context(('상품 찜하기'), () => {
    it('찜하기 목록에 추가', () => {
      render(<ProductInformation
        product={product}
        onClickSelectOption={onClickSelectOption}
        totalPayment={totalPayment}
        quantity={quantity}
        options={options}
        thumbnailImage={thumbnailImage}
        productWishes={productWishes}
        onClickResetOption={onClickResetOption}
        onClickAddCart={onClickAddCart}
        onClickWishes={onClickWishes}
      />);

      fireEvent.click(screen.getByRole('button', { name: /찜하기 / }));

      expect(onClickWishes).toBeCalled();
    });
  });

  context(('상품 수량 조정하기'), () => {
    it('상품 수량 +', () => {
      render(<ProductInformation
        product={product}
        onClickSelectOption={onClickSelectOption}
        totalPayment={totalPayment}
        quantity={quantity}
        options={options}
        thumbnailImage={thumbnailImage}
        productWishes={productWishes}
        onClickResetOption={onClickResetOption}
        onClickAddCart={onClickAddCart}
        onClickWishes={onClickWishes}
        onClickAddQuantity={onClickAddQuantity}
        onClickReduceQuantity={onClickReduceQuantity}
      />);

      fireEvent.change(screen.getByLabelText('상품 옵션'), {
        target: { value: '{"addAmount":3000,"description":"블랙"}' },
      });

      screen.getByText('+');

      fireEvent.click(screen.getByText('+'));

      expect(onClickAddQuantity).toBeCalled();

      fireEvent.click(screen.getByText('-'));

      expect(onClickReduceQuantity).toBeCalled();
    });
  });
});
