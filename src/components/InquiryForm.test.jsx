import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import InquiryForm from './InquiryForm';

const context = describe;

const onClickRegister = jest.fn();
const onClickCancel = jest.fn();

describe('InquiryForm', () => {
  function renderInquiryForm() {
    render(<InquiryForm
      onClickRegister={onClickRegister}
      onClickCancel={onClickCancel}
    />);
  }

  context('문의 내용을 입력하고 등록하기 버튼 클릭', () => {
    it('onClickRegister 함수 실행', async () => {
      localStorage.setItem('accessToken', 'ACCESS.TOKEN');

      renderInquiryForm();

      screen.getByText('상품 Q&A 작성하기');

      fireEvent.change(
        screen.getByLabelText('문의 내용'),
        { target: { value: '이것은 상품 문의 이다' } },
      );

      fireEvent.click(screen.getByText('등록'));

      await waitFor(() => {
        expect(onClickRegister).toBeCalled();
      });
    });
  });

  context('문의 내용을 입력하지 않고 등록하기 버튼 클릭', () => {
    it('에러 메시지를 확인 할 수 있다', async () => {
      renderInquiryForm();

      screen.getByText('상품 Q&A 작성하기');

      fireEvent.click(screen.getByText('등록'));

      await waitFor(() => {
        screen.getByText('문의하실 내용을 입력해주세요');
      });
    });
  });

  context('문의 내용 취소 버튼을 누를 시', () => {
    it('onClickCancel 함수 실행', async () => {
      renderInquiryForm();

      screen.getByText('상품 Q&A 작성하기');

      fireEvent.click(screen.getByText('취소'));

      await waitFor(() => {
        expect(onClickCancel).toBeCalled();
      });
    });
  });
});
