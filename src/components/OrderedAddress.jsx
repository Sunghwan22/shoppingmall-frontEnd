export default function OrderedAddress(
  {
    name,
    phoneNumber,
    address,
    deliveryRequest,
    detailAddress,
  },
) {
  return (
    <div>
      <div>
        <p>{address.zoneCode + address.fullAddress}</p>
        <div>
          <p>받는 분 성함</p>
          <p>{name}</p>
        </div>
        <div>
          <p>연락처</p>
          <p>{phoneNumber}</p>
        </div>
        <div>
          <p>배송지정보</p>
          <p>{address.zoneCode + address.fullAddress + detailAddress}</p>
        </div>
        <div>
          <p>배송 요청사항</p>
          <p>{deliveryRequest || '항상 수고 많으십니다'}</p>
        </div>
      </div>
    </div>
  );
}
