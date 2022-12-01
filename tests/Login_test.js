Feature('로그인');

Before(({ I }) => {
  I.setupUser();
});

Scenario('1번 사용자 로그인', ({ I }) => {
  I.amOnPage('/');
  I.click('로그인');

  I.fillField('아이디', 'tidls45');
  I.fillField('패스워드', 'Tjdghks245@');

  I.click('로그인하기');

  I.see('로그아웃');
});

Scenario('아이디를 빈칸으로 입력했을 경우', ({ I }) => {
  I.amOnPage('/');
  I.click('로그인');

  I.fillField('아이디', '');
  I.fillField('패스워드', 'Tjdghks245@');

  I.click('로그인하기');

  I.see('아이디를 입력해주세요');
});

Scenario('비밀번호를 빈칸으로 입력했을 경우', ({ I }) => {
  I.amOnPage('/');
  I.click('로그인');

  I.fillField('아이디', 'tidls45');
  I.fillField('패스워드', '');

  I.click('로그인하기');

  I.see('비밀번호를 입력해주세요');
});

Scenario('잘못된 아이디를 입력했을 경우', ({ I }) => {
  I.amOnPage('/');
  I.click('로그인');

  I.fillField('아이디', 'tidls314444');
  I.fillField('패스워드', 'Tjdghks245@');

  I.click('로그인하기');

  I.see('아이디 혹은 비밀번호가 일치하지 않습니다');
});

Scenario('잘못된 비밀번호를 입력했을 경우', ({ I }) => {
  I.amOnPage('/');
  I.click('로그인');

  I.fillField('아이디', 'tidls45');
  I.fillField('패스워드', 'Tjdghks245@@@@@@@@@@@');

  I.click('로그인하기');

  I.see('아이디 혹은 비밀번호가 일치하지 않습니다');
});
