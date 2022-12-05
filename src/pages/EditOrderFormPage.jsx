import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CartItemEditForm from '../components/CartItemEditForm';
import useCartStore from '../hooks/useCartStore';

export default function EditOrderFormPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const cartStore = useCartStore();

  const { cartItemId } = location.state;

  useEffect(() => {
    cartStore.fetchCartItem(cartItemId);
  }, []);

  const {
    cartItem, options, productPrice, totalPrice,
    quantity, guideMessage,
  } = cartStore;

  const onClickAddQuantity = () => {
    cartStore.addQuantity();
  };

  const onClickReduceQuantity = () => {
    cartStore.reduceQuantity();
  };

  const onClickSelectOption = (productOption) => {
    cartStore.selectOption(productOption);
  };

  const onClickCancel = () => {
    navigate('/cart');
  };

  const onClickConfirm = () => {
    cartStore.updateCartItem(cartItemId);

    navigate('/cart');
  };

  return (
    <div>
      <CartItemEditForm
        cartItem={cartItem}
        options={options}
        productPrice={productPrice}
        totalPrice={totalPrice}
        quantity={quantity}
        onClickSelectOption={onClickSelectOption}
        onClickAddQuantity={onClickAddQuantity}
        onClickReduceQuantity={onClickReduceQuantity}
        onClickCancel={onClickCancel}
        onClickConfirm={onClickConfirm}
        guideMessage={guideMessage}
      />
    </div>
  );
}
