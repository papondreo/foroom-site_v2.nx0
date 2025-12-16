<template>
  <div v-if="!isAccepted" class="cookie-banner">
    <div class="cookie-content">
      <p>Мы используем файлы cookie и рекомендательные технологии. Пользуясь сайтом, вы соглашаетесь с
        <a href="/personalnie-dannie" target="_blank" @click.stop>Политикой обработки персональных данных</a>.
      </p>
      <div class="cookie-buttons">
        <button @click="acceptCookies" class="accept-btn">Принять</button>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CookieBanner',
  data() {
    return {
      isAccepted: false
    }
  },
  mounted() {
    const cookieAccepted = localStorage.getItem('cookiesAccepted');
    if (cookieAccepted) {
      this.isAccepted = true;
    }
  },
  methods: {
    acceptCookies() {
      this.isAccepted = true;
      const expiryDate = new Date();
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
      localStorage.setItem('cookiesAccepted', 'true');
      localStorage.setItem('cookiesExpiry', expiryDate.toISOString());
    },
    declineCookies() {
      localStorage.setItem('cookiesAccepted', 'false');
      this.isAccepted = true;
    }
  }
}
</script>

<style scoped>
.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f5f5f5;
  padding: 15px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 9999;
}

.cookie-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 15px;
}

.cookie-content p {
  margin: 0;
  color: #333;
}

.cookie-content a {
  color: #df771c;
  text-decoration: underline;
}

.cookie-buttons {
  display: flex;
  gap: 10px;
}

.accept-btn {
  background-color: #df771c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.decline-btn {
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .cookie-content {
    flex-direction: column;
    text-align: center;
  }
}
</style>