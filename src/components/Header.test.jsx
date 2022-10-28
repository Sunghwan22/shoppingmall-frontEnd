import { fireEvent, render, screen } from '@testing-library/react';
import Header from './Header';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
  useNavigate() {
    return navigate;
  },
}));

const context = describe;

describe('Header', () => {
  function renderHeader() {
    render(
      <Header />,
    );
  }

  it('로그인 하지 않은 상태', () => {
    renderHeader();

    screen.getByText('로그인');
    screen.getByText('회원가입');
  });

  context('로그인 한 상태', () => {
    beforeEach(() => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESS_TOKEN'));
    });

    it('로그아웃 버튼', () => {
      renderHeader();

      screen.getByText('로그아웃');
      fireEvent.click(screen.getByText('로그아웃'));
      expect(navigate).toBeCalledWith('/');
    });
  });
});
