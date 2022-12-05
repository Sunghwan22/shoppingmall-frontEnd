import { useLocation } from 'react-router-dom';

export default function SignUpFormPage() {
  const location = useLocation();

  const { name } = location.state ? location.state.name
    : '';

  return (
    <div>
      {name
        ? (
          <p>
            환영합니다,
            {' '}
            {name}
            님
            서비스 이용을 위해 시간을 조금만 내주세요
          </p>
        ) : null}
      <h2>SignUp</h2>
    </div>
  );
}
