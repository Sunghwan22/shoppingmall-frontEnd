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

    this.listeners = new Set();
  }

  async fetchRecommendation(accessToken, reviewId, productId) {
    try {
      await reviewApiService.fetchRecommendation(accessToken, reviewId);
    } catch (error) {
      const { message } = error.response.data;

      this.errorMessage = message;
    }

    await this.fetchBestReviews(productId);

    await this.fetchReviews(productId);

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

  async changePageNumber(productId, number) {
    this.reviews = await reviewApiService.changePage(productId, number);

    this.publish();
  }

  async changeBestReviewPageNumber(productId, number) {
    this.bestReviews = await reviewApiService.changeBestReviewPage(productId, number);

    this.publish();
  }

  async fetchReviews(productId) {
    const data = await reviewApiService.fetchReviews(productId);

    this.reviews = data.reviews;

    this.pageNumbers = [...Array(data.pages)].map((number, index) => index + 1);

    this.totalRating = data.totalRating;

    this.totalReviewsNumber = data.totalReviewNumber;

    this.publish();
  }

  async fetchBestReviews(productId) {
    const data = await reviewApiService.fetchBestReviews(productId);

    this.bestReviews = data.reviews;

    this.bestReviewPageNumbers = [...Array(data.pages)].map((number, index) => index + 1);

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
}

export const reviewStore = new ReviewStore();
