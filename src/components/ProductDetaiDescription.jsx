import styled from 'styled-components';
import { v4 } from 'uuid';

const Container = styled.div`
  padding-inline: 15%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const H2 = styled.h2`
  padding-top: 2em;
  font-size: 2em;
  font-weight: bold;
  padding-bottom: 2em;
`;

const List = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr; 

  li {
    display: flex;
    width: 100%;
    justify-content: center;
  }
`;

const Image = styled.img`
  padding-bottom: 5em;
`;

const Description = styled.p`
  display: flex;
  justify-content: center;
  padding-bottom: 2em;
  width: 100%;
  font-size: 1.5em;
  color: #727272;
  border-bottom: 1px solid #D9D9D9;
`;

export default function ProductDetailDescription(
  { product, subProductImages },
) {
  return (
    <Container>
      <H2>
        상품상세 설명
      </H2>
      <List>
        {subProductImages.map((productImage) => (
          <li key={v4()}>
            <Image
              // src={productImage.url}
              src="https://newsimg.sedaily.com/2022/10/01/26C6IEIKFR_1.jpg"
              alt="productImage"
              width="50%"
            />
          </li>
        ))}
      </List>
      <Description>{product.description}</Description>
    </Container>
  );
}
