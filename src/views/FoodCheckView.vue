<template>
    <div id="food-check-view">
      <div class="date-picker">
        <label for="date">날짜 선택:</label>
        <input type="date" id="date" v-model="selectedDate" @change="loadFoodStatus">
      </div>
      <div class="meals">
        <div class="meal" :class="{ disabled: foodStatus.breakfast }" @click="!foodStatus.breakfast && goToFoodAdd('breakfast')">
          <div class="meal-icon">🍎</div>
          <span>아침</span>
          <div class="add-button">+</div>
          <span class="completed" v-if="foodStatus.breakfast">✔ 단식했어요</span>
        </div>
        <div class="meal" :class="{ disabled: foodStatus.lunch }" @click="!foodStatus.lunch && goToFoodAdd('lunch')">
          <div class="meal-icon">🍚</div>
          <span>점심</span>
          <div class="add-button">+</div>
          <span class="completed" v-if="foodStatus.lunch">✔ 단식했어요</span>
        </div>
        <div class="meal" :class="{ disabled: foodStatus.dinner }" @click="!foodStatus.dinner && goToFoodAdd('dinner')">
          <div class="meal-icon">🥗</div>
          <span>저녁</span>
          <div class="add-button">+</div>
          <span class="completed" v-if="foodStatus.dinner">✔ 단식했어요</span>
        </div>
        <div class="meal" :class="{ disabled: foodStatus.snack }" @click="!foodStatus.snack && goToFoodAdd('snack')">
          <div class="meal-icon">🍰</div>
          <span>간식</span>
          <div class="add-button">+</div>
          <span class="completed" v-if="foodStatus.snack">✔ 단식했어요</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { checkFood } from "@/apis/service";
  
  export default {
    name: "FoodCheckView",
    data() {
      return {
        selectedDate: new Date().toISOString().split('T')[0],
        foodStatus: {
          breakfast: false,
          lunch: false,
          dinner: false,
          snack: false
        }
      };
    },
    methods: {
      async loadFoodStatus() {
        try {
          const response = await checkFood(this.selectedDate);
          console.log(response);
          this.foodStatus = response;
        } catch (error) {
          console.error("Food status loading error", error);
        }
      },
      goToFoodAdd(meal) {
        this.$router.push({ name: 'FoodAddView', params: { meal, date: this.selectedDate } });
      }
    },
    async mounted() {
      await this.loadFoodStatus();
    }
  };
  </script>
  
  <style scoped>
  #food-check-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #d1e9b7;
    color: #fff;
    font-family: 'Pretendard', sans-serif;
    padding: 20px;
    box-sizing: border-box;
    height: 90vh;
  }
  
  .date-picker {
    margin-bottom: 20px;
  }
  
  .meals {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  .meal {
    background-color: #a5c787;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    position: relative;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .meal.disabled {
    background-color: #d3d3d3;
    cursor: not-allowed;
  }
  
  .meal-icon {
    font-size: 50px;
    margin-bottom: 10px;
  }
  
  .add-button {
    font-size: 24px;
    position: absolute;
    top: 10px;
    right: 10px;
  }
  
  .completed {
    display: block;
    margin-top: 10px;
    font-size: 14px;
  }
  </style>
  