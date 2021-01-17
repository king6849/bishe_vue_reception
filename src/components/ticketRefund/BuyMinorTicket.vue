<template>
  <el-row>
    <el-col :md="24" :span="24">
      <el-table
          class=""
          :data="minorTableData"
          style="width: 100%">
        <el-table-column
            prop="name"
            label="票类型"
            width="180">
        </el-table-column>

        <el-table-column
            label="有效期"
            width="220">
          <template v-slot="scope">
            <el-date-picker
                @blur="updateView(scope)"
                style="width: 200px;"
                v-model="minorTicketObject.date"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </template>
        </el-table-column>

        <el-table-column
            prop="prices"
            width="100"
            label="价格">
        </el-table-column>

        <el-table-column
            label="泳池"
            width="180">
          <template slot-scope="scope">
            <el-select v-model="minorTicketObject.pool" :default-first-option="true" placeholder="请选择"
                       @change="ticketNumbersCheck(scope)">
              <el-option
                  v-for="item in poolInfo"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>

        <el-table-column
            label="票数"
            width="210">
          <template slot-scope="scope">
            <el-input-number v-model="minorTicketObject.numbers"
                             @change="ticketNumbersCheck(scope)"
                             :min="1"
                             :max="90">
            </el-input-number>
          </template>
        </el-table-column>

        <el-table-column
            width="180"
            label="操作">
          <el-button type="danger" round>出票</el-button>
        </el-table-column>

      </el-table>
    </el-col>
  </el-row>
</template>

<script>
import publish_js from "@/js/publish_js";

export default {
  name: "BuyMinorTicket",
  data() {
    return {

      minorTableData: [
        {
          name: '未成人票',
          prices: "15",
        },
      ],

      minorTicketObject: {
        pool: "一号泳池",
        numbers: 1,
        date:''
      },

      poolInfo: [{label: "一号泳池", value: "1"}, {label: "二号泳池", value: "2"}, {label: "三号泳池", value: "3"}],

    }
  }, created() {
    this.init()
  }, methods: {
    ticketNumbersCheck(value) {
      console.log(value);
    }, init() {
      this.initDate()
    },
    initDate() {
      this.minorTicketObject.date = publish_js.methods.getNowFormatDate()
    },
    updateView() {
      this.$forceUpdate()
    }
  }

}
</script>

<style scoped>

</style>