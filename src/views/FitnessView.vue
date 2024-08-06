<template>
    <div id="fitness-view" class="container">
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
        <h2>나의 활동</h2>
        <p>오늘 내 운동 시간은?</p>
        <h1>{{ fitnessData.minute }} 분</h1>
        <div class="fitness-image">🥊</div>
        <p>🔥 {{ fitnessData.calories }} kcal 소모량</p>
        <button @click="openFitnessInput" class="record-button">기록하기</button>
      </main>
      <FitnessInputModal v-if="isModalVisible" @close="closeFitnessInput" @save="saveFitness"/>
    </div>
  </template>
  
  <script>
  import { loadFitness, insertFitness } from "@/apis/service";
  import FitnessInputModal from './FitnessInputModal.vue';
  
  export default {
    name: "FitnessView",
    components: {
      FitnessInputModal
    },
    data() {
      return {
        fitnessData: {
          minute: 0,
          calories: 0
        },
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
      async loadFitnessData() {
        try {
          const data = await loadFitness(this.currentDate);
          this.fitnessData = data || { minute: 0, calories: 0 };
        } catch (error) {
          console.error(error);
        }
      },
      openFitnessInput() {
        this.isModalVisible = true;
      },
      closeFitnessInput() {
        this.isModalVisible = false;
      },
      async saveFitness(newFitness) {
        try {
          await insertFitness(newFitness, this.currentDate);
          this.fitnessData = newFitness;
          this.closeFitnessInput();
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
        this.loadFitnessData();
      },
      nextDate() {
        const date = new Date(this.currentDate);
        date.setDate(date.getDate() + 1);
        this.currentDate = date.toISOString().split('T')[0];
        this.loadFitnessData();
      },
      showMenu() {
        // Implement menu logic here
      }
    },
    async mounted() {
      await this.loadFitnessData();
    }
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ff9999; /* Light red background */
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
  
  .fitness-image {
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
  