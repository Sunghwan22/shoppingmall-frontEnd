/* eslint-disable max-len */
import { inquiryApiService } from '../services/InquiryApiService';
import Store from './Store';

export default class InquiryStore extends Store {
  constructor() {
    super();

    this.inquiries = [];
    this.myInquiries = [];
    this.inquiry = {};

    this.totalInquiryNumber = 0;
    this.myInquiriesPageNumbers = [];
    this.inquiryPageNumbers = [];

    this.listeners = new Set();
    this.blankAccessToken = '';
  }

  async fetchInquiries(productId, accessToken) {
    if (accessToken === undefined) {
      const data = await inquiryApiService.fetchInquiries(productId, this.blankAccessToken);

      this.inquiries = data.inquiries;

      this.totalInquiryNumber = data.totalInquiryNumber;

      this.inquiryPageNumbers = [...Array(data.pages)].map((number, index) => index + 1);

      this.publish();
      return;
    }

    const data = await inquiryApiService.fetchInquiries(productId, accessToken);

    this.inquiries = data.inquiries;

    this.totalInquiryNumber = data.totalInquiryNumber;

    this.inquiryPageNumbers = [...Array(data.pages)].map((number, index) => index + 1);

    this.publish();
  }

  async changeInquiryPageNumber(productId, accessToken, number) {
    const data = await inquiryApiService.changePageNumber(productId, accessToken, number);

    this.inquiries = data.inquiries;

    this.publish();
  }

  async fetchMyInquiries(productId, accessToken) {
    const data = await inquiryApiService.fetchMyInquiries(productId, accessToken);

    this.myInquiries = data.inquiries;

    this.myInquiriesPageNumbers = data.pageNumbers;

    this.publish();
  }

  async changeMyInquiryPageNumber(productId, accessToken, number) {
    const data = await inquiryApiService.changeMyInquiryPageNumber(productId, accessToken, number);

    this.myInquiries = data.inquiries;

    this.publish();
  }

  async fetchInquiry(inquiryId, accessToken) {
    this.inquiry = await inquiryApiService.fetchInquiry(inquiryId, accessToken);

    this.publish();
  }

  async createInquiry(productId, accessToken, inquiryInformation) {
    this.inquiry = await inquiryApiService.createInquiry(productId, accessToken, inquiryInformation);

    this.publish();
  }
}

export const inquiryStore = new InquiryStore();
