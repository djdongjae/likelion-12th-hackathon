<template>
    <div id="main-view">
      <header class="header">
        <button @click="goBack" class="nav-button">←</button>
        <div class="date-selector">
          <button @click="previousDate" class="date-button">←</button>
          <span>{{ formattedDate }}</span>
          <button @click="nextDate" class="date-button">→</button>
        </div>
        <button @click="showMenu" class="nav-button">☰</button>
      </header>
      <div class="header-info">
        <h1>오늘 하루</h1>
        <div class="calories">
          <span class="consumed">{{ userInfo.consumedCalories }}</span> / <span class="total">{{ userInfo.remainCalories }} kcal</span>
        </div>
      </div>
      <div class="rabbit-emoji">🐰</div>
      <div class="calories-info">
        <span class="burned">🔥 {{ userInfo.consumedCalories }}kcal 섭취</span> |
        <span class="remaining">{{ userInfo.remainCalories -  userInfo.consumedCalories }}kcal 더 먹을 수 있어요</span>
      </div>
      <div class="nutrients">
        <div class="nutrient">
          <span>순탄수</span>
          <span>{{ userInfo.carbohydrate }} / 197g</span>
        </div>
        <div class="nutrient">
          <span>단백질</span>
          <span>{{ userInfo.protein }} / 62g</span>
        </div>
        <div class="nutrient">
          <span>지방</span>
          <span>{{ userInfo.fat }} / 38g</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { loadUser } from "@/apis/service";
  
  export default {
    name: "MainView",
    data() {
      return {
        userInfo: {
          consumedCalories: 0,
          remainCalories: 1787,
          carbohydrate: 0,
          protein: 0,
          fat: 0
        },
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
      async loadUserData() {
        try {
          const response = await loadUser(this.currentDate);
          this.userInfo = response || {
            consumedCalories: 0,
            remainCalories: 1787,
            carbohydrate: 0,
            protein: 0,
            fat: 0
          };
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
        this.loadUserData();
      },
      nextDate() {
        const date = new Date(this.currentDate);
        date.setDate(date.getDate() + 1);
        this.currentDate = date.toISOString().split('T')[0];
        this.loadUserData();
      },
      showMenu() {
        // Implement menu logic here
      }
    },
    async mounted() {
      await this.loadUserData();
    }
  };
  </script>
  
  <style scoped>
  #main-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to bottom, #ffcccb, #ff9999);
    color: #fff;
    font-family: 'Pretendard', sans-serif;
    padding: 20px;
    box-sizing: border-box;
    height: 90vh;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;
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
  
  .header-info {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .header-info h1 {
    margin: 0;
    font-size: 24px;
  }
  
  .calories {
    font-size: 18px;
    margin-top: 10px;
  }
  
  .rabbit-emoji {
    font-size: 80px;
    margin: 20px 0;
  }
  
  .calories-info {
    font-size: 16px;
    margin: 10px 0;
  }
  
  .nutrients {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }
  
  .nutrient {
    text-align: center;
  }
  
  .nutrient span:first-child {
    display: block;
    font-size: 14px;
    margin-bottom: 5px;
  }
  
  .nutrient span:last-child {
    font-size: 18px;
  }
  </style>
  