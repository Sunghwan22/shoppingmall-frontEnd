/* eslint-disable class-methods-use-this */
import axios from 'axios';
import config from '../../config';
import APIService from './APIService';

const baseurl = config.apiBaseUrl;

export default class ReviewApiService extends APIService {
  async fetchRecommendation(accessToken, reviewId) {
    const url = `${baseurl}/reviews/${reviewId}/recommendations`;

    const { data } = await axios.post(url, {}, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { recommendations } = data;

    return recommendations;
  }

  async fetchReviews(productId, number) {
    const url = `${baseurl}/reviews/products/${productId}`;

    const { data } = await axios.get(url, {
      params: {
        page: number,
      },
    });

    return data;
  }

  async fetchBestReviews(productId, number) {
    const url = `${baseurl}/reviews/best/products/${productId}`;

    const { data } = await axios.get(url, {
      params: {
        page: number,
      },
    });

    return data;
  }

  async fetchReview(reviewId) {
    const url = `${baseurl}/reviews/${reviewId}`;

    const { data } = await axios.get(url);

    return data;
  }
}

export const reviewApiService = new ReviewApiService();
