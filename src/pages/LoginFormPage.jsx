import { useLocation, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import LoginForm from '../components/LoginForm';
import useUserStore from '../hooks/useUserStore';
import kakaoLoginConfig from '../kakaoLoginConfig';
import { apiService } from '../services/APIService';

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

  const handleClickKakaoLogin = () => {
    window.location.href = kakaoLoginConfig.kakaoAuthUrl;
  };

  return (
    <div>
      <LoginForm
        onClickLogin={onClickLogin}
        onClickSignup={onClickSignup}
        errorMessage={errorMessage}
      />
      <button
        type="button"
        onClick={handleClickKakaoLogin}
      >
        카카오 로그인
      </button>
    </div>
  );
}
