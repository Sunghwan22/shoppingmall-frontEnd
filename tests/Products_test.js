Feature('상품 검색 및 상품 리스트');

Scenario('상품 검색', ({ I }) => {
  I.amOnPage('/');

  I.fillField('상품 검색', '아이폰14');

  I.click('검색');

  I.see('아이폰 14');
  I.see('가격 25,000원');
  I.see('리뷰 10');
  I.see('구매건수 1200');
  I.see('찜하기 3');
  I.see('등록일자');
});

Scenario('상품 목록에서 원하는 상품 찜하기', ({ I }) => {
  I.amOnPage('/');

  I.fillField('아이폰14');

  I.click('button', '검색');

  I.see('아이폰 14');
  I.see('가격 25,000원');
  I.see('리뷰 10');
  I.see('구매건수 1200');
  I.see('찜하기 3');
  I.see('등록일자');
});

Scenario('상품 상세페이지 들어가기', ({ I }) => {
  I.amOnPage('/');

  I.fillField('상품 검색', '아이폰14');

  I.click('검색');

  I.see('아이폰 14');
  I.see('가격 25,000원');
  I.see('리뷰 10');
  I.see('구매건수 1200');
  I.see('찜하기 3');
  I.see('등록일자');
});
