/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import config from '../config';

const baseurl = config.apiBaseUrl;

const server = setupServer(
  rest.get(`${baseurl}/products/1`, async (request, response, context) => response(context.json({
    id: 1,
    productNumber: 12,
    productName: '아이폰 14',
    maker: '애플',
    category: '전자기기',
    views: 1000,
    cumulativesales: 150,
    price: 1500000,
    stock: 100,
    maximumQuantity: '50',
    description: '이것은 아이폰 14입니다',
    deliveryFee: '3000',
    options: [{ addAmount: 3000, description: '블랙' },
      { addAmount: 5000, description: '화이트' }],
    productImages: [{ url: 'imageUrl', isThumbnailImage: true },
      { url: 'imageUrl', isThumbnailImage: false }],
  }))),

  rest.get(`${baseurl}/products`, async (request, response, context) => {
    const page = await request.url.searchParams.get('page');

    if (page === '1') {
      return response(context.json({
        products: [
          {
            id: 1,
            productNumber: 12,
            productName: '아이폰 13',
            maker: '애플',
            category: '전자기기',
            views: 1000,
            cumulativesales: 120,
            price: 1000000,
            stock: 100,
            maximumQuantity: '50',
            description: '이것은 아이폰 13입니다',
            deliveryFee: '3000',
            options: [{ addAmount: 3000, description: '블랙' },
              { addAmount: 5000, description: '화이트' }],
            productImages: [{ url: 'imageUrl', isThumbnailImage: true },
              { url: 'imageUrl', isThumbnailImage: false }],
          },
        ],
      }));
    }

    if (page === '2') {
      return response(context.json({
        products: [
          {
            id: 2,
            productNumber: 12,
            productName: '아이폰 14',
            maker: '애플',
            category: '전자기기',
            views: 1000,
            cumulativesales: 150,
            price: 1500000,
            stock: 100,
            maximumQuantity: '50',
            description: '이것은 아이폰 14입니다',
            deliveryFee: '3000',
            options: [{ addAmount: 3000, description: '블랙' },
              { addAmount: 5000, description: '화이트' }],
            productImages: [{ url: 'imageUrl', isThumbnailImage: true },
              { url: 'imageUrl', isThumbnailImage: false }],
          },
        ],
      }));
    }

    return response(context.status(400));
  }),

  rest.get(`${baseurl}/wishes/products/1`, async (request, response, context) => response(context.json({
    wishes: [
      { id: 1, productId: 1, userId: 1 },
      { id: 2, productId: 1, userId: 2 },
    ],
  }))),

  rest.post(`${baseurl}/wishes/products/1`, async (request, response, context) => {
    const accessToken = await request.headers.get('Authorization')
      .substring('Bearer '.length);

    if (accessToken) {
      return response(context.json({
        wishes: [
          { id: 1, productId: 1, userId: 1 },
          { id: 2, productId: 1, userId: 2 },
          { id: 3, productId: 1, userId: 3 },
        ],
      }));
    }
    return response(context.status(400), context.json({
      message: '로그인 후 이용가능한 서비스 입니다',
    }));
  }),

  rest.get(`${baseurl}/products/1/reviews`, async (request, response, context) => {
    const page = await request.url.searchParams.get('page');

    if (page === '1') {
      return response(context.json({
        reviews: [
          {
            id: 1,
            productId: 1,
            rating: 5,
            userId: 1,
            optionName: '블랙',
            content: '이것은 상품 리뷰 입니다',
            isBestReview: false,
            userNickName: '유저닉네임',
            reviewImages: [
              { url: 'image' },
            ],
            recommendations: [
              { userId: 2 },
            ],
            createAt: '2022-11-11',
          },
          {
            id: 2,
            productId: 1,
            rating: 4,
            userId: 1,
            optionName: '블랙',
            content: '이것은 상품 리뷰 입니다',
            isBestReview: false,
            userNickName: '유저닉네임',
            reviewImages: [
              { url: 'image' },
            ],
            recommendations: [
              { userId: 3 },
            ],
            createAt: '2022-11-11',
          },
        ],
      }));
    }
    if (page === '2') {
      return response(context.json({
        reviews: [
          {
            id: 3,
            productId: 1,
            rating: 5,
            userId: 1,
            optionName: '블랙',
            content: '이것은 상품 리뷰 입니다',
            isBestReview: false,
            userNickName: '유저닉네임',
            reviewImages: [
              { url: 'image' },
            ],
            recommendations: [
              { userId: 2 },
            ],
            createAt: '2022-11-11',
          },
          {
            id: 4,
            productId: 1,
            rating: 4,
            userId: 1,
            optionName: '블랙',
            content: '이것은 상품 리뷰 입니다',
            isBestReview: false,
            userNickName: '유저닉네임',
            reviewImages: [
              { url: 'image' },
            ],
            recommendations: [
              { userId: 3 },
            ],
            createAt: '2022-11-11',
          },
        ],
      }));
    }

    if (!page) {
      return response(context.json({
        reviews: [
          {
            id: 5,
            productId: 1,
            rating: 5,
            userId: 1,
            optionName: '블랙',
            content: '이것은 상품 리뷰 입니다',
            isBestReview: false,
            userNickName: '유저닉네임',
            reviewImages: [
              { url: 'image' },
            ],
            recommendations: [
              { userId: 2 },
            ],
            createAt: '2022-11-11',
          },
          {
            id: 6,
            productId: 1,
            rating: 4,
            userId: 1,
            optionName: '블랙',
            content: '이것은 상품 리뷰 입니다',
            isBestReview: false,
            userNickName: '유저닉네임',
            reviewImages: [
              { url: 'image' },
            ],
            recommendations: [
              { userId: 3 },
            ],
            createAt: '2022-11-11',
          },
        ],
      }));
    }
    return response(context.status(400));
  }),

  rest.get(`${baseurl}/products/1/reviews/best`, async (request, response, context) => {
    const page = await request.url.searchParams.get('page');

    if (page === '1') {
      return response(context.json({
        reviews: [
          {
            id: 1,
            productId: 1,
            rating: 5,
            userId: 1,
            optionName: '블랙',
            content: '이것은 상품 리뷰 입니다',
            isBestReview: true,
            userNickName: '유저닉네임',
            reviewImages: [
              { url: 'image' },
            ],
            recommendations: [
              { userId: 2 },
            ],
            createAt: '2022-11-11',
          },
          {
            id: 2,
            productId: 1,
            rating: 4,
            userId: 1,
            optionName: '블랙',
            content: '이것은 상품 리뷰 입니다',
            isBestReview: true,
            userNickName: '유저닉네임',
            reviewImages: [
              { url: 'image' },
            ],
            recommendations: [
              { userId: 3 },
            ],
            createAt: '2022-11-11',
          },
        ],
      }));
    }
    if (page === '2') {
      return response(context.json({
        reviews: [
          {
            id: 3,
            productId: 1,
            rating: 5,
            userId: 1,
            optionName: '블랙',
            content: '이것은 상품 리뷰 입니다',
            isBestReview: true,
            userNickName: '유저닉네임',
            reviewImages: [
              { url: 'image' },
            ],
            recommendations: [
              { userId: 2 },
            ],
            createAt: '2022-11-11',
          },
          {
            id: 4,
            productId: 1,
            rating: 4,
            userId: 1,
            optionName: '블랙',
            content: '이것은 상품 리뷰 입니다',
            isBestReview: true,
            userNickName: '유저닉네임',
            reviewImages: [
              { url: 'image' },
            ],
            recommendations: [
              { userId: 3 },
            ],
            createAt: '2022-11-11',
          },
        ],
      }));
    }

    if (page === '3') {
      return response(context.json({
        reviews: [
          {
            id: 5,
            productId: 1,
            rating: 5,
            userId: 1,
            optionName: '블랙',
            content: '이것은 상품 리뷰 입니다',
            isBestReview: true,
            userNickName: '유저닉네임',
            reviewImages: [
              { url: 'image' },
            ],
            recommendations: [
              { userId: 2 },
            ],
            createAt: '2022-11-11',
          },
          {
            id: 6,
            productId: 1,
            rating: 4,
            userId: 1,
            optionName: '블랙',
            content: '이것은 상품 리뷰 입니다',
            isBestReview: true,
            userNickName: '유저닉네임',
            reviewImages: [
              { url: 'image' },
            ],
            recommendations: [
              { userId: 3 },
            ],
            createAt: '2022-11-11',
          },
        ],
      }));
    }
    return response(context.status(400));
  }),

  rest.get(`${baseurl}/reviews/1`, async (request, response, context) => response(context.json({
    id: 1,
    productId: 1,
    rating: 5,
    userId: 1,
    optionName: '블랙',
    content: '이것은 상품 리뷰 입니다',
    isBestReview: true,
    userNickName: '유저닉네임',
    reviewImages: [
      { url: 'image' },
    ],
    recommendations: [
      { userId: 2 },
    ],
    createAt: '2022-11-11',
  }))),

  rest.post(`${baseurl}/reviews/5/recommendations`, async (request, response, context) => {
    const accessToken = await request.headers.get('Authorization')
      .substring('Bearer '.length);

    if (accessToken) {
      return response(context.json({
        recommendations: [
          { userId: 1 },
          { userId: 2 },
          { userId: 3 },
        ],
      }));
    }
    return response(context.status(400), context.json({
      message: '로그인 후 이용가능한 서비스 입니다',
    }));
  }),

  rest.get(`${baseurl}/products/1/inquiries`, async (request, response, context) => {
    const page = await request.url.searchParams.get('page');
    const accessToken = await request.headers.get('Authorization')
      .substring('Bearer '.length);

    if (!accessToken && page === '1') {
      return response(context.json({
        inquiries: [
          {
            id: 1,
            userId: 1,
            productId: 1,
            answerStatus: '미답변',
            content: '비밀글 입니다',
            userNickName: '본인등장',
            isSecret: true,
            createAt: '2022-11-11',
          },
          {
            id: 2,
            userId: 1,
            productId: 1,
            answerStatus: '미답변',
            content: '비밀글 입니다',
            userNickName: '본인등장',
            isSecret: true,
            createAt: '2022-11-11',
          },
        ],
      }));
    }

    if (accessToken && page === '1') {
      return response(context.json({
        inquiries: [
          {
            id: 3,
            userId: 2,
            productId: 1,
            answerStatus: '미답변',
            content: '상품 문의',
            userNickName: '본인등장',
            isSecret: true,
            createAt: '2022-11-11',
          },
          {
            id: 4,
            userId: 3,
            productId: 1,
            answerStatus: '미답변',
            content: '상품 문의문의',
            userNickName: '본인등장',
            isSecret: true,
            createAt: '2022-11-11',
          },
        ],
      }));
    }

    if (page === '2' && accessToken) {
      return response(context.json({
        inquiries: [
          {
            id: 5,
            userId: 2,
            productId: 1,
            answerStatus: '미답변',
            content: '상품 문의',
            userNickName: '본인등장',
            isSecret: true,
            createAt: '2022-11-11',
          },
          {
            id: 6,
            userId: 3,
            productId: 1,
            answerStatus: '미답변',
            content: '상품 문의문의',
            userNickName: '본인등장',
            isSecret: true,
            createAt: '2022-11-11',
          },
        ],
      }));
    }

    if (page === '2' && !accessToken) {
      return response(context.json({
        inquiries: [
          {
            id: 7,
            userId: 2,
            productId: 1,
            answerStatus: '미답변',
            content: '비밀글 입니다',
            userNickName: '본인등장',
            isSecret: true,
            createAt: '2022-11-11',
          },
          {
            id: 8,
            userId: 3,
            productId: 1,
            answerStatus: '미답변',
            content: '비밀글 입니다',
            userNickName: '본인등장',
            isSecret: true,
            createAt: '2022-11-11',
          },
        ],
      }));
    }

    return response(context.status(400));
  }),

  rest.get(`${baseurl}/products/1/inquiries/user/me`, async (request, response, context) => {
    const page = await request.url.searchParams.get('page');
    const accessToken = await request.headers.get('Authorization')
      .substring('Bearer '.length);

    if (page === '1' && accessToken) {
      return response(context.json({
        inquiries: [
          {
            id: 1,
            userId: 1,
            productId: 1,
            answerStatus: '미답변',
            content: '내가 작성한 글',
            userNickName: '본인등장',
            isSecret: true,
            createAt: '2022-11-11',
          },
          {
            id: 2,
            userId: 1,
            productId: 1,
            answerStatus: '미답변',
            content: '진짜 내가 쓴 글임',
            userNickName: '본인등장',
            isSecret: true,
            createAt: '2022-11-11',
          },
        ],
      }));
    }

    if (page === '2' && accessToken) {
      return response(context.json({
        inquiries: [
          {
            id: 3,
            userId: 1,
            productId: 1,
            answerStatus: '미답변',
            content: '내가 작성한 글',
            userNickName: '본인등장',
            isSecret: true,
            createAt: '2022-11-11',
          },
          {
            id: 4,
            userId: 1,
            productId: 1,
            answerStatus: '미답변',
            content: '진짜 내가 쓴 글임',
            userNickName: '본인등장',
            isSecret: true,
            createAt: '2022-11-11',
          },
        ],
      }));
    }

    if (!accessToken) {
      response(context.status(400));
    }
    return response(context.status(400));
  }),

  rest.post(`${baseurl}/products/1/inquiries`, async (request, response, context) => {
    const accessToken = await request.headers.get('Authorization')
      .substring('Bearer '.length);

    if (accessToken) {
      return response(context.json({
        id: 1,
        userId: 1,
        productId: 1,
        answerStatus: '미답변',
        content: '상품 문의',
        userNickName: '본인등장',
        isSecret: true,
        createAt: '2022-11-11',
      }));
    }
    return response(context.status(400), context.json({
      message: '로그인 후 이용가능한 서비스 입니다',
    }));
  }),

  rest.post(`${baseurl}/session`, async (req, res, ctx) => {
    const { identifier, password } = await req.json();
    if (identifier === 'identifier' && password === 'password') {
      return res(ctx.json({
        accessToken: 'ACCESS.TOKEN',
        name: 'Tester',
        phoneNumber: '010-3144-7938',
        address: {
          zonecode: 44637,
          fullAddress: '울산광역시 남구 정광로 3번길 20',
          jibunAddress: '울산광역시 남구 무거동 1233-12번지',
        },
      }));
    }
    return res(ctx.status(400));
  }),

  rest.get(`${baseurl}/session/me`, async (req, res, ctx) => res(ctx.json({
    name: 'Tester',
    phoneNumber: '010-3144-7938',
    address: {
      zonecode: 44637,
      fullAddress: '울산광역시 남구 정광로 3번길 20',
      jibunAddress: '울산광역시 남구 무거동 1233-12번지',
    },
  }))),
);

export default server;
