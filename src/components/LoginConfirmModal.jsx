import { useState } from 'react';
import styled from 'styled-components';
import Modal from 'styled-react-modal';

const StyledModal = Modal.styled`
    font-size : .8em;
    width: 20rem;
    height: 8rem;
    display: flex;
    flex-direction : column;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 15px;
`;

const Buttons = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 1em;
`;

const ConfirmButton = styled.button`
    padding: .7em;
    padding-right: 2em;
    padding-left: 2em;
    display: flex;
    border-radius: 5px;
    border: none;
    margin-right: .8em;
    cursor: pointer;
    background: #D9D9D9;

    :hover {
        background: #07D9D2;
    }
`;

const StayButton = styled.button`
    padding-right: 1.5em;
    padding-left: 1.5em;
    border-radius: 5px;
    border: none;
    margin-right: .8em;
    cursor: pointer;
    background: #D9D9D9;

    :hover {
        background: #07D9D2;
    }
`;

export default function LoginConfirmModal(
  { onClickConfirm, onClickStay },
) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClickConfirm = () => {
    setIsOpen(false);
    onClickConfirm();
  };

  const handleClickReject = () => {
    setIsOpen(false);
    onClickStay();
  };

  return (
    <StyledModal
      isOpen={isOpen}
      onBackgroundClick={handleClickReject}
      onEscapeKeydown={handleClickReject}
    >
      <p>로그인이 필요한 서비스 입니다 로그인 하시겠습니까?</p>
      <Buttons>
        <ConfirmButton
          type="button"
          onClick={handleClickConfirm}
        >
          예
        </ConfirmButton>
        <StayButton
          type="button"
          onClick={handleClickReject}
        >
          아니요
        </StayButton>
      </Buttons>
    </StyledModal>
  );
}
