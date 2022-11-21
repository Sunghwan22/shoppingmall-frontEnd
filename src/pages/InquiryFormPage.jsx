import { useLocation } from 'react-router-dom';

import InquiryForm from '../components/InquiryForm';

export default function InquiryFormPage() {
  const location = useLocation();

  const { productId } = location.state;

  return (
    <div>
      <InquiryForm
        productId={productId}
      />
    </div>
  );
}
