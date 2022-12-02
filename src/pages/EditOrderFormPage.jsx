<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';

export default function EditOrderFormPage() {
  const location = useNavigate();

  const { cartItem, currentPage } = location.state;

  // 이거 API 요청 때려야 하겠네

=======
export default function EditOrderFormPage() {
>>>>>>> 48a9e2f (임시 커밋)
  return (
    <p>Hello, world</p>
  );
}
