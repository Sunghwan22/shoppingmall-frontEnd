import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

import InquiryForm from '../components/InquiryForm';
import LoginConfirmModal from '../components/LoginConfirmModal';
import useInquiryStore from '../hooks/useInquiryStore';

export default function InquiryFormPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [loginConfirm, setLoginConfirm] = useState(false);

  const inquiryStore = useInquiryStore();

  const [accessToken] = useLocalStorage('accessToken', '');

  const { productId } = location.state;

  const onClickRegister = async (inquiryInformation) => {
    if (!accessToken) {
      setLoginConfirm(true);
    }

    await inquiryStore.createInquiry(productId, accessToken, inquiryInformation);

    navigate(`/products/${productId}`);
  };

  const onClickCancel = () => {
    navigate(`/products/${productId}`);
  };

  const onClickConfirm = () => {
    navigate('/login');
    setLoginConfirm(false);
  };

  const onClickStay = () => {
    setLoginConfirm(false);
  };

  return (
    <div>
      <InquiryForm
        onClickRegister={onClickRegister}
        onClickCancel={onClickCancel}
      />
      {loginConfirm ? (
        <LoginConfirmModal
          onClickConfirm={onClickConfirm}
          onClickStay={onClickStay}
        />
      ) : null}
    </div>
  );
}
