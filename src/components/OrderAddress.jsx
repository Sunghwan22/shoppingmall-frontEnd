/* eslint-disable jsx-a11y/label-has-associated-control */
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
    <div>
      <h2>배송 정보</h2>
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
      <button
        type="button"
        onClick={handleClickEditRecipient}
      >
        정보 수정
      </button>
      <div>
        <p>
          배송지 정보
        </p>
        {address.zoneCode === 0
          ? <p>배송지 정보가 없습니다</p>
          : `(${address.zoneCode})${address.fullAddress} ${address.detailAddress}`}
        <p />
      </div>
      <p>
        <label htmlFor="requests" />
        <input
          id="requests"
          placeholder="배송 요청사항"
          defaultValue="문 앞에 놔둬 주세요"
          onChange={(event) => handleChangeDeliveryRequest(event)}
        />
      </p>
    </div>
  );
}
