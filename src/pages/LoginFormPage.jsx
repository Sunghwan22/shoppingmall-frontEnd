import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import LoginForm from '../components/LoginForm';
import useUserStore from '../hooks/useUserStore';
import kakaoLoginConfig from '../kakaoLoginConfig';
import { apiService } from '../services/APIService';

const Container = styled.div`
  width: 120%;
  padding-left: 15%;
`;

export default function LoginFormPage() {
  const userStore = useUserStore();
  const location = useLocation();
  const navigate = useNavigate();

  const productId = location.state;

  const [, setAccessToken] = useLocalStorage('accessToken', '');

  const { errorMessage } = userStore;

  const onClickLogin = async ({ identifier, password }) => {
    const accessToken = await userStore.login({ identifier, password });

    if (accessToken) {
      setAccessToken(accessToken);
      apiService.setAccessToken(accessToken);
      navigate('/');
    }

    if (productId) {
      navigate(`/product/${productId}`);
    }
  };

  const onClickSignup = () => {
    navigate('/signup');
  };

  const onClickKakaoLogin = () => {
    window.location.href = kakaoLoginConfig.kakaoAuthUrl;
  };

  return (
    <Container>
      <LoginForm
        onClickLogin={onClickLogin}
        onClickSignup={onClickSignup}
        onClickKakaoLogin={onClickKakaoLogin}
        errorMessage={errorMessage}
      />
    </Container>
  );
}
