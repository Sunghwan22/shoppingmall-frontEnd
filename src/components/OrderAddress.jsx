/* eslint-disable jsx-a11y/label-has-associated-control */

import styled from 'styled-components';

const Container = styled.div`
  padding-left: 1.5em;

  p {
    font-size: 1.2em;
    padding-bottom: 1em;
  }
`;

const H2 = styled.h2`
  font-size: 2em;
  padding-top: 1.5em;
  font-weight: bold;
  padding-bottom: 1em;
`;

const DeliveryAddress = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 2em;

  span {
   font-size: 1.3em;
   padding-right: 1.5em;
  }

  button {  
    padding-top: .7em;
    padding-bottom: .7em;
    padding-left: 1.5em;
    padding-right: 1.5em;
    border: 1px solid #D9D9D9;
    background-color: transparent;
    cursor: pointer;
  }
`;

const Input = styled.input`
  width: 50%;
  font-size: 1em;
  padding-top: .3em;
  padding-bottom: .3em;
  padding-left : .5em;
  padding-right : .5em;
`;

export default function OrderAddress(
  {
    recipient, phoneNumber, address, onChangeDeliveryRequest, onClickEditAddress,
  },

) {
  const handleChangeDeliveryRequest = (event) => {
    const { value } = event.target;

    onChangeDeliveryRequest(value);
  };

  const handleClickEditRecipient = () => {
    onClickEditAddress();
  };

  return (
    <Container>
      <H2>배송지 정보</H2>
      <p>
        수령인
        {' '}
        {recipient}
      </p>
      <p>
        전화 번호
        {' '}
        {phoneNumber}
      </p>
      <DeliveryAddress>
        {address.zoneCode === 0
          ? <p>배송지 정보가 없습니다</p>
          : (
            <span>
              {address.zoneCode}
              {' '}
              {address.fullAddress}
              {' '}
              {address.detailAddress}
            </span>
          )}
        <button
          type="button"
          onClick={handleClickEditRecipient}
        >
          정보 수정
        </button>
      </DeliveryAddress>
      <p>
        <label htmlFor="requests" />
        <Input
          id="requests"
          placeholder="배송 요청사항"
          defaultValue="문 앞에 놔둬 주세요"
          onChange={(event) => handleChangeDeliveryRequest(event)}
        />
      </p>
    </Container>
  );
}
