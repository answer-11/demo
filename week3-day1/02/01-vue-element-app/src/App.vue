<template>
  <div id="app">
    <p>学习一下elementUI</p>
    <h3>基础组件</h3>

    <!-- 输入框 -->
    <!-- <el-input v-model="input" placeholder="请输入内容"></el-input> -->
    <!-- 可清空的输入框 -->
    <hr />
    <!-- <el-input placeholder="请输入内容" v-model="input" clearable> </el-input> -->
    <hr />
    <hr>
    <hr>
      <!-- 表单 -->
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <!-- 用户名 -->
      <el-form-item label="用户名" prop="username">
        <!-- prop属性和rulus对应 用于校验当前的input -->
        <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
     <!-- 表单提交 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
  data:function() {
    return {
      input: "default value",
      // 用于收集表单的信息
      ruleForm:{
        username:'',
        password:'',
      },
      rules:{
        username:[
          // required 验证非空 message提示信息
          {required:true,message:'用户名不能为空'},
          {min:6,max:10,message:'用户名长度6-10之间'}
        ],
        password:[
            {required:true,message:'密码不能为空'},
            // {min:6,msg:16:密码}
        ]
      }
    };
  },
  // watch: {
  //   input: function (newValue, oldValue) {
  //     console.log(newValue, oldValue);
  //   },
  // },
  methods:{
    submitForm(param){
      // console.log(param)
         this.$refs[param].validate((valid) => {
           console.log(valid)
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
     resetForm(param){
      console.log(param)
      this.$refs[param].resetFields();
    }
  
  },
  
};

</script>