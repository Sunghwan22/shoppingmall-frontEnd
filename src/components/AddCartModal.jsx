import { useState } from 'react';
import styled from 'styled-components';
import Modal from 'styled-react-modal';

const StyledModal = Modal.styled`
    font-size : 1em;
    width: 30%;
    height: 20%;
    display: flex;
    flex-direction : column;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 15px;

    p {
        text-align: center;
        font-size : 1.2em;
    }
`;

const Buttons = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 2em;
`;

const ConfirmButton = styled.button`
    padding: .7em;
    padding-right: 2em;
    padding-left: 2em;
    font-size: 1.3em;
    display: flex;
    border-radius: 5px;
    border: none;
    margin-right: .8em;
    cursor: pointer;
    background: #35992D;

    :hover {
        background-color:#1F561B
    }
`;

const StayButton = styled.button`
    padding-right: 1.5em;
    padding-left: 1.5em;
    font-size: 1.3em;
    border-radius: 5px;
    border: none;
    margin-right: .8em;
    cursor: pointer;
    background: #D9D9D9;

    :hover {
        background: #9b9a9a;
    }
`;

export default function AddCartModal({ onClickStay, onClickNavigateToCart }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClickConfirm = () => {
    setIsOpen(false);
    onClickNavigateToCart();
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
      <p>장바구니에 상품이 추가 되었습니다. 장바구니로 이동하시겠습니까?</p>
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
