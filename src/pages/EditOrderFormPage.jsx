import { useNavigate } from 'react-router-dom';

export default function EditOrderFormPage() {
  const location = useNavigate();

  const { cartItem, currentPage } = location.state;

  // 이거 API 요청 때려야 하겠네

  return (
    <p>Hello, world</p>
  );
}
