import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import LoginFormPage from './LoginFormPage';

const navigate = jest.fn();

let productId;

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

let errorMessage;
const login = jest.fn();

jest.mock('../hooks/useUserStore', () => () => ({
  errorMessage,
  login,
}));

const context = describe;

describe('LoginFormPage', () => {
  function renderLoginFormPage() {
    render(<LoginFormPage />);
  }

  // function setAccessToken() {
  //   localStorage.setItem('accessToken', 'ACCESS.TOKEN');
  // }

  // function clearAccessToken() {
  //   localStorage.setItem('accessToken', '');
  // }

  context('로그인 페이지 렌더링', () => {
    it('로그인 페이지의 기본 텍스트를 확인', () => {
      renderLoginFormPage();

      screen.getByText('USER LOGIN');
    });
  });

  context('아이디와 비밀번호를 입력 후 로그인하기 버튼 클릭', () => {
    it('login함수 실행', async () => {
      renderLoginFormPage();

      fireEvent.change(screen.getByLabelText('아이디'), {
        target: { value: 'tidls45' },
      });

      fireEvent.change(screen.getByLabelText('패스워드'), {
        target: { value: 'Tjdghks245@' },
      });

      fireEvent.click(screen.getByText('로그인하기'));

      await waitFor(() => {
        expect(login).toBeCalledWith({ identifier: 'tidls45', password: 'Tjdghks245@' });
      });
    });
  });

  context('아이디나 비밀번호가 ', () => {
    it('아이디를 입력하지 않은 경우', () => {
      errorMessage = '아이디 혹은 비밀번호가 일치하지 않습니다';

      renderLoginFormPage();

      fireEvent.change(screen.getByLabelText('아이디'), {
        target: { value: 'tidls3144' },
      });

      fireEvent.change(screen.getByLabelText('패스워드'), {
        target: { value: 'Tjdghks245@' },
      });

      fireEvent.click(screen.getByText('로그인하기'));

      screen.getByText('아이디 혹은 비밀번호가 일치하지 않습니다');
    });
  });

  context('회원가입 버튼 클릭', () => {
    it('회원가입 페이지로 이동', () => {
      renderLoginFormPage();

      fireEvent.click(screen.getByText('회원가입'));

      expect(navigate).toBeCalled();
    });
  });
});
