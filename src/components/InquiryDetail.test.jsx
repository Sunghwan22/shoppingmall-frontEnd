import { render, screen } from '@testing-library/react';
import InquiryDetail from './InquiryDetail';

const inquiry = {
  id: 1,
  userId: 1,
  productId: 1,
  answerStatus: '답변완료',
  content: '상품 문의',
  userNickName: '본인등장',
  isSecret: true,
  createAt: '2022-11-11',
  answers: [{
    id: 1,
    inquiryId: 1,
    comment: '이것은 답변이다',
    createdAt: '2022-11-23',
  }],
};

const context = describe;

describe('InquiryDetail', () => {
  function renderInquiryDetail() {
    render(<InquiryDetail
      inquiry={inquiry}
    />);
  }

  context('상품 문의 상세 보기', () => {
    it('상품 문의 내용보기', () => {
      renderInquiryDetail();

      screen.getByText('상품 문의');
      screen.getByText(/이것은 답변이다/);
      screen.getByText('2022-11-23');
    });
  });
});
