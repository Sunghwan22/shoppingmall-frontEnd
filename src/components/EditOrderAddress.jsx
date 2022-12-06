/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useForm } from 'react-hook-form';

export default function EditOrderAddress(
  { onClickUserInformation, onClickCancel },
) {
  const open = useDaumPostcodePopup();

  const [zonecode, setZonecode] = useState('');
  const [roadAddress, setLoadAddress] = useState('');
  const [jibunAddress, setJibunAddress] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const {
      recipient, phoneNumber, detailAddress,
    } = data;
    if (!zonecode || !roadAddress) {
      return;
    }

    onClickUserInformation({
      recipient, phoneNumber, detailAddress, zonecode, roadAddress, jibunAddress,
    });
  };

  const handleClickCancel = () => {
    onClickCancel();
  };

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

    if (data.addressType === 'J') {
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

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>주소 수정</h2>
        <label htmlFor="input-recipient">
          이름
        </label>
        <input
          id="input-recipient"
          {...register('recipient', {
            required: {
              value: true, message: '받는 분 이름을 입력해주세요',
            },
          })}
          placeholder="받는 분 이름"
        />
        {errors.recipient ? (
          <p>{errors.recipient.message}</p>
        ) : null}
        <label htmlFor="input-phoneNumber">
          전화 번호
        </label>
        <input
          id="input-phoneNumber"
          {...register('phoneNumber', {
            required: {
              value: true, message: '전화번호를 입력해주세요',
            },
          })}
          placeholder="전화번호"
        />
        {errors.phoneNumber ? (
          <p>{errors.phoneNumber.message}</p>
        ) : null}
        {/* <Postcode
          handleSubmit={handleSubmit}
          register={register}
          errors={errors} */}
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
        <label htmlFor="input-detailAddress">
          상세 주소
        </label>
        <input
          id="input-detailAddress"
          {...register('detailAddress', {
            required: {
              value: true, message: '상세주소를 입력해주세요',
            },
          })}
          placeholder="상세주소"
        />
        {errors.detailAddress ? (
          <p>{errors.detailAddress.message}</p>
        ) : null}
        <div>
          <button
            type="submit"
          >
            완료
          </button>
          <button
            type="button"
            onClick={handleClickCancel}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}
