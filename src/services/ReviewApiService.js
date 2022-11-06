/* eslint-disable class-methods-use-this */
import axios from 'axios';
import config from '../../config';

const baseurl = config.apiBaseUrl;

export default class ReviewApiService {
  async fetchRecommendation(accessToken, reviewId, productId) {
    const url = `${baseurl}/reviews/recommendation/${reviewId}`;

    const { data } = await axios.post(url, { productId }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  }

  async fetchReviews(productId) {
    const url = `${baseurl}/reviews/${productId}`;

    const { data } = await axios.get(url);

    return data;
  }
}

export const reviewApiService = new ReviewApiService();
