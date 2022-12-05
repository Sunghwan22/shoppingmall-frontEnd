/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from 'react-hook-form';

export default function LoginForm(
  {
    onClickLogin, onClickSignup, errorMessage,
  },
) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const { identifier, password } = data;
    onClickLogin({ identifier, password });
  };

  const handleClickSingup = () => {
    onClickSignup();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>USER LOGIN</h2>
        <div>
          <label htmlFor="input-identifier">
            아이디
          </label>
          <input
            id="input-identifier"
            {...register('identifier', {
              required: {
                value: true, message: '아이디를 입력해주세요',
              },
            })}
            placeholder="아이디"
          />
          {errors.identifier ? (
            <p>{errors.identifier.message}</p>
          ) : null}
        </div>
        <div>
          <label htmlFor="input-password">
            패스워드
          </label>
          <input
            id="input-password"
            {...register('password', {
              required: {
                value: true, message: '비밀번호를 입력해주세요',
              },
            })}
            type="password"
            placeholder="비밀번호"
          />
          {errors.password ? (
            <p>{errors.password.message}</p>
          ) : null}
        </div>
        {errorMessage === '아이디 혹은 비밀번호가 일치하지 않습니다'
          ? <p>{errorMessage}</p> : null}
        <div>
          <button type="submit">
            로그인하기
          </button>
          <button
            type="button"
            onClick={handleClickSingup}
          >
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
}
