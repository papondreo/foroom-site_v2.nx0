<template>
  <div>
    <div v-for="group in materials" :key="group.titleName">
      <ui-title tag="h2" class="ui-title-1">
        {{ group.titleName }}
      </ui-title>

      <div class="material-gallery">
        <div
          class="material-item"
          v-for="material in group.items"
          :key="material.materialId"
        >
          <div class="material-card" @click="openModal(material.img)">
            <img
              :src="material.img"
              :alt="material.alt"
              :title="material.title"
              class="material-image"
            />
            <h3 class="material-name">{{ material.name }}</h3>
          </div>
        </div>
      </div>
    </div>

    
    <div v-if="isModalOpen" class="modal" @click="closeModal">
      <img :src="currentImage" alt="Material" class="modal-image" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { mapGetters } from "vuex";

@Component({
  computed: {
    ...mapGetters("materials", ["getMaterials"]),
  },
})
export default class MaterialPages extends Vue {
  public isModalOpen: boolean = false;
  public currentImage: string = "";

  get currentSystem() {
    return this.$parent?.currentSystem || null;
  }

  get materials() {
    if (this.currentSystem === "rolo") return [this.getMaterials[0]];
    if (this.currentSystem === "wood") return [this.getMaterials[1]];
    return [];
  }

  openModal(img: string) {
    this.currentImage = img;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
</script>
<style scoped>

.ui-title-1 {
    margin-bottom: 16px;
    font-size: 19px;
    font-weight: 400;
    text-transform: uppercase;
    color: #d38f2c;
}

.material-gallery {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr); 
  gap: 10px; 
  background-color: #f1f1f1; 
  border-radius: 12px; 
}

.material-item {
  position: relative;
  cursor: pointer;
  padding: 10px;
  background-color: white;
  border-radius: 8px; 
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.material-card {
  display: flex;
  flex-direction: column; 
  justify-content: space-between;
  height: 300px; 
  position: relative;
}

.material-image {
  width: 100%;
  height: 85%; 
  object-fit: cover;
  object-position: center 30%;
  border-radius: 8px;
}

.material-name {
  text-align: center;
  font-size: 1rem;
  margin-top: 10px;
  color: #333;
  margin-bottom: 0; 
}



.material-card:hover .material-image {
  content: attr(alt); 
  font-size: 1rem;
  color: white;
  background-color: rgba(0, 0, 0, 0.5); 
  padding: 5px;
  border-radius: 4px;
}


.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.363);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-image {
  max-width: 80%;
  max-height: 80%;
}
</style>
