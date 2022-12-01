Feature('상품 검색 및 상품 리스트');

Before(({ I }) => {
  I.setupProduct();
});

Scenario('상품 목록확인하기', ({ I }) => {
  I.amOnPage('/');

  I.click('스토어');

  I.see('아이폰14');
  I.see('25,000원');
  I.see('리뷰 10');
  I.see('구매건수 1,200');
  I.see('찜하기 3');
  I.see('배송비 3,000원');

  I.see('애플워치8');
  I.see('20,000원');
  I.see('리뷰 0');
  I.see('구매건수 1,000');
  I.see('찜하기 0');
  I.see('배송비 2,500원');
});

Scenario('상품 상세페이지 들어가기', ({ I }) => {
  I.amOnPage('/');

  I.click('스토어');

  I.click('아이폰14');

  I.see('Product Info');
});

// Scenario('상품 목록에서 원하는 상품 찜하기', ({ I }) => {
//   I.amOnPage('/');

//   I.click('스토어');

//   I.see('찜하기 0');

//   I.see('찜하기 1');
// });

Scenario('로그인하지 않은 상태로 상품 목록에서 원하는 상품 찜하기', ({ I }) => {
  I.amOnPage('/');

  I.click('스토어');

  I.click('찜하기 0');

  I.see('로그인이 필요한 서비스 입니다 로그인 하시겠습니까?');

  I.click('예');
});

Scenario('상품 목록 2페이지 보기', ({ I }) => {
  I.amOnPage('/');

  I.click('스토어');

  I.click('#products-pageNumber2');

  I.see('애플워치49');
  I.see('애플워치59');

  I.click('#products-pageNumber1');

  I.see('아이폰14');
  I.see('25,000원');
  I.see('리뷰 10');
  I.see('구매건수 1,200');
  I.see('찜하기 3');
  I.see('배송비 3,000원');
});
