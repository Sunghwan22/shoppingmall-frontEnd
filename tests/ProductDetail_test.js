Feature('상품 상세페이지');

Before(({ I }) => {
  I.setupProduct();
});

Scenario('상품 상세 정보 확인', ({ I }) => {
  I.amOnPage('/products/1');

  I.see('Product Info');
  I.see('가격 25,000원');
  I.see('상품명 아이폰14');
});

Scenario('상품 옵션 확인하기', ({ I }) => {
  I.amOnPage('/products/1');

  I.click('select[name="product-option"]');

  I.see('블랙 + 4,000원');
  I.see('화이트 + 5,000원');
  I.see('블루 + 3,000원');

  I.selectOption('product-option', '블랙 + 4,000원');
  I.see('결제금액 : 29,000원');
});

Scenario('갯수 변경하기', ({ I }) => {
  I.amOnPage('/products/1');

  I.click('select[name="product-option"]');

  I.selectOption('product-option', '블랙 + 4,000원');

  I.click('+');

  I.see('결제금액 : 58,000원');

  I.click('-');

  I.see('결제금액 : 29,000원');
});

// Scenario('상품 찜하기', ({ I }) => {
//   // todo 로그인 구현하고 테스트 해야함

//   I.amOnPage('/products/1');

//   I.click(/찜하기 0/);

//
// });

Scenario('로그인 하지 않고 상품 찜하기를 누른 경우', ({ I }) => {
  I.setupWishes();

  I.amOnPage('/products/1');

  I.click('찜하기 3');

  I.see('로그인이 필요한 서비스 입니다 로그인 하시겠습니까?');

  I.click('예');
});

// Scenario('장바구니 추가 하기', ({ I }) => {
//   I.login('tidls45');

//   I.amOnPage('/products/1');

//   I.click('장바구니');

//   I.see(/장바구니에 상품이 추가되었습니다 장바구니로 이동하시겠습니까?/);

//   I.click('예');

//   I.amOnPage('/carts/1');
// });

Scenario('로그인 하지 않고 장바구니 추가 하기', ({ I }) => {
  I.amOnPage('/products/1');

  I.click('장바구니');

  I.see('로그인이 필요한 서비스 입니다 로그인 하시겠습니까?');

  I.click('예');
});

Scenario('베스트 리뷰 확인하기', ({ I }) => {
  I.setupReviews();

  I.amOnPage('/products/1');

  I.see('리뷰 수 10');
  I.see('사용자 총 평점 5/5');

  I.see('BEST 압도적 승리감을 느끼고 싶은가요?');
});

Scenario('일반 리뷰 확인하기', ({ I }) => {
  I.setupReviews();

  I.amOnPage('/products/1');

  I.see('리뷰 수 10');
  I.see('사용자 총 평점 5/5');

  I.see('압도태키 쇼리감?');
});

Scenario('2페이지의 베스트 리뷰 보기', ({ I }) => {
  I.setupReviews();

  I.amOnPage('/products/1');

  I.see('리뷰 수 10');
  I.see('사용자 총 평점 5/5');

  I.click('#bestReview-pageNumber2');

  I.see('2페이지의 베스트 리뷰');
});

Scenario('2페이지의 일반 리뷰 보기', ({ I }) => {
  I.setupReviews();

  I.amOnPage('/products/1');

  I.see('리뷰 수 10');
  I.see('사용자 총 평점 5/5');

  I.click('#review-pageNumber2');

  I.see('2페이지의 일반 리뷰');
});

// Scenario('리뷰 추천 하기', ({ I }) => {
//   I.login('tidls45');

//   I.setupReviews();

//   I.amOnPage('/products/1');

//   I.click('추천');

//   I.see(/추천 1/);

//   I.click(/추천 1/);

//   I.see('추천');
// });

Scenario('로그인 하지 않고 리뷰 추천 하기', ({ I }) => {
  I.setupReviews();

  I.amOnPage('/products/1');

  I.click('추천');

  I.see('로그인이 필요한 서비스 입니다 로그인 하시겠습니까?');
});

// Scenario('로그인 하지 않고 추천 하기', ({ I }) => {
//   I.setupReviews();

//   I.amOnPage('/products/1');

//   // todo 리뷰 버튼 이름 만들어야 함
//   I.click('추천');

//   I.see('로그인이 필요한 서비스 입니다.');

//   I.fillField('아이디', 'tidls45');
//   I.fillField('비밀번호', 'Tjdghks245@');

//   I.click('로그인');

//   I.see('Product Info');
// });

// Scenario('본인이 작성한 비밀글의 내용을 확인', ({ I }) => {
// todo 로그인 구현하면 해야함

//   I.setupInquiries();

//   I.amOnPage('/products/1');

//   I.see('압도적 승리감이 있나요?');
//   I.see('미답변');
// });

Scenario('로그인 하지 않은 상태로 비밀글이 아닌 상품 문의 및 답변 확인', ({ I }) => {
  I.setupInquiries();

  I.amOnPage('/products/1');

  I.see('Q&A 6');

  I.see('조금의 미소만 있으면 된다?');
  I.see('미답변');
});

Scenario('비밀글이 아닌 상품 문의의 상세 페이지 확인', ({ I }) => {
  I.setupInquiries();
  I.setupAnswer();

  I.amOnPage('/products/1');

  I.click('조금의 미소만 있으면 된다?');
  I.see('이것은 답변이다2');
});

Scenario('비밀글의 문의 내용을 클릭했을 경우', ({ I }) => {
  I.setupInquiries();
  I.setupAnswer();

  I.amOnPage('/products/1');

  I.click('비밀글 입니다');
  I.see('접근 권한이 없습니다');
});

Scenario('상품 문의 2페이지 전환', ({ I }) => {
  I.setupInquiries();
  I.setupAnswer();

  I.amOnPage('/products/1');

  I.click('#inquiry-pageNumber2');

  I.see('2페이지의 상품문의입니다');
});
