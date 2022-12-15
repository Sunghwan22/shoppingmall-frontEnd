/* eslint-disable max-len */
import { reviewApiService } from '../services/ReviewApiService';
import Store from './Store';

export default class ReviewStore extends Store {
  constructor() {
    super();

    this.reviews = [];
    this.review = {};

    this.bestReviews = [];

    this.totalRating = 0;
    this.totalReviewsNumber = 0;

    this.pageNumbers = [];
    this.bestReviewPageNumbers = [];

    this.isReviewDetail = false;
    this.isBestReviewDetail = false;

    this.recommendations = [];

    this.errorMessage = '';

    this.reviewsCurrentpage = 0;
    this.bestReviewsCurrentpage = 0;

    this.listeners = new Set();
  }

  async fetchRecommendation(accessToken, reviewId, productId) {
    try {
      await reviewApiService.fetchRecommendation(accessToken, reviewId);
    } catch (error) {
      const { message } = error.response.data;

      this.errorMessage = message;
    }

    await this.fetchBestReviews({ productId, page: this.bestReviewsCurrentpage });

    await this.fetchReviews({ productId, page: this.reviewsCurrentpage });

    this.publish();
  }

  async fetchReview(reviewId) {
    this.review = await reviewApiService.fetchReview(reviewId);

    this.isReviewDetail = true;

    this.publish();
  }

  async fetchBestReview(reviewId) {
    this.review = await reviewApiService.fetchReview(reviewId);

    this.isBestReviewDetail = true;

    this.publish();
  }

  async fetchReviews({ productId, page = 1 }) {
    const data = await reviewApiService.fetchReviews({ productId, page });

    this.pageNumbers = [...Array(data.pages)].map((number, index) => index + 1);

    this.totalRating = data.totalRating;

    this.reviews = data.reviews.map((review) => {
      const star = this.ratingStar(review.rating);

      return { ...review, star };
    });

    this.reviewsCurrentpage = page;

    this.totalReviewsNumber = data.totalReviewNumber;

    this.publish();
  }

  async fetchBestReviews({ productId, page = 1 }) {
    const data = await reviewApiService.fetchBestReviews({ productId, page });

    this.bestReviewPageNumbers = [...Array(data.pages)].map((number, index) => index + 1);

    this.bestReviews = data.reviews.map((review) => {
      const star = this.ratingStar(review.rating);

      return { ...review, star };
    });

    this.bestReviewsCurrentpage = page;

    this.publish();
  }

  async createReview({
    reviewImages, rating, content, accessToken,
    productId, description,
  }) {
    await reviewApiService.createReview({
      reviewImages,
      rating,
      content,
      accessToken,
      productId,
      description,
    });

    this.publish();
  }

  exitReviewDetail() {
    this.isReviewDetail = false;

    this.publish();
  }

  exitBestReviewDetail() {
    this.isBestReviewDetail = false;

    this.publish();
  }

  ratingStar(number) {
    if (number === 1) {
      return '⭐️';
    }

    if (number === 2) {
      return '⭐️⭐️';
    }

    if (number === 3) {
      return '⭐️⭐️⭐️';
    }

    if (number === 4) {
      return '⭐️⭐️⭐️⭐️';
    }

    if (number === 5) {
      return '⭐️⭐️⭐️⭐️⭐️';
    }

    return null;
  }
}

export const reviewStore = new ReviewStore();
