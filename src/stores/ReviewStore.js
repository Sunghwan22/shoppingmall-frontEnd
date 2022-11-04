export default class ReviewStore {
  constructor() {
    this.listeners = new Set();
  }

  async createRecommendation(accessToken, reviewId) {

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
