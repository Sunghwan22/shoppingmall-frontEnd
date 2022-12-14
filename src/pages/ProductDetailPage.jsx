import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import AddCartModal from '../components/AddCartModal';
import LoginConfirmModal from '../components/LoginConfirmModal';
import ProductBestReviews from '../components/ProductBestReviews';

import ProductDetailDescription from '../components/ProductDetaiDescription';
import ProductInformation from '../components/ProductInformation';
import ProductInquiries from '../components/ProductInquiries';
import ProductReviews from '../components/ProductReviews';
import ReviewDetail from '../components/ReviewDetail';
import useInquiryStore from '../hooks/useInquiryStore';

import useProductStore from '../hooks/useProductStore';
import useReviewStore from '../hooks/useReviewStore';
import useWishStore from '../hooks/useWishStore';

const Container = styled.div`
    width: 100%;
    padding-inline: 15%;
    max-width: 2560px;
`;

export default function ProductDetailPage() {
  const productStore = useProductStore();
  const reviewStore = useReviewStore();
  const inquiryStore = useInquiryStore();
  const wishStore = useWishStore();

  const location = useLocation();

  const productId = location.state !== null
    ? location.state.productId
    : Number(location.pathname.split('/')[2]);

  const [accessToken] = useLocalStorage('accessToken', '');
  const [loginConfirm, setLoginConfirm] = useState(false);
  const [addCart, setAddCart] = useState(false);
  const [recentlyViewProduct, setRecentlyViewProduct] = useLocalStorage('recentlyViewProduct', JSON.stringify([]));

  const navigate = useNavigate();

  useEffect(() => {
    productStore.fetchProduct(productId);
    wishStore.fetchProductWishes(productId);
    reviewStore.fetchReviews({ productId });
    reviewStore.fetchBestReviews({ productId });
    inquiryStore.fetchInquiries({ productId, accessToken });

    const productIdArray = JSON.parse(recentlyViewProduct);
    if (!productIdArray.includes(productId)) {
      if (productIdArray.length === 10) {
        productIdArray.pop();
      }
      productIdArray.unshift(productId);
    }

    if (productIdArray.length !== 10) {
      const deduplicationArray = productIdArray.filter((element) => element !== productId);
      deduplicationArray.unshift(productId);
      setRecentlyViewProduct(JSON.stringify(deduplicationArray));
      return;
    }

    setRecentlyViewProduct(JSON.stringify(productIdArray));
  }, []);

  const {
    product, totalPayment, quantity, options, thumbnailImage,
    subProductImages, guideMessage, selectedProductOption,
  } = productStore;

  const {
    reviews, review, bestReviews, totalRating, totalReviewsNumber, pageNumbers
    , isBestReviewDetail, bestReviewPageNumbers, isReviewDetail,
  } = reviewStore;

  const {
    inquiries, inquiry, totalInquiryNumber
    , inquiryPageNumbers,
  } = inquiryStore;

  const { productWishes } = wishStore;

  const onClickPurchase = () => {
    if (!selectedProductOption) {
      return;
    }

    if (Object.keys(selectedProductOption).length === 0) {
      productStore.checkOption();
      return;
    }

    if (!accessToken) {
      setLoginConfirm(true);
      return;
    }

    const orderProduct = {
      image: thumbnailImage.url,
      description: selectedProductOption.description,
      name: product.productName,
      deliveryFee: product.deliveryFee,
      quantity,
      totalPayment,
      productId: product.id,
    };

    navigate('/orderForm', {
      state: {
        orderProducts: [orderProduct],
        totalOrderPayment: totalPayment + product.deliveryFee,
      },
    });
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

  const onClickWishes = () => {
    if (!accessToken) {
      setLoginConfirm(true);
      return;
    }

    wishStore.createWishes(productId, accessToken);
  };

  const onClickAddCart = async () => {
    if (!accessToken) {
      setLoginConfirm(true);
      return;
    }

    if (!selectedProductOption) {
      return;
    }

    if (Object.keys(selectedProductOption).length === 0) {
      productStore.checkOption();
      return;
    }

    await productStore.addCartItem(productId, accessToken);

    setAddCart(true);
  };

  const onClickRecommendation = (reviewId) => {
    if (!accessToken) {
      setLoginConfirm(true);
      return;
    }

    reviewStore.fetchRecommendation(accessToken, reviewId, productId);
  };

  const onClickPageNumbers = (number) => {
    reviewStore.fetchReviews({ productId, page: number });
  };

  const onClickBestReviewPageNumbers = (number) => {
    reviewStore.fetchBestReviews({ productId, page: number });
  };

  const onClickBestReview = (reviewId) => {
    reviewStore.fetchBestReview(reviewId);
  };

  const onClickReview = (reviewId) => {
    reviewStore.fetchReview(reviewId);
  };

  const onClickExitReviewDetail = () => {
    reviewStore.exitReviewDetail();
  };

  const onClickExitBestReviewDetail = () => {
    reviewStore.exitBestReviewDetail();
  };

  const onClickInquiryPageNumbers = (number) => {
    inquiryStore.fetchInquiries({ productId, accessToken, page: number });
  };

  const onClickInquiry = (inquiryId) => {
    inquiryStore.fetchInquiry(inquiryId, accessToken);
  };

  const onClickWriteInquiry = () => {
    if (!accessToken) {
      setLoginConfirm(true);
      return;
    }

    navigate('/inquiry/write', {
      state: {
        productId,
      },
    });
  };

  const onClickFindMyInquiries = () => {
    if (!accessToken) {
      setLoginConfirm(true);
      return;
    }

    navigate('/mypage/');
  };

  const onClickConfirm = () => {
    navigate('/login', {
      state: {
        productId,
      },
    });
    setLoginConfirm(false);
  };

  const onClickStay = () => {
    setLoginConfirm(false);
    setAddCart(false);
  };

  const onClickNavigateToCart = () => {
    navigate('/cart');
  };

  return (
    <Container>
      <ProductInformation
        product={product}
        thumbnailImage={thumbnailImage}
        options={options}
        quantity={quantity}
        totalPayment={totalPayment}
        productWishes={productWishes}
        onClickSelectOption={onClickSelectOption}
        onClickAddQuantity={onClickAddQuantity}
        onClickReduceQuantity={onClickReduceQuantity}
        onClickResetOption={onClickResetOption}
        onClickWishes={onClickWishes}
        onClickAddCart={onClickAddCart}
        onClickPurchase={onClickPurchase}
        guideMessage={guideMessage}
      />
      <ProductBestReviews
        totalRating={totalRating}
        bestReviews={bestReviews}
        bestReviewPageNumbers={bestReviewPageNumbers}
        onClickRecommendation={onClickRecommendation}
        onClickBestReviewPageNumbers={onClickBestReviewPageNumbers}
        totalReviewsNumber={totalReviewsNumber}
        onClickBestReview={onClickBestReview}
      />

      {isBestReviewDetail ? (
        <ReviewDetail
          review={review}
          onClickExitReviewDetail={onClickExitBestReviewDetail}
        />
      ) : null}
      <ProductDetailDescription
        product={product}
        subProductImages={subProductImages}
      />
      {isReviewDetail
        ? (
          <ReviewDetail
            review={review}
            onClickExitReviewDetail={onClickExitReviewDetail}
          />
        )
        : (
          <ProductReviews
            totalRating={totalRating}
            reviews={reviews}
            pageNumbers={pageNumbers}
            onClickRecommendation={onClickRecommendation}
            onClickPageNumber={onClickPageNumbers}
            totalReviewsNumber={totalReviewsNumber}
            onClickReview={onClickReview}
          />
        )}
      <ProductInquiries
        inquiries={inquiries}
        totalInquiryNumber={totalInquiryNumber}
        inquiryPageNumbers={inquiryPageNumbers}
        onClickInquiryPageNumbers={onClickInquiryPageNumbers}
        onClickInquiry={onClickInquiry} //
        inquiry={inquiry}
        onClickFindMyInquiries={onClickFindMyInquiries}
        onClickWriteInquiry={onClickWriteInquiry}
      />
      {loginConfirm ? (
        <LoginConfirmModal
          onClickConfirm={onClickConfirm}
          onClickStay={onClickStay}
        />
      ) : null}
      {addCart ? (
        <AddCartModal
          onClickNavigateToCart={onClickNavigateToCart}
          onClickStay={onClickStay}
        />
      ) : null}
    </Container>
  );
}
