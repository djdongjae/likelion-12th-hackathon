<template>
    <div class="modal-backdrop" @click.self="close">
      <div class="modal">
        <h2>{{ meal }} 정보 입력</h2>
        <input v-model="foodInfo.name" placeholder="음식 이름" required />
        <input v-model="foodInfo.carbohydrate" placeholder="탄수화물 (g)" required />
        <input v-model="foodInfo.protein" placeholder="단백질 (g)" required />
        <input v-model="foodInfo.fat" placeholder="지방 (g)" required />
        <button @click="save">저장</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ModalView",
    props: {
      meal: String
    },
    data() {
      return {
        foodInfo: {
          name: '',
          carbohydrate: '',
          protein: '',
          fat: ''
        }
      };
    },
    methods: {
      close() {
        this.$emit('close');
      },
      save() {
        this.$emit('save', this.foodInfo);
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal {
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 90%;
    max-width: 400px;
    text-align: center;
  }
  
  .modal input {
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    box-sizing: border-box;
  }
  
  .modal button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
  }
  </style>
  