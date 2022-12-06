import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import EditOrderAddress from '../components/EditOrderAddress';
import useUserStore from '../hooks/useUserStore';

export default function EditOrderAddressPage() {
  const userStore = useUserStore();

  const navigate = useNavigate();

  const [accessToken] = useLocalStorage('accessToken', '');

  const onClickUserInformation = ({
    recipient, phoneNumber, detailAddress, zonecode, roadAddress, jibunAddress,
  }) => {
    userStore.editUserInformation({
      recipient, phoneNumber, detailAddress, zonecode, roadAddress, jibunAddress,
    }, accessToken);

    navigate(-1);
  };

  const onClickCancel = () => {
    navigate(-1);
  };

  return (
    <div>
      <EditOrderAddress
        onClickUserInformation={onClickUserInformation}
        onClickCancel={onClickCancel}
      />
    </div>
  );
}
