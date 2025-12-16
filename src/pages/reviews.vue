<template>
  <main>
    <section class="container">
      <div class="row">
        <div class="col-12">
          <p class="h1">Отзывы</p>
        </div>
      </div>
    </section>

    <section class="container reviews">
      <div class="row">
        <div
          v-for="i in 6"
          :key="i"
          class="col-3"
        >
          <div class="review">
            <header>
              <div class="review_name">Андрей</div>
              <div class="review_date">20.02.2023</div>
            </header>
            <div class="review_stars">
              <img
                v-for="i in 5"
                :key="i"
                src="/img-new/icons/star.svg"
                alt=""
              />
            </div>
            <div class="review_content">
              <p class="review_title">Плюсы</p>
              <p class="review_text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit
              </p>

              <p class="review_title">Минусы</p>
              <p class="review_text">
                Amet consectetur corporis cumque maiores.
              </p>

              <p class="review_title">Комментарий</p>
              <p class="review_text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Accusamus ea harum ipsa praesentium quae? Alias consequatur
                debitis dolorem eius exercitationem explicabo illum impedit, in
                pariatur, quam quasi quidem, reprehenderit vitae?
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({})
export default class ReviewsPage extends Vue {}
</script>

<style lang="scss" scoped>
.container {
  max-width: 1440px;
}

.h1 {
  margin-bottom: 16px;
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 400;
}

.review {
  padding: 24px;
  margin-bottom: 48px;

  background: #f5f5f8;
  border-radius: 8px;
  box-shadow: 0 4px 40px rgba(219, 215, 215, 0.5);

  header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;

    //margin-bottom: 8px;
  }

  &_name {
    font-size: 17px;
    font-weight: 400;
  }
  &_date {
    color: #b7b5b5;
  }

  &_stars {
    img {
      width: 16px;
      height: 16px;
      margin-right: 3px;
    }
  }

  &_title {
    margin-top: 12px;
    font-weight: 400;
  }

  &_text {
  }
}
</style>
