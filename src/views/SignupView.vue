<template>
    <div id="signup-view" class="container">
      <div class="logo-section">
        🐰
      </div>
      <h1>회원가입</h1>
      <form @submit.prevent="handleSignup" class="signup-form">
        <input v-model="name" type="text" placeholder="이름" required>
        <input v-model="email" type="email" placeholder="이메일" required>
        <input v-model="age" type="number" placeholder="나이" required>
        <input v-model="height" type="number" placeholder="키 (cm)" required>
        <input v-model="weight" type="number" placeholder="몸무게 (kg)" required>
        <select v-model="gender" required>
          <option value="">성별 선택</option>
          <option value="male">남성</option>
          <option value="female">여성</option>
        </select>
        <select v-model="activity" required>
          <option value="">활동 수준 선택</option>
          <option value="sedentary">비활동적</option>
          <option value="lightly active">조금 활동적</option>
          <option value="moderately active">중간 활동적</option>
          <option value="very active">매우 활동적</option>
        </select>
        <input v-model="password" type="password" placeholder="비밀번호" required>
        <button type="submit" class="signup-button">회원가입</button>
      </form>
    </div>
  </template>
  
  <script>
  import { signup } from '@/apis/authService';
  
  export default {
    name: "SignupView",
    data() {
      return {
        name: '',
        email: '',
        age: '',
        height: '',
        weight: '',
        gender: '',
        activity: '',
        password: ''
      };
    },
    methods: {
      async handleSignup() {
        try {
          await signup(this.name, this.email, this.age, this.height, this.weight, this.gender, this.activity, this.password);
          alert("회원가입 성공");
          this.$router.push('/');
        } catch (error) {
          console.error("Signup error", error);
          alert("회원가입 에러: " + (error instanceof Error ? error.message : error));
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: linear-gradient(to bottom, #ffcccb, #ff9999); /* Pink gradient background */
    color: #fff; /* White text color */
    font-family: 'Arial', sans-serif;
    text-align: center;
  }
  
  .logo-section {
    font-size: 120px; /* Adjust the emoji size */
    margin-bottom: 20px;
  }
  
  h1 {
    font-size: 24px;
    margin-bottom: 30px;
  }
  
  .signup-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 300px;
  }
  
  .signup-form input, .signup-form select {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box;
  }
  
  .signup-button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
  }
  </style>
  