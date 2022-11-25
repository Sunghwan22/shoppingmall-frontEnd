import Postcode from './Postcode';

/* eslint-disable jsx-a11y/label-has-associated-control */
export default function OrderAddress() {
  return (
    <div>
      <h2>배송 정보</h2>
      <p>
        수령인
        {' '}
        받는 사람 이름
      </p>
      <p>
        전화 번호
        {' '}
        010-3144-7938
      </p>
      <Postcode />
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
