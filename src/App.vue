<template>
  <div id="App">
    <HeaderComponent />
    <router-view />
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from "./components/HeaderComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";

export default {
  name: "App",
  components: {
    HeaderComponent,
    FooterComponent
  }
}
</script>

<style>
body {
  font-family: 'Pretendard', sans-serif;
}

#App #header {
  height: 35px;
}

div#App {
  margin: 0px auto; /* 상하 마진 추가 */
  width: 350px; /* 너비는 유지 */
  border: 1px solid #ddd; /* 테두리 색상을 더 연한 그레이로 변경 */
  box-shadow: 5px 5px 10px rgba(0,0,0,0.1); /* 박스 쉐도우를 부드럽게 적용 */
  background-color: #f5f5f5;
  box-sizing: border-box;
}
</style>