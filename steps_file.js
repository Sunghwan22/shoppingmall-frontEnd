/* eslint-disable no-undef */
// in this file you can append custom step methods to 'I' object

const backdoorBaseUrl = 'http://localhost:8000/backdoor';

module.exports = function () {
  return actor({
    setupProduct() {
      this.amOnPage(`${backdoorBaseUrl}/setup-product`);
    },

    setupReviews() {
      this.amOnPage(`${backdoorBaseUrl}/setup-review`);
    },

    setupInquiries() {
      this.amOnPage(`${backdoorBaseUrl}/setup-inquiry`);
    },

    setupWishes() {
      this.amOnPage(`${backdoorBaseUrl}/setup-wishes`);
    },

    setupAnswer() {
      this.amOnPage(`${backdoorBaseUrl}/setup-answer`);
    },

    setupUser() {
      this.amOnPage(`${backdoorBaseUrl}/setup-user`);
    },

    // login() {
    //   // todo 나중에 로그인 구현하면 바꿔야함

    // },
  });
};
