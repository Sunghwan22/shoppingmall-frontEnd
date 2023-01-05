import Store from './Store';

export default class ReviewFormStore extends Store {
  constructor() {
    super();

    this.rating = 0;
    this.content = '';
    this.preViewImages = [];

    this.errorMessage = '';

    this.uploadImages = [];
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

  async changePreViewImage(images) {
    this.preViewImages = [...images];

    this.publish();
  }

  async changeUploadImage(imageList) {
    this.uploadImages = imageList;

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
