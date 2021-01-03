<template>
    <div class="wrapper">
          <!-- model属性是用于和表单的input进行绑定 -->
    <!-- rules是用于和表单提交的时候进行验证操作规则对象 -->
    <!-- 表单用于收集数据 elementui帮我们继承了 -->
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="login-form"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          type="text"
          v-model="ruleForm.username"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
        <!-- <el-form-item label="确认密码" prop="checkout">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button><!--这里的rulefrom和form表单ref的值是一样的 就是为了验证这个表单-->
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    </div>
</template>
<script>
import {Login} from '../../api/back.js'
export default {
     data () {
    return {
      ruleForm:{
        username:'',
        password:''
      },
      rules:{
        username:[
             { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ]
      }
      
    }
  },
  methods:{
    submitForm(params){
     // this.$refs[params] 当前表单的DOM对象 elementui为其扩充一个validate方法 
        this.$refs[params].validate((valid) => {
            // valid 代表用户输入的信息是否合法，否则为非法
            console.log(valid)
            if(!valid){
                this.$message.error('用户名或密码输入错误');
                return;
            }else{
                //前后端进行联调 
                Login(this.ruleForm ).then(response=>{
                   console.log(response)
                  let{data,meta} = response.data

                  // 当状态为200 时为成功
                  if(meta.status == 200){
                    // 1.记录登录成功的token
                    console.log(data.token)
                    localStorage.setItem('html7CmsToken',data.token)
                        // 其他的页面都需要基于token认证
                        // 2.前往后台的首页
                        this.$router.push('/home')
                      this.$message.success(meta.msg);
                         
                  }else{
                       this.$message.error(meta.msg);
                       return
                  }
                 
                 
               
                }).catch(error=>{
                  this.$message.error('登录失败');
                  return
                })
            }
        })
    },
    resetForm(){

    }
  }
};
</script>
<style lang="less" scoped>
    .wrapper{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .login-form{
            border: 1px solid #ccc;
            width: 700px;
            height: 400px;
            // display: flex;
            // align-items: center;
            line-height: 400px;
        }
    }
</style>