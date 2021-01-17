<template>
  <el-container>
    <el-main>

      <el-dialog
          title="退票操作"
          :visible.sync="dialogVisible"
          width="30%">
        <h1 style="color: red;">确定要退票吗？</h1>
        <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="reFoundTicket">确 定</el-button>
                  </span>
      </el-dialog>

      <el-row>
        <el-col :md="24" :span="24">
          <el-form ref="form" class="demo-form-inline" :inline="true" :model="form" label-width="80px">
            <el-form-item label="输入票号:">
              <el-input v-model="form.no"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <el-row>
        <el-col :md="24" :span="24">
          <el-table
              class=""
              :data="refundTicketTable"
              style="width: 100%">
            <el-table-column
                prop="name"
                label="票类型"
                width="180">
            </el-table-column>

            <el-table-column
                prop="date"
                label="有效期"
                width="220">
            </el-table-column>

            <el-table-column
                prop="prices"
                width="100"
                label="价格">
            </el-table-column>

            <el-table-column
                label="泳池"
                prop="pool"
                width="180">
            </el-table-column>

            <el-table-column
                label="票数"
                prop="numbers"
                width="210">
            </el-table-column>
            <el-table-column
                label="状态"
                prop="status"
                width="210">
            </el-table-column>
            <el-table-column
                width="180"
                label="操作">
              <el-button type="info" round @click="dialogVisible = true">退票</el-button>
            </el-table-column>

          </el-table>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "Refund",
  data() {
    return {
      form: {
        no: ''
      },
      refundTicketTable: [
        // {
        //   name: '成人票',
        //   date: '2016-05-02',
        //   prices: "35",
        //   pool:'一号泳池',
        //   numbers:1
        // },
      ],
      dialogVisible: false
    }
  }, methods: {
    onSubmit() {
      let obj = {
        name: '成人票',
        date: '2016-05-02',
        prices: "35",
        pool: '一号泳池',
        numbers: 1,
        status: "正常"
      }
      this.refundTicketTable.push(obj)
    },
    reFoundTicket() {
      this.refundTicketTable[0]['status'] = '已退'
      this.dialogVisible = false
    },

  }
}
</script>

<style scoped>

</style>