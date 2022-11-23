import InquiryStore from './InquiryStore';

const context = describe;

let inquiryStore;

describe('InquiryStore', () => {
  beforeEach(() => {
    inquiryStore = new InquiryStore();
  });

  context('상품 문의 불러오기', () => {
    it('로그인 하지 않은 상태로 fetchInquiry함수 호출', async () => {
      const productId = 1;

      await inquiryStore.fetchInquiries(productId, '');

      const { inquiries } = inquiryStore;

      expect(inquiries.length).toBe(2);
      expect(inquiries[0].content).toBe('비밀글 입니다');
      expect(inquiries[1].content).toBe('비밀글 입니다');
    });

    context('로그인 후 상품 문의 확인', () => {
      it('로그인 상태로 fetchInquiry함수 호출 본인이 쓴 게시물은 볼 수 있음', async () => {
        const productId = 1;

        await inquiryStore.fetchInquiries(productId, 'AccessToken');

        const { inquiries } = inquiryStore;

        expect(inquiries.length).toBe(2);
        expect(inquiries[0].content).toBe('상품 문의');
        expect(inquiries[1].content).toBe('상품 문의문의');
      });
    });

    context('상품 문의 페이지 이동', () => {
      it('2페이지에 있는 상품 문의 확인', async () => {
        const productId = 1;
        const page = 2;

        await inquiryStore.changeInquiryPageNumber(productId, 'AccessToken', page);

        const { inquiries } = inquiryStore;

        expect(inquiries.length).toBe(2);
        expect(inquiries[0].id).toBe(5);
        expect(inquiries[0].content).toBe('상품 문의');
        expect(inquiries[1].content).toBe('상품 문의문의');
        expect(inquiries[1].id).toBe(6);
      });
    });

    context('로그인 하지 않은 상태로 상품 문의 페이지 이동', () => {
      it('2페이지에 있는 상품 문의 확인', async () => {
        const productId = 1;
        const page = 2;

        await inquiryStore.changeInquiryPageNumber(productId, '', page);

        const { inquiries } = inquiryStore;

        expect(inquiries.length).toBe(2);
        expect(inquiries[0].id).toBe(7);
        expect(inquiries[0].content).toBe('비밀글 입니다');
        expect(inquiries[1].content).toBe('비밀글 입니다');
        expect(inquiries[1].id).toBe(8);
      });
    });

    context('내가 작성한 문의 확인 ', () => {
      it('로그인 상태로 fetchMyInquiry함수 호출 본인이 쓴 게시물은 볼 수 있음', async () => {
        const productId = 1;

        await inquiryStore.fetchMyInquiries(productId, 'AccessToken');

        const { myInquiries } = inquiryStore;

        expect(myInquiries.length).toBe(2);
        expect(myInquiries[0].content).toBe('내가 작성한 글');
        expect(myInquiries[0].isSecret).toBeTruthy();
        expect(myInquiries[1].content).toBe('진짜 내가 쓴 글임');
        expect(myInquiries[1].isSecret).toBeTruthy();
      });
    });

    context('내가 작성한 문의 확인', () => {
      it('로그인 상태로 fetchMyInquiry함수 호출 본인이 쓴 게시물은 볼 수 있음', async () => {
        const productId = 1;

        await inquiryStore.fetchMyInquiries(productId, 'AccessToken');

        const { myInquiries } = inquiryStore;

        expect(myInquiries.length).toBe(2);
        expect(myInquiries[0].content).toBe('내가 작성한 글');
        expect(myInquiries[0].isSecret).toBeTruthy();
        expect(myInquiries[1].content).toBe('진짜 내가 쓴 글임');
        expect(myInquiries[1].isSecret).toBeTruthy();
      });
    });

    context('내가 작성한 문의 페이지 이동 ', () => {
      it('로그인 상태로 changePageNumber함수 호출 본인이 쓴 게시물은 볼 수 있음', async () => {
        const productId = 1;
        const page = 2;

        await inquiryStore.changeMyInquiryPageNumber(productId, 'AccessToken', page);

        const { myInquiries } = inquiryStore;

        expect(myInquiries.length).toBe(2);
        expect(myInquiries[0].content).toBe('내가 작성한 글');
        expect(myInquiries[0].isSecret).toBeTruthy();
        expect(myInquiries[1].content).toBe('진짜 내가 쓴 글임');
        expect(myInquiries[1].isSecret).toBeTruthy();
      });
    });

    context('내가 작성한 문의 페이지 이동 ', () => {
      it('로그인 상태로 changePageNumber함수 호출 본인이 쓴 게시물은 볼 수 있음', async () => {
        const productId = 1;
        const page = 2;

        await inquiryStore.changeMyInquiryPageNumber(productId, 'AccessToken', page);

        const { myInquiries } = inquiryStore;

        expect(myInquiries.length).toBe(2);
        expect(myInquiries[0].content).toBe('내가 작성한 글');
        expect(myInquiries[0].isSecret).toBeTruthy();
        expect(myInquiries[1].content).toBe('진짜 내가 쓴 글임');
        expect(myInquiries[1].isSecret).toBeTruthy();
      });
    });

    context('상품 문의 작성하기', () => {
      it('createInquiry함수 실행', async () => {
        const productId = 1;

        const inquiryInformation = {
          userId: 1,
          productId: 1,
          content: '상품 문의',
          userNickName: '본인등장',
          isSecret: true,
        };

        await inquiryStore.createInquiry(productId, 'AccessToken', inquiryInformation);

        const { inquiry } = inquiryStore;

        expect(inquiry.id).toBe(1);
        expect(inquiry.userId).toBe(1);
        expect(inquiry.productId).toBe(1);
        expect(inquiry.content).toBe('상품 문의');
        expect(inquiry.userNickName).toBe('본인등장');
        expect(inquiry.isSecret).toBeTruthy();
        expect(inquiry.answerStatus).toBe('미답변');
        expect(inquiry.createAt).toBe('2022-11-11');
      });
    });
  });
});
