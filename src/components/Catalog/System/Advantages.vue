<template>
  <div class="flex flex-col space-y-6 p-6 max-w-5xl mx-auto">
    <h1 class="text-2">
      {{ advantagesGroup.titleName }}
    </h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div
        v-for="(item, index) in advantagesGroup.items"
        :key="index"
        class="card"
      >
        <div class="image-wrapper">
          <img
            :src="item.image"
            :alt="item.alt"
            :title="item.title"
            class="card-image"
          />
        </div>

        <div class="card-text">
          <p class="text">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>




<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { mapGetters } from "vuex";

@Component({
  computed: {
    ...mapGetters("advantages", ["getAdvantages"]),
  },
})
export default class AdvantagesPages extends Vue {
  get currentSystem() {
    return this.$parent?.currentSystem || null;
  }

  get advantagesGroup() {
    if (this.currentSystem === "rolo") return this.getAdvantages[0];
    if (this.currentSystem === "wood") return this.getAdvantages[1];
    return [];
  }

//   mounted() {
//   console.log("currentSystem:", this.currentSystem);
//   console.log("advantages:", this.getAdvantages);
// }

}
</script>

<style scoped>
.flex-col {
  max-width: 1800px;
  margin: auto;
  padding-bottom: 40px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;
}

@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 960px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.card {
  display: flex;
  flex-direction: row; /* всегда в строку */
  align-items: center;
  padding: clamp(12px, 2vw, 20px);
  background-color: #f3f4f6;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.image-wrapper {
  flex-shrink: 0;
}

.card-image {
  width: clamp(60px, 18vw, 100px);
  height: clamp(60px, 18vw, 100px);
  object-fit: cover;
  border-radius: 6px;
}

.card-text {
  margin-left: clamp(8px, 2vw, 16px);
  flex: 1;
}

.text {
  color: #000000;
  font-style: normal;
  font-weight: 300;
  letter-spacing: 0.2px;
  font-size: clamp(14px, 2vw, 16px);
}

.text-2 {
  text-align: left;
  margin-bottom: 16px;
  font-size: clamp(18px, 2.5vw, 24px);
  font-weight: 400;
  text-transform: uppercase;
  color: #d38f2c;
}
</style>

