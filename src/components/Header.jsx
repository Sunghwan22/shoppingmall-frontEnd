import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';

const Container = styled.div`
    width: 100%;
    padding: 1em;
    height: 5vh;
    font-size: 0.7em;
`;

const Navigation = styled.nav`
    ul {
        display: flex;
        justify-content: space-between;
    }
`;

const MenuList = styled.div`
    display: flex;

    li {
        padding-right: 1em;
    }
`;

export default function Header() {
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');
  const navigate = useNavigate();

  const handleLogout = () => {
    setAccessToken('');
    navigate('/');
  };

  return (
    <Container>
      <Navigation>
        <ul>
          <li>
            <Link to="/">홈 </Link>
          </li>
          {accessToken ? (
            <MenuList>
              <li>
                <Link to="/shoppingBasket">장바구니</Link>
              </li>
              <li>
                <img
                  src="https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/309/59932b0eb046f9fa3e063b8875032edd_crop.jpeg"
                  alt="userProfile"
                  width="20px"
                />
              </li>
              <li>
                <p>유저 닉네임</p>
              </li>
              <li>
                <Link to="/myPage">마이페이지</Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                >
                  로그아웃
                </button>
              </li>
            </MenuList>
          )
            : (
              <MenuList>
                <li>
                  <Link to="/login">로그인</Link>
                </li>
                <li>
                  <Link to="/login">회원가입</Link>
                </li>
              </MenuList>
            )}
        </ul>
      </Navigation>
    </Container>
  );
}
