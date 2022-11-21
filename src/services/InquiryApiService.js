/* eslint-disable class-methods-use-this */
import axios from 'axios';
import config from '../../config';

const baseurl = config.apiBaseUrl;

export default class InquiryApiService {
  async fetchInquiries(productId, accessToken) {
    const url = `${baseurl}/inquiries/products/${productId}`;

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  }

  async changePageNumber(productId, accessToken, number) {
    const url = `${baseurl}/inquiries/products/${productId}`;

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        page: number,
      },
    });

    return data;
  }

  async fetchMyInquiries(productId, accessToken) {
    const url = `${baseurl}/inquiries/products/${productId}/users`;

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  }

  async changeMyInquiryPageNumber(productId, accessToken, number) {
    const url = `${baseurl}/inquiries/products/${productId}/users`;

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        page: number,
      },
    });

    return data;
  }

  async createInquiry(productId, accessToken, inquiryInformation) {
    const url = `${baseurl}/inquiries/products/${productId}`;

    const { data } = await axios.post(url, { ...inquiryInformation }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  }

  async fetchInquiry(inquiryId, accessToken) {
    const url = `${baseurl}/inquiries/${inquiryId}`;

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  }
}

export const inquiryApiService = new InquiryApiService();
