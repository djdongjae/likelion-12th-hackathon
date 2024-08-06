<template>
    <div class="food-add-view">
      <h2>{{ meal }} 정보 입력</h2>
      <input v-model="foodInfo.name" placeholder="음식 이름">
      <input v-model="foodInfo.carbohydrate" placeholder="탄수화물 (g)">
      <input v-model="foodInfo.protein" placeholder="단백질 (g)">
      <input v-model="foodInfo.fat" placeholder="지방 (g)">
      <button @click="saveFood">저장</button>
    </div>
  </template>
  
  <script>
  import { insertFood } from "@/apis/service";
  
  export default {
    name: "FoodAddView",
    data() {
      return {
        foodInfo: {
          name: '',
          carbohydrate: '',
          protein: '',
          fat: ''
        },
        meal: this.$route.params.meal,
        selectedDate: this.$route.params.date
      };
    },
    methods: {
      async saveFood() {
        try {
          await insertFood(this.foodInfo, this.meal, this.selectedDate);
          this.$router.push({ name: 'FoodCheckView' });
        } catch (error) {
          console.error("Food saving error", error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .food-add-view {
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
  
  .food-add-view input {
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    box-sizing: border-box;
  }
  
  .food-add-view button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
  }
  </style>
  