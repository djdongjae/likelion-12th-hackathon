<template>
  <div id="header">
    <!-- <div id="toHome" @click="goHome">
      <img src="../assets/logo.png" alt="logo" class="logo" />
      <span class="title">TC</span>
    </div> -->
    <div class="user-info">
      <div>
        <span class="title login-link" @click="goHome">
          <span id="mypage">🏠</span>
        </span>
      </div>
    </div>
    <div class="user-info">
      <div>
        <span class="title login-link" @click="goFood">
          <span id="mypage">🥄</span>
        </span>
      </div>
    </div>
    <div class="user-info">
      <div>
        <span class="title login-link" @click="goWeight">
          <span id="mypage">⚖️</span>
        </span>
      </div>
    </div>
    <div class="user-info">
      <div>
        <span class="title login-link" @click="goFitness">
          <span id="mypage">🥊</span>
        </span>
      </div>
    </div>
  </div>
</template>


<script>
import { checkLogin } from "../apis/authService";

export default {
  name: "FooterComponent",
  methods: {
    goHome() {
      if (checkLogin()) {
        this.$router.push("/main");
      } else {
        alert("로그인이 필요한 서비스입니다.");
        this.$router.push("/");
      }
    },
    goFood() {
      if (checkLogin()) {
        this.$router.push("/food");
      } else {
        alert("로그인이 필요한 서비스입니다.");
        this.$router.push("/");
      }
    },
    goWeight() {
      if (checkLogin()) {
        this.$router.push("/weight");
      } else {
        alert("로그인이 필요한 서비스입니다.");
        this.$router.push("/");
      }
    },
    goFitness() {
      if (checkLogin()) {
        this.$router.push("/fitness");
      } else {
        alert("로그인이 필요한 서비스입니다.");
        this.$router.push("/");
      }
    },
  },
};
</script>

<style scoped>
#header {
  display: flex;
  align-items: center;
  justify-content: space-between; /* 좌우로 정렬 */
  padding: 10px 20px;
  background-color: #4b4747;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

#toHome {
  display: flex;
  flex-direction: row;
  cursor: pointer;
}

.logo {
  width: 35px;
  margin-right: 6px;
}

.title {
  font-size: 20px;
  font-weight: bold;
  color: #d6d3d3;
}

.user-info {
  display: flex;
  align-items: center;
}

.login-link {
  cursor: pointer;
  font-size: 15px;
  color: #d6d3d3;
  display: flex;
  align-items: center;
  transition: color 0.3s, transform 0.3s;
}

.login-link i {
  margin-right: 10px;
  font-size: 36px;
}

.login-link:hover {
  color: #f0f0f0;
  transform: scale(1.1);
}

#mypage {
  margin-left: 5px;
  font-size: 25px;
}
</style>