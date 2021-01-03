<template>
    <div>
        <!-- <h1>用户列表页面</h1> -->
        <el-input v-model="kw" placeholder="请输入你需要查询的关键字"></el-input>
        <el-button type="primary" @click="searchHandler">点击查询  </el-button>
         <el-button type="success" @click="addHandler">新增</el-button>
         <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="序号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label=邮箱>
      </el-table-column>
      <el-table-column
        prop="role_name"
        label=用户角色>
      </el-table-column>
       <el-table-column
        prop="mobile"
        label=手机>
      </el-table-column>
       <el-table-column
        label="操作">
        <!-- slot-scope 插槽 vue2.6.0起被废弃 -->
        <template slot-scope="scope">
            <el-button type="primary" @click="updateHandel(scope)">修改</el-button>
            <el-button type="danger" @click="deleteHandel(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="pageSizes"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- 模态框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
        <el-form :model="form" >
          <el-form-item label="用户名" label-width='100'>
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" label-width="100">
            <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" label-width="100">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号" label-width="100">
            <el-input v-model="form.mobile" autocomplete="off"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="storeUser">确 定</el-button>
        </div>
    </el-dialog>
    </div>
</template>
<script>
    import { userList,userAdd,userDel} from "../../api/users";
    export default {
        data() {
        return {
          page:1,//默认显示的页码，默认显示第一页
          size:2,//每页显示的数量
          pageSizes:[2,5,10,20],//定义每页显示的条数的select框
          total:10,//默认 实际要通过接口从后台数据的总数
          kw:'',
          tableData: [],
          // 添加用户信息收集
          form:{
            username:"",
            password:"",
            email:"",
            mobile:""
          },
          dialogFormVisible:false//控制模态框的展示与否
        }
      },
      created(){
        this.getUserList()
      },
      methods: {
        getUserList(page=1,size=2,kw=''){
            userList(page,size,kw).then(response=>{
              // 网络请求畅通
            console.log(response)
            let {meta,data} = response.data
            if(meta.status == 200){
              this.total = data.total
              this.tableData = data.users
              this.$message.success('获取用户信息成功')
            }else{
              this.$message.error('获取用户信息失败')
            }
            
          }).catch(error=>{
            console.log(error)
            this.$message.error('获取用户信息失败')
          })
        },
    //  点击查询
          searchHandler(){
            console.log("查询了")
            if(!this.kw){
              this.$message.error("请输入你要查询的关键字")
              return
            }else{
              //调用查询接口查询用户信息 有可能用户是在其他页面下点击的查询 所以页码要重置
              // 例如：用户点在第10页 但数据总共就5页
              this.getUserList(1,this.size,this.kw)
              console.log(this)
              // 有时候 后台做查询的时候 一般都是组合查询
              // 1.商品名称是模糊查询（查询信息只要包含该关键字，都要匹配出来，这种方式叫模糊查询）
              // 还有一种叫精准查询 例如输入什么 就匹配出什么 一模一样
              // 2.价格范围
              // 3.价格降序 从高到低
            }
          },
          //点击新增 弹出一个模态框 
          addHandler(){
            // 控制展示
            this.dialogFormVisible = true;
               console.log(this.form) 
          },
          storeUser(){
            // 收集信息 校验用户信息 rules
            console.log(this.form)
            // 调用接口
            userAdd(this.form).then(response=>{
              console.log(response.data)
              let {meta,data} = response.data
              console.log(meta.status)
              if(meta.status == 201){
                this.$message.success("添加成功")
                // 1.关闭模态框
                // 2.展示最新的用户列表的信息
                this.dialogFormVisible = false;
                this.getUserList()//这里一般都是调用按照id倒序获取数据的接口
                // 从大到小 因为主键id一般业务都是递增的 那么新用户主键的id是当前的最大值
                this.form={
                    username:"",
                    password:"",
                    email:"",
                    mobile:""
                }
              } else{
                this.$message.error('添加失败' + '00')
                return
              }             
              
            }).catch(error=>{
              this.$message.error('添加失败')
              return
            })
          },
         // 定义好和分页相关的回调函数
        // 用户点击页码的时候触发
          handleCurrentChange(page){
            this.page = page
            console.log(page)
            this.getUserList(page)
        },
        // 处理用户改变每页显示的数量
        handleSizeChange(size){
          this.size = size
          // 一般用户点击 每页显示数量后 页码一般重置为1
          console.log(this.size)
        },
        updateHandel(scope){
            console.log("修改了",scope)
        },
        deleteHandel(scope){
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 用户确认之后才进行删除操作
           let id = scope.row.id
            userDel(id).then(response=>{
              console.log(response)
             let {meta,data} = response.data
             if(meta.status == 200){
              //  一般在后台业务的时候 数据是无价的 在处理数据时会进行伪操作
              // 防止用户时误操作
              //  scope.row += delete(id)
               this.$message.success("删除成功")
               this.getUserList(1,this.size)
               return
             }else{
               this.$message.error("删除失败")
               return
             }
            }).catch(error=>{
              this.$message.error("删除失败")
              return
            })
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
            // // 调用后台的接口完成信息的删除
            // console.log("删除了",scope)
            // console.log(scope.row)
           
        }
      }
    }
</script>
<style lang="less" scoped>

</style>