import UserStore from './UserStore';

const context = describe;
let userStore;

beforeEach(() => {
  userStore = new UserStore();
});

describe('UserStore', () => {
  context('login', () => {
    it('올바른 아이디와 비밀번호로 로그인하기', async () => {
      await userStore.login({ identifier: 'identifier', password: 'password' });

      expect(userStore.name).toBe('Tester');
      expect(userStore.phoneNumber).toBe('010-3144-7938');
      expect(userStore.address).toStrictEqual(
        {
          zonecode: 44637,
          fullAddress: '울산광역시 남구 정광로 3번길 20',
          jibunAddress: '울산광역시 남구 무거동 1233-12번지',
        },
      );
    });
  });
});
// 저거 서비스 상속 작업 시작하기
describe('fetchUser', () => {
  it('유저 정보 세팅', async () => {
    await userStore.fetchUser();

    expect(userStore.name).toBe('Tester');
    expect(userStore.phoneNumber).toBe('010-3144-7938');
    expect(userStore.address).toStrictEqual(
      {
        zonecode: 44637,
        fullAddress: '울산광역시 남구 정광로 3번길 20',
        jibunAddress: '울산광역시 남구 무거동 1233-12번지',
      },
    );
  });
});
