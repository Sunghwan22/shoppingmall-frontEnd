import React from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';

export default function Postcode() {
  const open = useDaumPostcodePopup();

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

      console.log(data);
      console.log(data.zonecode); // 우편번호
      console.log(fullAddress); // 풀주소

      // 상세주소
      // 참고사항은 본인이 직접 입력하는 것으로
    }
  };

  const handleClick = () => {
    open(
      { onComplete: handleComplete },
    );
  };

  return (
    <button type="button" onClick={handleClick}>
      Open
    </button>
  );
}
