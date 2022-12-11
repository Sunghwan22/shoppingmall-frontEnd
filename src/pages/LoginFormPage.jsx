import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import LoginForm from '../components/LoginForm';
import useUserStore from '../hooks/useUserStore';
import kakaoLoginConfig from '../kakaoLoginConfig';
import { apiService } from '../services/APIService';

const Container = styled.div`
  width: 100%;
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
    }
    // 카카오 로그인 성공할 시에 리다이렉트를 시켜주는 uri가 있나
    if (productId) {
      navigate(`/product/${productId}`);
    }
  };

  const onClickKakaoLogin = () => {
    window.location.href = kakaoLoginConfig.kakaoAuthUrl;
  };

  return (
    <Container>
      <LoginForm
        onClickLogin={onClickLogin}
        onClickKakaoLogin={onClickKakaoLogin}
        errorMessage={errorMessage}
      />
    </Container>
  );
}
