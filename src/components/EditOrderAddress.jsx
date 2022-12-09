/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
`;

const H2 = styled.h2`
  font-size: 2em;
  font-weight: bold;
  padding-bottom: 2em;
`;

const Label = styled.label`
    font-size: 1.5em;    
    padding-right: .3em;
`;

const PhoneNumberLabel = styled.label`
    font-size: 1.5em;
    padding-right: .3em;
    padding-left: 2em;
`;

const RecipientInformation = styled.div`
  width: 100%;
  padding-bottom: 2em;
  display: flex;
  align-items: center;
`;

const Recipient = styled.input`
  padding-top: .3em;
  padding-bottom: .3em;
  padding-left: .2em;
`;

const PhoneNumber = styled.input`
  padding-top: .3em;
  padding-bottom: .3em;
  padding-left: .2em;
  width: 20%;
`;

const ZoneCode = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 1em;

  p {
    font-size: 1.5em;
    padding-right: 2em;
  }

  input {
    font-size: 1.1em;
    width: 9%;
    padding-top: .4em;
    padding-left: .4em;
    padding-bottom: .5em;
  }

  button {
    font-size: 1.1em;
    padding-top: .7em;
    padding-left: .4em;
    padding-right: .4em;
    padding-bottom: .5em;
    cursor: pointer;
    margin-left: 1em;
    border: 1px solid #D9D9D9;
    background-color: transparent;
  }
`;

const Address = styled.div`
  width: 100%;
  padding-left: 10em;
`;

const RoadAddress = styled.input`
  font-size: 1.2em;
  padding: .2em 8em .2em .5em;
  margin-right: .5em;
`;

const JibunAddress = styled.input`
  font-size: 1.2em;
  padding: .2em 11em .2em .5em;
`;

const DetailAddress = styled.input`
  margin-top: 1em;
  margin-left: 8.4em;
  font-size: 1.2em;
  padding: .2em 20em .2em .5em;
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 5em;

  button:first-child {
    font-size: 1.2em;
    padding: 1em 2.5em 1em 2.5em;
    background-color: #35992D;
    border: none;
    border-radius: .2em;
    margin-right: 1em;
    color: white;
  }

  button:nth-child(2) {
    font-size: 1.2em;
    padding: 1em 2.5em 1em 2.5em;
    background-color: transparent;
    border: 1px solid #D9D9D9;
    border-radius: .2em;
    margin-right: 1em;
    color: black;
    
    cursor: pointer;
  }
`;

const Error = styled.p`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 3em;
  font-size: 1.5em;
  color: red;
  font-weight: bold;
`;

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
    <Container>
      <H2>주소 수정</H2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RecipientInformation>
          <Label htmlFor="input-recipient">
            수령인
          </Label>
          <Recipient
            id="input-recipient"
            {...register('recipient', {
              required: {
                value: true,
              },
            })}
            placeholder="받는 분 이름"
          />
          <PhoneNumberLabel htmlFor="input-phoneNumber">
            전화 번호
          </PhoneNumberLabel>
          <PhoneNumber
            id="input-phoneNumber"
            {...register('phoneNumber', {
              required: {
                value: true,
              },
            })}
            placeholder="전화번호"
          />
        </RecipientInformation>
        <div>
          <ZoneCode>
            <p>배송지 주소</p>
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
          </ZoneCode>
          <Address>
            <label htmlFor="road-address" />
            <RoadAddress
              id="road-address"
              placeholder="도로명주소"
              disabled
              value={roadAddress}
            />
            <label htmlFor="jibun-address" />
            <JibunAddress
              id="jibun-address"
              placeholder="지번주소"
              disabled
              value={jibunAddress}
            />
          </Address>
        </div>
        <label htmlFor="input-detailAddress" />
        <DetailAddress
          id="input-detailAddress"
          {...register('detailAddress', {
            required: {
              value: true, message: '상세주소를 입력해주세요',
            },
          })}
          placeholder="상세주소"
        />
        {errors.recipient || errors.phoneNumber || errors.detailAddress
          ? <Error>정보를 모두 입력해주세요</Error> : null}
        <Buttons>
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
        </Buttons>
      </form>
    </Container>
  );
}
