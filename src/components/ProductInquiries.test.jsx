import { fireEvent, render, screen } from '@testing-library/react';

import ProductInquiries from './ProductInquiries';

const context = describe;

const inquiries = [
  {
    id: 1,
    userId: 1,
    productId: 1,
    answerStatus: '미답변',
    content: '이것은 상품 문의다',
    userNickName: '본인등장',
    isSecret: false,
    createdAt: '2022-11-13',
  },
  {
    id: 2,
    userId: 1,
    productId: 1,
    answerStatus: '미답변',
    content: '이것은 상품 문의다2',
    userNickName: '본인두두등장',
    isSecret: false,
    createdAt: '2022-11-14',
  },
];

const inquiry = {
  id: 2,
  userId: 1,
  productId: 1,
  answerStatus: '미답변',
  content: '비밀글 입니다',
  userNickName: '본인등장',
  isSecret: true,
  createAt: '2022-11-11',
  answers: [{
    id: 1, inquiryId: 1, comment: '이것은 답변이다',
  }],
};

const totalInquiryNumber = 2;
const inquiryPageNumbers = [1, 2];

const onClickInquiryPageNumbers = jest.fn();
const onClickInquiry = jest.fn();
const onClickWriteInquiry = jest.fn();
const onClickFindMyInquiries = jest.fn();

describe('ProductInquiries', () => {
  function renderProductInquiries() {
    render(<ProductInquiries
      inquiries={inquiries}
      inquiry={inquiry}
      totalInquiryNumber={totalInquiryNumber}
      inquiryPageNumbers={inquiryPageNumbers}
      onClickInquiryPageNumbers={onClickInquiryPageNumbers}
      onClickInquiry={onClickInquiry}
      onClickWriteInquiry={onClickWriteInquiry}
      onClickFindMyInquiries={onClickFindMyInquiries}
    />);
  }

  context('상품 문의 내용 확인하기', () => {
    it('2개의 상품 문의 내용 확인하기', async () => {
      renderProductInquiries();

      screen.getByText('본인등장');
      screen.getByText('본인두두등장');
      screen.getByText('이것은 상품 문의다');
      screen.getByText('이것은 상품 문의다2');
      screen.getByText('2022-11-13');
      screen.getByText('2022-11-14');
    });
  });

  context('상품 상세 정보 확인 하기', () => {
    it('문의 제목 클릭 시 상세 페이지 함수 실행', async () => {
      renderProductInquiries();

      fireEvent.click(screen.getByText('이것은 상품 문의다'));

      expect(onClickInquiry).toBeCalled();
    });
  });

  context('상품 문의 2페이지로 이동', () => {
    it('2개의 상품 문의 내용 확인하기', async () => {
      renderProductInquiries();

      fireEvent.click(screen.getByText('2'));

      expect(onClickInquiryPageNumbers).toBeCalled();
    });
  });

  context('상품 문의 작성하기를 위해 문의 작성하기 버튼 클릭', () => {
    it('onClickWriteInquiry 함수 실행', async () => {
      renderProductInquiries();

      fireEvent.click(screen.getByText('상품 Q&A작성하기'));

      expect(onClickWriteInquiry).toBeCalled();
    });
  });

  context('상품 문의 작성하기를 위해 문의 작성하기 버튼 클릭', () => {
    it('onClickWriteInquiry 함수 실행', async () => {
      renderProductInquiries();

      fireEvent.click(screen.getByText('상품 Q&A작성하기'));

      expect(onClickWriteInquiry).toBeCalled();
    });
  });

  context('내가 작성한 Q&A를 찾기위해 버튼 클릭', () => {
    it('onClickMyInquiry 함수 실행', async () => {
      renderProductInquiries();

      fireEvent.click(screen.getByText('나의 Q & A보기'));

      expect(onClickFindMyInquiries).toBeCalled();
    });
  });
});
