/* eslint-disable max-len */
import { reviewApiService } from '../services/ReviewApiService';

export default class ReviewStore {
  constructor() {
    this.reviews = [];
    this.review = {};

    this.bestReviews = [];
    this.reviewImages = [];
    this.reviewImage = {};

    this.totalRating = 0;
    this.totalReviewsNumber = 0;

    this.recommendations = [];
    this.recommendation = {};
    this.reviewRecommendations = [];

    this.pageNumbers = [];

    this.isReviewDetail = false;
    this.isBestReviewDetail = false;

    this.listeners = new Set();
  }

  async fetchRecommendation(accessToken, reviewId, productId) {
    this.recommendations = await
    reviewApiService
      .fetchRecommendation(accessToken, reviewId, productId);

    this.publish();
  }

  async changePageNumber(productId, number) {
    const { reviews, recommendations } = await reviewApiService.changePage(productId, number);

    this.reviews = reviews;
    this.recommendations = recommendations;

    this.publish();
  }

  async fetchReviews(productId) {
    const data = await reviewApiService.fetchReviews(productId);

    this.reviews = data.reviews;

    this.reviewImages = data.reviewImages;

    this.recommendations = data.recommendations;

    this.bestReviews = this.reviews.filter((review) => review.bestReview === true);
    this.bestReviews.length = 4;

    this.pageNumbers = [...Array(data.pageNumber)].map((number, index) => index + 1);

    this.totalRating = data.totalRating;

    this.totalReviewsNumber = data.totalReviewsNumber;

    this.publish();
  }

  async fetchReview(reviewId) {
    const { review, reviewRecommendations, reviewImage } = await reviewApiService.fetchReview(reviewId);

    this.review = review;

    this.reviewRecommendations = reviewRecommendations;

    this.reviewImage = reviewImage;

    this.isReviewDetail = true;

    this.publish();
  }

  async fetchBestReview(reviewId) {
    const { review, reviewRecommendations, reviewImage } = await reviewApiService.fetchReview(reviewId);

    this.review = review;

    this.reviewRecommendations = reviewRecommendations;

    this.reviewImage = reviewImage;

    this.isBestReviewDetail = true;

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

  subscribe(listener) {
    this.listeners.add(listener);

    this.publish();
  }

  unSubscribe(listener) {
    this.listeners.delete(listener);

    this.publish();
  }

  publish() {
    this.listeners.forEach((listener) => listener());
  }
}

export const reviewStore = new ReviewStore();
