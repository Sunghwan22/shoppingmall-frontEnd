import { useLocation, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import LoginForm from '../components/LoginForm';
import useUserStore from '../hooks/useUserStore';
import { apiService } from '../services/APIService';
import { userApiService } from '../services/UserAPIService';

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
      navigate('/');
    }

    if (productId) {
      navigate(`/product/${productId}`);
    }
  };

  const onClickSignup = () => {
    navigate('/signup');
  };

  return (
    <LoginForm
      onClickLogin={onClickLogin}
      onClickSignup={onClickSignup}
      errorMessage={errorMessage}
    />
  );
}
