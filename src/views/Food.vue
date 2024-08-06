<template>
    <div id="food-view">
      <div class="date-picker">
        <label for="date">날짜 선택:</label>
        <input type="date" id="date" v-model="selectedDate" @change="loadFoodStatus">
      </div>
      <div class="meals">
        <div class="meal" :class="{ disabled: foodStatus.breakfast }" @click="!foodStatus.breakfast && showModal('breakfast')">
          <div class="meal-icon">🍎</div>
          <span>아침</span>
          <div class="add-button">+</div>
          <span class="completed" v-if="foodStatus.breakfast">✔ 단식했어요</span>
        </div>
        <div class="meal" :class="{ disabled: foodStatus.lunch }" @click="!foodStatus.lunch && showModal('lunch')">
          <div class="meal-icon">🍚</div>
          <span>점심</span>
          <div class="add-button">+</div>
          <span class="completed" v-if="foodStatus.lunch">✔ 단식했어요</span>
        </div>
        <div class="meal" :class="{ disabled: foodStatus.dinner }" @click="!foodStatus.dinner && showModal('dinner')">
          <div class="meal-icon">🥗</div>
          <span>저녁</span>
          <div class="add-button">+</div>
          <span class="completed" v-if="foodStatus.dinner">✔ 단식했어요</span>
        </div>
        <div class="meal" :class="{ disabled: foodStatus.snack }" @click="!foodStatus.snack && showModal('snack')">
          <div class="meal-icon">🍰</div>
          <span>간식</span>
          <div class="add-button">+</div>
          <span class="completed" v-if="foodStatus.snack">✔ 단식했어요</span>
        </div>
      </div>
      <Modal v-if="isModalVisible" :meal="currentMeal" @close="closeModal" @save="saveFood"/>
    </div>
  </template>
  
  <script>
  import Modal from './Modal.vue';
  import { insertFood } from "@/apis/service";
  
  export default {
    name: "FoodView",
    components: {
      Modal
    },
    data() {
      return {
        isModalVisible: false,
        currentMeal: '',
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
      loadFoodStatus() {
        // Reset foodStatus to initial state on date change
        this.foodStatus = {
          breakfast: false,
          lunch: false,
          dinner: false,
          snack: false
        };
      },
      showModal(meal) {
        this.currentMeal = meal;
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      },
      async saveFood(foodInfo) {
        try {
          await insertFood(foodInfo, this.currentMeal, this.selectedDate);
          this.foodStatus[this.currentMeal] = true; // Mark the meal as completed
          this.isModalVisible = false;
        } catch (error) {
          console.error("Food saving error", error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  #food-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #d1e9b7; /* Light green background */
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
  