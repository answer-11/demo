<template>
    <div>
        <!-- <h1>用户列表页面</h1> -->
         <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
       <el-table-column
        label="操作">
        <!-- slot-scope 插槽 vue2.6.0起被废弃 -->
        <template slot-scope="scope">
            <el-button type="primary" @click="updateHandel(scope)">编辑</el-button>
            <el-button type="danger" @click="deleteHandel(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
    </div>
</template>
<script>
      import axios from 'axios'
    export default {
        created(){
            // 调取接口获取数据
            // this.tableData = response.data
            let url = 'http://localhost:8888/api/private/v1/users'
        axios({
          url,
          method:'get',
          headers:{
            Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE2MDgwMTgwMjksImV4cCI6MTYwODEwNDQyOX0.48Q6T0kPr9Uo1LvEOu_hr-OSTc2CypNmHhNIf3s0exg'
          },
          params: {
            pagesize:2,
            pagenum:1
          },
        }).then(response=>{
          console.log(response)
        })
        },
        data() {
        return {
          tableData: [{
            id:1,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            id:2,
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            id:3,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            id:4,
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        }
      },
      methods: {
        // 定义好和分页相关的回调函数\
        // 处理用户改变每页显示的数量
        handleSizeChange(){
          
        },
        updateHandel(scope){
            console.log("修改了",scope)
        },
        deleteHandel(scope){
            // 调用后台的接口完成信息的删除
            console.log("删除了",scope)
            console.log(scope.row)
        }
      }
    }
</script>
<style lang="less" scoped>

</style>