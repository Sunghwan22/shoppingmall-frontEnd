import { v4 } from 'uuid';

export default function ProductDetailDescription(
  { product, subProductImages },
) {
  return (
    <div>
      <p>
        상품상세 설명
      </p>
      <ul>
        {subProductImages.map((productImage) => (
          <img
            key={v4()}
            src={productImage.url}
            alt="productImage"
            width="100"
          />
        ))}
      </ul>
      <p>{product.description}</p>
    </div>
  );
}
