/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import config from '../config';

const baseurl = config.apiBaseUrl;

const server = setupServer(
  rest.get(`${baseurl}/products/1`, async (request, response, context) => response(context.json({
    product: {
      id: 1,
      productNumber: 12,
      productName: '아이폰 14',
      image: 's3://test-s3-image/스크린샷 2022-10-20 오후 10.55.03.png',
      maker: '애플',
      views: 1000,
      cumulativesales: 150,
      like: 100,
      options: ['맥스 + 300000', '그라파이트', '블랙', '실버'],
      price: 1500000,
      wish: 30,
    },
  }))),
);

export default server;
