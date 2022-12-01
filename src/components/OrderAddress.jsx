import Postcode from './Postcode';

/* eslint-disable jsx-a11y/label-has-associated-control */
export default function OrderAddress(
  {
    name, phoneNumber, address, onChangeAddress, onChangedetailAddress,
    onChangeDeliveryRequest, detailAddress,
  },
) {
  const handleChangeDetailAddress = (event) => {
    const { value } = event.target;

    onChangedetailAddress(value);
  };

  const handleChangeDeliveryRequest = (event) => {
    const { value } = event.target;

    onChangeDeliveryRequest(value);
  };

  if (!address.zoneCode) {
    return <p>now loading</p>;
  }

  return (
    <div>
      <h2>배송 정보</h2>
      <p>
        수령인
        {' '}
        {name}
      </p>
      <p>
        전화 번호
        {' '}
        {phoneNumber}
      </p>
      <Postcode
        address={address}
        onChangeAddress={onChangeAddress}
      />
      <p>
        <label htmlFor="detail-address" />
        <input
          id="detail-address"
          placeholder="상세주소"
          value={detailAddress}
          onChange={(event) => handleChangeDetailAddress(event)}
        />
      </p>
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
