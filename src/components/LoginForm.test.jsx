import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import LoginForm from './LoginForm';

const onClickLogin = jest.fn();
const onClickSignup = jest.fn();
let errorMessage;

const context = describe;

describe('LoginForm', () => {
  function renderLoginForm() {
    render(<LoginForm
      onClickLogin={onClickLogin}
      onClickSignup={onClickSignup}
      errorMessage={errorMessage}
    />);
  }

  context('로그인 폼 렌더링', () => {
    it('로그인 페이지의 텍스를 확인', () => {
      renderLoginForm();

      screen.getByText('USER LOGIN');

      screen.getByLabelText('아이디');
      screen.getByLabelText('패스워드');
    });
  });

  context('아이디와 패스워드를 입력 후 로그인하기', () => {
    it('login함수 실행', async () => {
      renderLoginForm();

      screen.getByText('USER LOGIN');

      fireEvent.change(screen.getByLabelText('아이디'), {
        target: { value: 'tidls45' },
      });

      fireEvent.change(screen.getByLabelText('패스워드'), {
        target: { value: 'Tjdghks245@' },
      });

      fireEvent.click(screen.getByText('로그인하기'));

      await waitFor(() => {
        expect(onClickLogin).toBeCalledWith({ identifier: 'tidls45', password: 'Tjdghks245@' });
      });
    });
  });

  context('아이디를 빈칸으로 한 후 로그인하기', () => {
    it('아이디를 입력해주세요 메시지를 볼 수있다.', async () => {
      renderLoginForm();

      screen.getByText('USER LOGIN');

      fireEvent.change(screen.getByLabelText('아이디'), {
        target: { value: '' },
      });

      fireEvent.change(screen.getByLabelText('패스워드'), {
        target: { value: 'Tjdghks245@' },
      });

      fireEvent.click(screen.getByText('로그인하기'));

      await waitFor(() => {
        screen.getByText('아이디를 입력해주세요');
      });
    });
  });

  context('비밀번호를 입력하지 않고 로그인하기', () => {
    it('비밀번호를 입력해주세요 메시지를 볼 수 있다', async () => {
      renderLoginForm();

      screen.getByText('USER LOGIN');

      fireEvent.change(screen.getByLabelText('아이디'), {
        target: { value: 'tidls45' },
      });

      fireEvent.change(screen.getByLabelText('패스워드'), {
        target: { value: '' },
      });

      fireEvent.click(screen.getByText('로그인하기'));

      await waitFor(() => {
        screen.getByText('비밀번호를 입력해주세요');
      });
    });
  });

  context('등록되지 않은 유저 정보로 로그인 할 때', () => {
    it('아이디 및 비밀번호를 확인해주세요 메시지를 볼 수 있다.', async () => {
      errorMessage = '아이디 혹은 비밀번호가 일치하지 않습니다';

      renderLoginForm();

      screen.getByText('USER LOGIN');

      fireEvent.change(screen.getByLabelText('아이디'), {
        target: { value: 'tidls3144' },
      });

      fireEvent.change(screen.getByLabelText('패스워드'), {
        target: { value: 'tjdghsk245@!!!' },
      });

      fireEvent.click(screen.getByText('로그인하기'));

      screen.getByText('아이디 혹은 비밀번호가 일치하지 않습니다');
    });
  });
});
