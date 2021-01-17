<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="5" :md="5" class="text-align-left">
          <h1>充值</h1>
          <el-form :model="formObj">
            <el-form-item label="输入卡号|电话|姓名：">
              <el-input placeholder="卡号|电话|姓名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <!--  查询结果    -->
      <el-row>
        <el-col :md="5" :span="5" class="text-align-left">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>卡号：<b class="" style="">1</b></span>
            </div>
            <div>
              <p>姓名：{{ member.name }}</p>
              <p>电话：{{ member.phone }}</p>
              <p>余额：{{ member.overage }}</p>
              <hr/>
              <div>
                <el-form :model="rechargeForm">
                  <el-form-item label="输入充值金额">
                    <el-input placeholder="充值金额" v-model="rechargeForm.overage"></el-input>
                  </el-form-item>
                  <el-form-item label="输入充值密码">
                    <el-input type="password" placeholder="密码" v-model="rechargeForm.password"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="danger">确认充值</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "cardService",
  data() {
    return {
      formObj: {},
      member: {name: 'king', phone: '123456789', overage: 10.0},
      rechargeForm: {overage: 0, password: ''}
    }
  },methods:{

  }
}
</script>

<style scoped>

</style>