<template>
  <el-row class="tac">
    <el-col :md="24" :span="24">
      <el-menu
          default-active="/ticket"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          mode="horizontal"
          router
      >
        <el-menu-item index="/ticket">
          <i class="el-icon-menu"></i>
          <span slot="title">售票退票</span>
        </el-menu-item>
        <el-menu-item index="/check">
          <i class="el-icon-setting"></i>
          <span slot="title">刷卡验票</span>
        </el-menu-item>
        <el-menu-item index="/equipment">
          <i class="el-icon-document"></i>
          <span slot="title">器材租赁</span>
        </el-menu-item>
        <el-menu-item index="/baggage">
          <i class="el-icon-setting"></i>
          <span slot="title">物品保管</span>
        </el-menu-item>
        <el-menu-item index="/card">
          <i class="el-icon-setting"></i>
          <span slot="title">开卡充值</span>
        </el-menu-item>

      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
name: "Navigation"
}
</script>

<style scoped>

</style>