Vue.component("review-form", {
  data: function () {
    return {
      name: "",
      review: "",
      rating: null,
      recommend: null,
    };
  },
  methods: {
    onSubmit() {
      if (
        this.name == "" ||
        this.review == "" ||
        this.rating == null ||
        this.recommend == null
      ) {
        alert("글을 채워주세요");
        return;
      }

      let productReview = {
        name: this.name,
        review: this.review,
        rating: this.rating,
        recommend: this.recommend,
      };
      this.$emit("review-submitted", productReview);

      this.name = "";
      this.review = "";
      this.rating = null;
      this.recommend = null;
    },
  },
  template: `
        <form class="review-form" @submit.prevent="onSubmit">
            <h3>리뷰를 남기세요</h3>
            <label for="name">이름 : </label>
            <input type="text" id="name" v-model="name">

            <label for="review">리뷰 : </label>
            <textarea id="review" v-model="review"></textarea>

            <label for="rating">별점 </label>
            <select id="rating" v-model.number="rating">
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>

            <label for="recommend">이 물건을 추천하나요? </label>
            <select id="recommend" v-model="recommend">
                <option>Yes</option>
                <option>No</option>
            </select>

            <input class="button" type="submit" value="Submit">
        </form>
    `,
});
