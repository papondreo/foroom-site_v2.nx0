<template>
  <div>
    <section class="error-page">
      <img
        class="error-page__image"
        src="/_images/404.svg"
      />
    </section>
  </div>
</template>

<script>
export default {
  name: 'error',
  head() {
    return {
      title: 'Ошибка!',
      meta: [{ hid: 'description', name: 'description', content: '' }]
    }
  },
  data: () => ({
    breadcrumbs: [
      {
        name: 'Ошибка'
      }
    ]
  })
}
</script>

<style scoped>
.error-page {
  display: flex;
  justify-content: center;
}
.error-page__image {
  margin: 50px 0;
  max-width: 300px;
}
</style>
