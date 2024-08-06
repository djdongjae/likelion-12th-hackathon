<template>
    <div id="login-view" class="container">
      <div class="logo-section">🐰</div>
      <p class="description">검색만 하면 칼로리 자동 계산</p>
      <h1>간편한 식단, 운동 기록</h1>
      <form @submit.prevent="handleLogin" class="login-form">
        <input v-model="username" type="text" placeholder="아이디" required />
        <input
          v-model="password"
          type="password"
          placeholder="비밀번호"
          required
        />
        <button type="submit" class="login-button">로그인</button>
      </form>
      <button @click="goToSignup" class="signup-button">회원가입</button>
    </div>
  </template>
    
  <script>
  import { login, checkLogin } from "@/apis/authService";
  
  export default {
    name: "LoginView",
    data() {
      return {
        username: "",
        password: "",
      };
    },
    methods: {
      async handleLogin() {
        try {
          const token = await login(this.username, this.password);
          console.log(token);
          localStorage.setItem("access_token", token);
          if (checkLogin()) {
            this.$router.push("/main");
          } else {
            alert("로그인이 필요한 서비스입니다.");
            this.$router.push("/");
          }
        } catch (error) {
          console.error("Login error", error);
          alert(
            "로그인 에러: " + (error instanceof Error ? error.message : error)
          );
        }
      },
      goToSignup() {
        this.$router.push("/signup");
      },
    },
  };
  </script>
    
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: linear-gradient(
      to bottom,
      #ffcccb,
      #ff9999
    ); /* Pink gradient background */
    color: #fff; /* White text color */
    font-family: "Arial", sans-serif;
    text-align: center;
  }
  
  .logo-section {
    font-size: 120px; /* Adjust the emoji size */
    margin-bottom: 20px;
  }
  
  .description {
    font-size: 16px;
    margin-bottom: 10px;
  }
  
  h1 {
    font-size: 24px;
    margin-bottom: 30px;
  }
  
  .login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 300px;
  }
  
  .login-form input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box;
  }
  
  .login-button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
  }
  
  .signup-button {
    padding: 10px 20px;
    background-color: #f1c40f;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
    margin-top: 10px;
    /* Match the login button */
    max-width: 300px;
    box-sizing: border-box;
  }
  </style>
  