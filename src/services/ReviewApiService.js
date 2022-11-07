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

    return data.recommendations;
  }

  async fetchReviews(productId) {
    const url = `${baseurl}/reviews/${productId}`;

    const { data } = await axios.get(url);

    return data;
  }

  async changePage(productId, number) {
    const url = `${baseurl}/reviews/${productId}`;

    const { data } = await axios.get(url, {
      params: {
        page: number,
      },
    });

    const { reviews, recommendations } = data;

    return { reviews, recommendations };
  }

  async fetchReview(reviewId) {
    const url = `${baseurl}/reviews/detail/${reviewId}`;

    const { data } = await axios.get(url);

    console.log(data);

    const { review, reviewRecommendations, reviewImage } = data;

    return { review, reviewRecommendations, reviewImage };
  }
}

export const reviewApiService = new ReviewApiService();
