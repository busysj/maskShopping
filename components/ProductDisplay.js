Vue.component("product-display", {
  data: function () {
    return {
      brand: "LG",
      product: "마스크",
      pay: 15000,
      // 상세 설명
      details: ["폴리프로필렌 부직포", "플라스틱(코편)", "나일론끈"],
      // 상품의 종류 - 배열 안에 색, 이미지, 재고
      variants: [
        { color: "white", image: "images/mask_white.jpg", stock: 10 },
        { color: "black", image: "images/mask_black.jpg", stock: 0 },
      ],
      // 선택한 상품
      selection: 0,

      reviews: [],
    };
  },
  methods: {
    updateVariant(index) {
      this.selection = index;
    },
    addToCart() {
      this.$emit("add-to-cart", this.variants[this.selection].id);
    },
    addReview(review) {
      this.reviews.push(review);
    },
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      // 배열의 이미지 값을 들고 오기 위함
      // selection을 이용하여 선택한 상품의 인덱스를 받아옴
      return this.variants[this.selection].image;
    },
    isStock() {
      // 배열의 재고 값을 들고 오기 위함
      return this.variants[this.selection].stock;
    },
  },
  template: `
         <div class="product-display">
            <div class="product-container">
                <!-- 이미지 추가 -->
                <div class="product-image">
                <img :src="image" />
                </div>

                <!-- 상품설명 -->
                <div class="product-info">
                <h1>{{ title }}</h1>
                <p v-if="isStock"> 재고가 남아 있습니다 </p>
                <p v-else> 재고가 없습니다 </p>

                <p>금액 : {{ pay }}</p>

                <!-- 상품 세부 설명 -->
                <ul>
                    <!-- 배열로 들고와서 출력 -->
                    <li v-for="detail in details"> {{ detail }} </li>
                </ul>

                <!-- 색상 바꾸기 -->
                <!-- 값을 두 개 들고오면 뒤에 오는 값은 배열의 인덱스값 -->
                <div 
                class="color-circle"
                v-for="(variant, index) in variants"
                v-bind:style="{ backgroundColor: variant.color }"
                v-on:mouseover="updateVariant(index)">
                </div>

                <!-- 버튼 -->
                <button 
                    class="button"
                    v-bind:class = "{ disabledButton : !isStock }"
                    @click="addToCart">
                    장바구니에 추가
                </button>
                </div>
            </div>

            <review-list v-if="reviews.length" :reviews="reviews"></review-list>
            <review-form @review-submitted="addReview"></review-form>
      </div>

        
    `,
});
