/* eslint-disable class-methods-use-this */
import axios from 'axios';
import config from '../../config';
import APIService from './APIService';

const baseurl = config.apiBaseUrl;

export default class ReviewApiService extends APIService {
  constructor() {
    super();
  }

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

  async fetchReviews({ productId, page }) {
    const url = `${baseurl}/products/${productId}/reviews`;

    const { data } = await axios.get(url, {
      params: {
        page,
      },
    });

    return data;
  }

  async fetchBestReviews({ productId, page }) {
    const url = `${baseurl}/products/${productId}/reviews/best`;

    const { data } = await axios.get(url, {
      params: {
        page,
      },
    });

    return data;
  }

  async fetchReview(reviewId) {
    const url = `${baseurl}/reviews/${reviewId}`;

    const { data } = await axios.get(url);

    return data;
  }

  async createReview({
    uploadImages,
    rating,
    content,
    description,
    accessToken,
    productId,
    writeReviewId,
  }) {
    const review = {
      rating,
      content,
      description,
      writeReviewId,
    };

    const formdata = new FormData();

    formdata.append('review', JSON.stringify(review));

    uploadImages.forEach((uploadImage) => (
      formdata.append('multipartFiles', uploadImage)
    ));

    const url = `${baseurl}/products/${productId}/reviews`;

    const { data } = await axios.post(url, formdata, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  }
}

export const reviewApiService = new ReviewApiService();
