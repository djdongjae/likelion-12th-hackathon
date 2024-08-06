<template>
    <div id="weight-view" class="container">
      <header class="header">
        <button @click="goBack" class="nav-button">←</button>
        <div class="date-selector">
          <button @click="previousDate" class="date-button">←</button>
          <span>{{ formattedDate }}</span>
          <button @click="nextDate" class="date-button">→</button>
        </div>
        <button @click="showMenu" class="nav-button">☰</button>
      </header>
      <main class="main-content">
        <h2>나의 변화</h2>
        <p>오늘 내 체중은?</p>
        <h1>{{ weight }} kg</h1>
        <div class="scale-image">⚖️</div>
        <button @click="openWeightInput" class="record-button">기록하기</button>
      </main>
      <WeightInputModal v-if="isModalVisible" :weight="weight" @close="closeWeightInput" @save="saveWeight" />
    </div>
  </template>
  
  <script>
  import { loadWeight, insertWeight } from "@/apis/service";
  import WeightInputModal from './WeightInputModal.vue';
  
  export default {
    name: "WeightView",
    components: {
      WeightInputModal
    },
    data() {
      return {
        weight: 0.0,
        isModalVisible: false,
        currentDate: new Date().toISOString().split('T')[0]
      };
    },
    computed: {
      formattedDate() {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(this.currentDate).toLocaleDateString(undefined, options);
      }
    },
    methods: {
      async loadWeightData() {
        try {
          const response = await loadWeight(this.currentDate);
          this.weight = response || 0.0;
        } catch (error) {
          console.error(error);
        }
      },
      openWeightInput() {
        this.isModalVisible = true;
      },
      closeWeightInput() {
        this.isModalVisible = false;
      },
      async saveWeight(newWeight) {
        try {
          await insertWeight({ weight: newWeight }, this.currentDate);
          this.weight = newWeight;
          this.closeWeightInput();
        } catch (error) {
          console.error(error);
        }
      },
      goBack() {
        this.$router.back();
      },
      previousDate() {
        const date = new Date(this.currentDate);
        date.setDate(date.getDate() - 1);
        this.currentDate = date.toISOString().split('T')[0];
        this.loadWeightData();
      },
      nextDate() {
        const date = new Date(this.currentDate);
        date.setDate(date.getDate() + 1);
        this.currentDate = date.toISOString().split('T')[0];
        this.loadWeightData();
      },
      showMenu() {
        // Implement menu logic here
      }
    },
    async mounted() {
      await this.loadWeightData();
    }
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f5deb3; /* Beige background */
    min-height: 100vh;
    padding: 20px;
    box-sizing: border-box;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  
  .nav-button {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }
  
  .date-selector {
    display: flex;
    align-items: center;
  }
  
  .date-button {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }
  
  .main-content {
    text-align: center;
    margin-top: 20px;
  }
  
  .scale-image {
    font-size: 100px;
    margin: 20px 0;
  }
  
  .record-button {
    padding: 10px 20px;
    background-color: #ffcc00;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  