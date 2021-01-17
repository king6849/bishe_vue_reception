<template>
  <el-container>
    <el-header>
      <h1>游泳馆服务系统</h1>
      <Navigation></Navigation>
    </el-header>

    <el-main class="home_main">
      <router-view></router-view>
    </el-main>

  </el-container>
</template>

<script>
import Navigation from "@/components/home/Navigation";

export default {
  name: "Home",
  components:{
    Navigation
  }
}
</script>

<style scoped>
.home_main{
  margin-top: 3%;
  height: 100%;
}

</style>