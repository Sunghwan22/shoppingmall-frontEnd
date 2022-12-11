/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */

import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import KakaoLoginImage from '../assets/KakaoLoginLarge.png';

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  width: 20%;
`;

const H2 = styled.h2`
  font-size: 3em;
  width: 100%;
  text-align: center;
  padding-bottom: .5em;
  margin-bottom: 1em;
  border-bottom: 1px solid black;
`;

const Error = styled.p`
   text-align: center;
   font-size : 1em;
   color: red;
   margin-top: .5em;
`;

const Input = styled.input`
   font-size: 1.1em;
   width: 100%;
   border: ${(props) => (props.error ? '1px solid #F00' : '1px solid#CCC')}; 
   outline: none;
   padding: 1em;
   margin-bottom: 1em;
`;

const Label = styled.label`
   display: none;
`;

const Signup = styled.button`
  width: 100%;
  font-size: 1em;
  font-weight: bold;
  background: transparent;
  padding : 1.5em;
  border: none;
  border-radius: .2em;
  cursor: pointer;
`;

const LoginButton = styled.button`
  width: 100%;
  font-size: 1.1em;
  color: white;
  font-weight: bold;
  background: #35992D;
  margin-top: 1em;
  padding : 1.3em;
  border: none;
  border-radius: .5em;
  cursor: pointer;

  &:hover{  
    color : #006148
  }

  button:active{
  background:#008C68;
}

`;

const KakaoLoginButton = styled.button`
  width: 100%;
  font-size: 1.1em;
  color: transparent;
  font-weight: bold;
  background-image: url(${KakaoLoginImage});
  background-size: cover;
  background-repeat: no-repeat;
  margin-top: 1em;
  padding-bottom:3em;
  border: none;
  border-radius: .5em;
  cursor: pointer;
`;

export default function LoginForm(
  {
    onClickLogin, errorMessage, onClickKakaoLogin,
  },
) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const { identifier, password } = data;
    onClickLogin({ identifier, password });
  };

  const handleClickSingup = () => {
  };

  const handleClickKakaoLogin = () => {
    onClickKakaoLogin();
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <H2>USER LOGIN</H2>
        <div>
          <Label htmlFor="input-identifier">
            아이디
          </Label>
          <Input
            id="input-identifier"
            {...register('identifier', {
              required: {
                value: true, message: '아이디를 입력해주세요',
              },
            })}
            placeholder="아이디"
            error={errors.identifier}
          />
        </div>
        <div>
          <Label htmlFor="input-password">
            패스워드
          </Label>
          <Input
            id="input-password"
            {...register('password', {
              required: {
                value: true, message: '비밀번호를 입력해주세요',
              },
            })}
            type="password"
            error={errors.password}
            placeholder="비밀번호"
          />
        </div>
        {errors.identifier ? (
          <Error>{errors.identifier.message}</Error>
        )
          : errors.password ? (
            <Error>{errors.password.message}</Error>
          )
            : errorMessage === '아이디 혹은 비밀번호가 맞지 않습니다' ? (
              <Error>{errorMessage}</Error>
            )
              : null}
        <div>
          <LoginButton type="submit">
            로그인
          </LoginButton>
          <Signup
            type="button"
            onClick={handleClickSingup}
          >
            회원가입
          </Signup>
          <KakaoLoginButton
            type="button"
            onClick={handleClickKakaoLogin}
          >
            카카오로그인
          </KakaoLoginButton>
        </div>
      </Form>
    </Container>
  );
}
