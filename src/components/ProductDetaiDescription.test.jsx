export default function ProductDetailDescription(
  { product, productImages },
) {
  return (
    <div>
      <p>
        상품상세 설명
      </p>
      <p>
        {productImages.map((productImage) => (
          <img
            key={productImage.id}
            src={productImage.url}
            alt="subProductImage"
            width="200px"
          />
        ))}
      </p>
      <p>{product.description}</p>
    </div>
  );
}
