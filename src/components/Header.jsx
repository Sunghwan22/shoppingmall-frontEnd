import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import LogoImage from '../assets/Logo.png';
import StoreImage from '../assets/app-store.png';
import CartImage from '../assets/shopping-cart.png';

const Container = styled.div`
    width: 100%;
    max-width: 2560px;
    padding-inline: 15%;
    padding-top: .1em;
    padding-bottom: .1em;
    font-size: 1.1em;
    border-bottom: 1px solid #D9D9D9;
    color: black;
    
    div {
      display: flex;
      align-items: center;   
    }
      
    a {
      text-decoration: none;
      cursor: pointer;
      color: black;

       &:focus , &:hover, &:visited{
        text-decoration: underline; text-decoration-color: #22DAAB;
        text-underline-position: under;
        text-decoration-thickness: .2em;
       }
    }
`;

const Navigation = styled.nav`
    ul {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    li {
      display: flex;
    }
`;

const MenuList = styled.div`
    display: flex;

    li {
        padding-right: 1em;
        display: flex;
    }
`;

const CartLink = styled.li`
  a {
    display: flex;
    align-items: center;
  }

  p {
    padding-left: .5em;
  }
`;

const StoreImageBox = styled.div`
  a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 2em;
  }
`;

const Profile = styled.img`
  border-radius: 1.5em;
`;

const LogoutButton = styled.button`
   background: transparent;
   padding: .5em;
   border: 1px solid #adadad;
   color: black;
   cursor: pointer;
   font-size: 1.1em;
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
          <div>
            <div>
              <Link to="/">
                <img
                  src={LogoImage}
                  // src="https://cdn.discordapp.com/attachments/993065106659364874/1050660573404209232/vincentJoDean.png"
                  alt="logoImage"
                  width="200px"
                />
              </Link>
            </div>
            <StoreImageBox>
              <li>
                <Link to="/products">
                  <img
                    src={StoreImage}
                    alt="storeImage"
                    width="60px"
                  />
                  스토어
                </Link>
              </li>
            </StoreImageBox>
          </div>
          {accessToken ? (
            <MenuList>
              <li>
                <CartLink>
                  <Link to="/cart">
                    <img
                      src={CartImage}
                      alt="cartImage"
                      width="40px"
                    />
                    <p>
                      장바구니
                    </p>
                  </Link>
                </CartLink>
              </li>
              <li>
                <Profile
                  src="https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/309/59932b0eb046f9fa3e063b8875032edd_crop.jpeg"
                  alt="userProfile"
                  width="30px"
                />
              </li>
              <li>
                <p>유저 닉네임</p>
              </li>
              <li>
                <Link to="/mypage">마이페이지</Link>
              </li>
              <li>
                <LogoutButton
                  type="button"
                  onClick={handleLogout}
                >
                  로그아웃
                </LogoutButton>
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
