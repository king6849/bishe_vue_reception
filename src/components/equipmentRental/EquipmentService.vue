<template>
  <el-row>
    <el-col :md="14" :span="14">
      <h1>泳具列表</h1>
      <el-table
          :data="tableData">
        <el-table-column
            prop="name"
            label="器材名称">
        </el-table-column>
        <el-table-column
            prop="reserve"
            label="库存">
        </el-table-column>
        <el-table-column
            prop="numbers"
            label="租赁数量">
          <template slot-scope="scope">
            <el-input-number
                v-model="scope.row.num"
                @change="(value)=>numberOfLeases(scope.$index,value)"
                :min="0"
                :max="90">
            </el-input-number>
          </template>
        </el-table-column>
        <el-table-column
            prop="price"
            label="价格">
        </el-table-column>

      </el-table>
    </el-col>
    <el-col :md="8" :span="8" style="margin-left: 3%;">
      <h1>清单列表</h1>
      <el-table
          :data="shoppingCartList">
        <el-table-column
            label="泳具"
            prop="name"
        >
        </el-table-column>

        <el-table-column
            label="数量"
            prop="numbers"
        >
        </el-table-column>
        <el-table-column
            label="价格"
            prop="price"
        >
        </el-table-column>
      </el-table>
      <b>总消费￥{{ totalPrice }}</b>
      <el-button type="danger" style="float: right;" round>支付</el-button>
    </el-col>
  </el-row>
</template>

<script>
import publish_js from "@/js/publish_js";

export default {
  name: "equipmentService",
  data() {
    return {
      tableData: [
        {name: "泳镜", reserve: 100, numbers: 1, price: 20.0},
        {
          name: "泳衣",
          reserve: 100,
          numbers: 1,
          price: 20.0
        }],
      shoppingCart: {},
      shoppingCartList: [
        // {name: '泳镜', numbers: 1, price: 20.0},
        // {name: '泳衣', numbers: 1, price: 20.0}
      ],
      totalPrice: 0
    }
  }, methods: {
    numberOfLeases(index, value) {
      let tool = this.tableData[index]
      let toolName = tool['name']
      let cardObj = this.shoppingCart[toolName]
      //添加进购物车
      if (publish_js.methods.isNullObj(cardObj)) {
        if (value === 0) return
        let data = {name: toolName, numbers: value, price: tool["price"]}
        this.$set(this.shoppingCart, toolName, data)
        this.shoppingCartList.push(data)
      } else {
        //更新购物车
        this.$set(this.shoppingCart[toolName], 'numbers', value)
        for (let i = 0; i < this.shoppingCartList.length; i++) {
          let item = this.shoppingCartList[i]
          //更新购物车列表商品的数量
          if (item['name'] === toolName) {
            if (value === 0) {
              this.weedOut(toolName, i)
              continue
            }
            item["numbers"] = value
            this.$set(this.shoppingCartList, i, item)
          }
        }
      }
      //计算总消费
      this.totalPrice = 0
      for (let item in this.shoppingCart) {
        this.totalPrice += this.shoppingCart[item]['price'] * this.shoppingCart[item]['numbers']
      }
    },
    //删除数量为0的商品
    weedOut(name, index) {
      this.$delete(this.shoppingCart, name)
      this.shoppingCartList.splice(index, 1)
    }
  }
}
</script>

<style scoped>

</style>