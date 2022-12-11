import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import EditOrderAddress from '../components/EditOrderAddress';
import useUserStore from '../hooks/useUserStore';

const Container = styled.div`
    padding-inline: 15%;
    padding-top: 3em;
    width: 100%;  
`;

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
    <Container>
      <EditOrderAddress
        onClickUserInformation={onClickUserInformation}
        onClickCancel={onClickCancel}
      />
    </Container>
  );
}
