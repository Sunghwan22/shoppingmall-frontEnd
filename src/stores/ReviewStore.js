import { reviewApiService } from '../services/ReviewApiService';

export default class ReviewStore {
  constructor() {
    this.reviews = [];
    this.bestReviews = [];
    this.reviewImages = [];

    this.totalRating = 0;

    this.recommendations = [];
    this.recommendation = {};

    this.listeners = new Set();
  }

  async fetchRecommendation(accessToken, reviewId, productId) {
    const data = await reviewApiService.fetchRecommendation(accessToken, reviewId, productId);

    this.recommendations = data.recommendations;

    this.publish();
  }

  async fetchReviews(productId) {
    const data = await reviewApiService.fetchReviews(productId);

    this.reviews = data.reviews;

    this.reviewImages = data.reviewImages;

    this.recommendations = data.recommendations;

    this.bestReviews = this.reviews.filter((review) => review.bestReview === true);
    this.bestReviews.length = 4;

    this.totalRating = this.reviews.reduce((accumulator, review) => accumulator + review.rating, 0)
    / this.reviews.length;

    // this.pageNumbers = [...Array(data.pageNumber)].map((number, index) => index + 1);

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
