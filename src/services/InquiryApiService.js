/* eslint-disable class-methods-use-this */
import axios from 'axios';
import config from '../../config';
import APIService from './APIService';

const baseurl = config.apiBaseUrl;

export default class InquiryApiService extends APIService {
  async fetchInquiries({ productId, accessToken, page }) {
    if (accessToken === undefined) {
      const url = `${baseurl}/products/${productId}/inquiries`;

      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${''}`,
        },

        params: {
          page,
        },
      });

      return data;
    }

    const url = `${baseurl}/products/${productId}/inquiries`;

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        page,
      },
    });

    return data;
  }

  async fetchMyInquiries(productId, accessToken, number) {
    const url = `${baseurl}/products/${productId}/inquiries/user/me`;

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
    const url = `${baseurl}/products/${productId}/inquiries`;

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
