/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

import { useDaumPostcodePopup } from 'react-daum-postcode';

export default function Postcode(
  { address },
) {
  const open = useDaumPostcodePopup();

  const [zonecode, setZonecode] = useState(address.zoneCode);
  const [roadAddress, setLoadAddress] = useState(address.fullAddress);
  const [jibunAddress, setJibunAddress] = useState(address.jibunAddress);

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';

      setZonecode(data.zonecode);
      setLoadAddress(fullAddress);
      setJibunAddress(data.jibunAddress);
    }
  };

  const handleClick = () => {
    open(
      { onComplete: handleComplete },
    );
  };

  if (!address.zoneCode) {
    return <p>now loading</p>;
  }

  return (
    <div>
      <label htmlFor="zone-code" />
      <input
        id="zone-code"
        placeholder="우편번호"
        disabled
        value={zonecode}
      />
      <button type="button" onClick={handleClick}>
        우편번호 찾기
      </button>
      <p>
        <label htmlFor="road-address" />
        <input
          id="road-address"
          placeholder="도로명주소"
          disabled
          value={roadAddress}
        />
        <label htmlFor="jibun-address" />
        <input
          id="jibun-address"
          placeholder="지번주소"
          disabled
          value={jibunAddress}
        />
      </p>
    </div>
  );
}
