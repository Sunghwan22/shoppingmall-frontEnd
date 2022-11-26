import Postcode from './Postcode';

/* eslint-disable jsx-a11y/label-has-associated-control */
export default function OrderAddress(
  { name, phoneNumber, address },

) {
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
      />
      <p>
        <label htmlFor="detail-address" />
        <input
          id="detail-address"
          placeholder="상세주소"
        />
      </p>
      <p>
        <label htmlFor="requests" />
        <input
          id="requests"
          placeholder="배송 요청사항"
        />
      </p>
    </div>
  );
}
