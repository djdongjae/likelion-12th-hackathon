<template>
    <div class="modal-backdrop" @click.self="close">
      <div class="modal">
        <div class="modal-header">
          <h2>운동 입력</h2>
          <button @click="close" class="close-button">✕</button>
        </div>
        <input v-model="fitnessInfo.name" type="text" placeholder="운동 이름 (필수)" required />
        <input v-model="fitnessInfo.minute" type="number" placeholder="운동 시간 (필수)" required />
        <input v-model="fitnessInfo.calories" type="number" placeholder="소모 칼로리 (선택)" required />
        <button @click="save" class="save-button">완료</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "FitnessInputModal",
    data() {
      return {
        fitnessInfo: {
          name: '',
          minute: 0,
          calories: 0
        }
      };
    },
    methods: {
      close() {
        this.$emit('close');
      },
      save() {
        this.$emit('save', this.fitnessInfo);
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
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .close-button {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }
  
  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    font-size: 20px;
    text-align: center;
    box-sizing: border-box;
  }
  
  .save-button {
    padding: 10px 20px;
    background-color: #ffcc00;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
  }
  </style>
  