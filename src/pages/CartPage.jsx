import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import CartItems from '../components/CartItems';
import SelectOptionModal from '../components/SelectOptionModal';
import WishItems from '../components/WishItems';
import useCartStore from '../hooks/useCartStore';
import useProductStore from '../hooks/useProductStore';
import useWishItemStore from '../hooks/useWishItemStore';
import numberFormat from '../utils/NumberFormat';

export default function CartPage() {
  const navigate = useNavigate();

  const [selectOption, setSelectOption] = useState(false);

  const [accessToken] = useLocalStorage('accessToken', '');

  const cartStore = useCartStore();
  const wishItemStore = useWishItemStore();
  const productStore = useProductStore();

  useEffect(() => {
    cartStore.fetchCartItems(accessToken);
    wishItemStore.fetchWishItems(accessToken);
  }, []);

  const {
    cartItems, checkItems, totalCartItemPrice, totalDeliveryFee, orderAmount,
    checkedCartItem,
  } = cartStore;

  const { wishItems } = wishItemStore;

  const {
    product, totalPayment, quantity,
    guideMessage, selectedProductOption,
  } = productStore;

  const onClickSingleCheck = (checked, cartItemId) => {
    cartStore.Singlecheck(checked, cartItemId);
  };

  const onClickWholeCheck = (checked) => {
    cartStore.wholeCheck(checked);
  };

  const onClickDeleteCartItem = () => {
    cartStore.deleteCartItems(accessToken);
  };

  const onClickCartItem = (productId) => {
    navigate(`/product/${productId}`);
  };

  const onClickaddCart = (productId) => {
    setSelectOption(true);
    productStore.fetchProduct(productId);
  };

  const handleClickTotalOrder = () => {
    if (!checkItems.length) {
      return;
    }

    navigate('/orderForm', {
      state: {
        orderProducts: [...checkedCartItem],
        totalOrderPayment: orderAmount,
      },
    });
  };

  const onClickOrder = async (cartItemId) => {
    const cartItem = cartItems.find((element) => element.id === cartItemId);

    navigate('/orderForm', {
      state: {
        orderProducts: [cartItem],
        totalOrderPayment: cartItem.totalPayment + cartItem.deliveryFee,
      },
    });
  };

  const onClickEditOrder = (cartItemId) => {
    navigate('/edit-orderForm', {
      state: {
        cartItemId,
      },
    });
  };

  const onClickAddCartItem = async (productId) => {
    if (!selectedProductOption) {
      return;
    }

    if (Object.keys(selectedProductOption).length === 0) {
      productStore.checkOption();
      return;
    }

    await productStore.addCartItem(productId, accessToken);

    setSelectOption(false);

    await wishItemStore.deleteWishItem(productId, accessToken);

    await cartStore.fetchCartItems(accessToken);
  };

  const onClickSelectOption = (productOption) => {
    const amount = productOption.addAmount;

    productStore.selectOption(amount, productOption);
  };

  const onClickAddQuantity = () => {
    productStore.addQuantity();
  };

  const onClickReduceQuantity = () => {
    productStore.reduceQuantity();
  };

  const onClickResetOption = () => {
    productStore.resetQuantityAndTotalPayment();
  };

  const onClickCancel = () => {
    setSelectOption(false);
  };

  return (
    <div>
      <CartItems
        cartItems={cartItems}
        checkItems={checkItems}
        onClickSingleCheck={onClickSingleCheck}
        onClickWholeCheck={onClickWholeCheck}
        onClickDeleteCartItem={onClickDeleteCartItem}
        onClickCartItem={onClickCartItem}
        onClickOrder={onClickOrder}
        onClickEditOrder={onClickEditOrder}
      />
      <div>
        <p>
          선택상품금액
          {numberFormat(totalCartItemPrice)}
          원
        </p>
        <p>
          총 배송비
          {numberFormat(totalDeliveryFee)}
          원
        </p>
        <p>
          주문금액
          {numberFormat(orderAmount)}
          원
        </p>
        <button
          type="button"
          onClick={handleClickTotalOrder}
        >
          총
          {checkedCartItem.length}
          건
          {' '}
          주문하기
        </button>
        <WishItems
          wishItems={wishItems}
          onClickaddCart={onClickaddCart}
        />
        {selectOption
          ? (
            <SelectOptionModal
              product={product}
              totalPayment={totalPayment}
              quantity={quantity}
              onClickCancel={onClickCancel}
              selectedProductOption={selectedProductOption}
              guideMessage={guideMessage}
              onClickSelectOption={onClickSelectOption}
              onClickAddQuantity={onClickAddQuantity}
              onClickReduceQuantity={onClickReduceQuantity}
              onClickResetOption={onClickResetOption}
              onClickAddCartItem={onClickAddCartItem}
            />
          )
          : null}
      </div>
    </div>
  );
}
