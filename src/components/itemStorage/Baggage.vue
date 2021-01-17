<template>
  <el-container>
    <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))">
      <el-table-column
          label="序号"
          prop="no">
      </el-table-column>
      <el-table-column
          label="姓名"
          prop="name">
      </el-table-column>
      <el-table-column
          label="电话"
          prop="phone">
      </el-table-column>
      <el-table-column
          label="状态"
          sortable
          prop="status">
      </el-table-column>
      <el-table-column
          label="存入日期"
          prop="date">
      </el-table-column>

      <el-table-column
          align="right">
        <template slot="header" slot-scope="scope">
          <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">开锁
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-container>
</template>

<script>
export default {
  name: "Baggage",
  data() {
    return {
      tableData: [
        {
          no: 1,
          name: 'king',
          phone: '123456789',
          status: '已使用',
          date:'2021-01-16'
        },
        {
          no: 2,
          name: 'king',
          phone: '123456789',
          status: '已使用',
          date:'2021-01-16'
        },
        {
          no: 3,
          name: '',
          phone: '',
          status: '未使用',
          date:''
        },
      ],
      search: ''
    }
  }, methods: {
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
}
</script>

<style scoped>

</style>