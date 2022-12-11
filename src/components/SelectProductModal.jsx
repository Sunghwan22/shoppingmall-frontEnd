import { useState } from 'react';
import styled from 'styled-components';
import Modal from 'styled-react-modal';

const StyledModal = Modal.styled`
    font-size : 1.5em;
    width: 20%;
    height: 20%;
    display: flex;
    flex-direction : column;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 15px;
`;

const ConfirmButton = styled.button`
    margin-top: 2em;
    border: 1px solid #D9D9D9;
    font-size: 1.2em;
    padding: .5em;
    border-radius: 5px;
    cursor: pointer;
    background-color: transparent;

    :hover {
        background-color: #D9D9D9;
    }
`;

export default function SelectProductModal(
  { onClickCancel },
) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClickReject = () => {
    setIsOpen(false);
    onClickCancel();
  };

  const handleClickConfirm = () => {
    onClickCancel();
  };

  return (
    <StyledModal
      isOpen={isOpen}
      onBackgroundClick={handleClickReject}
      onEscapeKeydown={handleClickReject}
    >
      <p>구매하실 상품을 선택해주세요</p>
      <ConfirmButton
        onClick={handleClickConfirm}
      >
        확인
      </ConfirmButton>
    </StyledModal>
  );
}
