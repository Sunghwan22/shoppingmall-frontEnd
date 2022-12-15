import Store from './Store';

export default class ReviewFormStore extends Store {
  constructor() {
    super();

    this.rating = 0;
    this.content = '';
    this.reviewImages = [];

    this.errorMessage = '';
  }

  async changeRating(rating) {
    const starRating = rating.filter(Boolean).length;

    this.rating = starRating;

    this.errorMessage = '';

    this.publish();
  }

  async changeContent(word) {
    this.content = word;

    this.errorMessage = '';

    this.publish();
  }

  async changeUploadImage(images) {
    this.reviewImages = [...images];

    this.publish();
  }

  async deletePreviewImage(image) {
    this.reviewImages = this.reviewImages.filter((element) => image !== element);

    this.publish();
  }

  async ratingErrorMessage() {
    this.errorMessage = '평점을 매겨주세요!';

    this.publish();
  }

  async contentLengthErrorMessage() {
    this.errorMessage = '리뷰는 20글자 이상 입력해주세요';

    this.publish();
  }
}

export const reviewFormStore = new ReviewFormStore();
