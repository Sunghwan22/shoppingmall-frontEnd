import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import useUserStore from '../hooks/useUserStore';

export default function KakaoRedirectPage() {
  const [, setAccessToken] = useLocalStorage('accessToken', '');

  const navigate = useNavigate();

  const userStore = useUserStore();

  const authCode = new URL(window.location.href)
    .searchParams.get('code');

  const fetchKakaoLoginResult = async () => {
    const data = await userStore.sendAuthcode(authCode);

    const { accessToken } = data;

    setAccessToken(accessToken);

    navigate(-2);
  };

  useEffect(() => {
    fetchKakaoLoginResult();
  }, []);

  return (
    <p>
      now Loading...
    </p>
  );
}
