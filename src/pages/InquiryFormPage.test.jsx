import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import InquiryFormPage from './InquiryFormPage';

const context = describe;

const navigate = jest.fn();

const productId = 1;

jest.mock('react-router-dom', () => ({
  useNavigate: () => (
    navigate
  ),

  useLocation: () => ({
    state: {
      productId,
    },
  }),
}));

const createInquiry = jest.fn();

jest.mock('../hooks/useInquiryStore', () => () => ({
  createInquiry,
}));

describe('InquiryFormPageTest', () => {
  function renderInquiryFormPage() {
    render(<InquiryFormPage />);
  }

  context('상품 문의 등록을 위해 문의 내용을 작성', () => {
    it('등록 버튼을 클릭시 inquiryStore의 createInquiry함수 실행', async () => {
      renderInquiryFormPage();

      screen.getByText('상품 Q&A 작성하기');

      fireEvent.change(
        screen.getByLabelText('문의 내용'),
        { target: { value: '이것은 상품 문의 이다' } },
      );

      fireEvent.click(screen.getByText('등록'));

      await waitFor(() => {
        expect(createInquiry).toBeCalledWith(1, '', { content: '이것은 상품 문의 이다', isSecret: false });
      });
    });

    it('비밀글로 상품 문의 등록', async () => {
      renderInquiryFormPage();

      screen.getByText('상품 Q&A 작성하기');

      fireEvent.change(
        screen.getByLabelText('문의 내용'),
        { target: { value: '이것은 상품 문의 이다' } },
      );

      fireEvent.click(screen.getByLabelText('비공개'));

      fireEvent.click(screen.getByText('등록'));

      await waitFor(() => {
        expect(createInquiry)
          .toBeCalledWith(1, '', { content: '이것은 상품 문의 이다', isSecret: true });
        expect(navigate).toBeCalledWith(`/products/${productId}`);
      });
    });
  });

  context('내용을 입력하지 않고 등록버튼 클릭', () => {
    it('문의 내용을 입력해주세요 메시지를 확인할 수 있다.', async () => {
      renderInquiryFormPage();

      screen.getByText('상품 Q&A 작성하기');

      fireEvent.click(screen.getByText('등록'));

      await waitFor(() => {
        screen.getByText('문의하실 내용을 입력해주세요');
      });
    });
  });

  context('상품 문의 취소하기', () => {
    it('다시 상품 상세페이지로 이동.', async () => {
      renderInquiryFormPage();

      screen.getByText('상품 Q&A 작성하기');

      fireEvent.click(screen.getByText('취소'));

      await waitFor(() => {
        expect(navigate).toBeCalledWith(`/products/${productId}`);
      });
    });
  });
});
