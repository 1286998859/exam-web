<template>
    <div id="login">
        <div class="bg"></div>
        <el-row class="main-container">
            <el-col :lg="8" :xs="16" :md="10" :span="10">
                <div class="top">
                    <i class="iconfont icon-kaoshi"></i>
                    <span class="title">黎明社区生活互动平台</span>
                </div>
                <div class="bottom">
                    <div class="container">
                        <p class="title">账号登录</p>
                        <el-form
                            :label-position="labelPosition" label-width="80px"
                            :rules="rules"
                            ref="loginForm"
                            :model="loginForm"
                            class="loginContainer">
                            <el-form-item label="用户名" prop="username">
                                <el-input size="normal" type="text" v-model="loginForm.username" auto-complete="off" placeholder="请输入学号或者教师工号"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="password">
                                <el-input size="normal" type="password" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
                            </el-form-item>
                            <el-button size="normal" type="primary" style="width: 100%;" @click="submitLogin">登录</el-button>
                        </el-form>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {postKeyValueRequest} from "../../utils/api";
    //import {postRequest} from "../../utils/api";
    export default {
        name: "login",
        data(){
            return{
                labelPosition: 'left',
                loginForm:{
                    username: '20171190',
                    password: '123456'
                },
                rules: {
                    username: [{required: true, message: '请输入学号或者教师工号', trigger: 'blur'}],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'}],
                }
            }
        },
        methods:{
            submitLogin(){
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        this.postRequest('/login',this.loginForm).then(res=>{
                            let resData = res.data.data;
                            if(resData != null) {
                                if(resData.type == 0){
                                    this.$cookies.set("cname", resData.username);
                                    this.$cookies.set("cid", resData.id);
                                    this.$router.push({path: '/student'});
                                }else {
                                    this.$cookies.set("cname", resData.username);
                                    this.$cookies.set("cid", resData.id);
                                    this.$cookies.set("role", 1);
                                    this.$router.push({path: '/index' }); //跳转到首页
                                }
                                // switch(resData.type) {
                                //     case "0": //学生
                                //         this.$cookies.set("cname", resData.username);
                                //         this.$cookies.set("cid", resData.id);
                                //         this.$router.push({path: '/student'});
                                //         break;
                                //     case "2":  //管理员
                                //         this.$cookies.set("cname", resData.adminName);
                                //         this.$cookies.set("cid", resData.adminId);
                                //         this.$cookies.set("role", 0);
                                //         this.$router.push({path: '/index' }); //跳转到首页
                                //         break;
                                //     case "1": //教师
                                //         this.$cookies.set("cname", resData.teacherName);
                                //         this.$cookies.set("cid", resData.teacherId);
                                //         this.$cookies.set("role", 1);
                                //         this.$router.push({path: '/index' }); //跳转到教师用户
                                //         break;
                                //
                                // }
                            }
                            if(resData == null) { //错误提示
                                this.$message({
                                    showClose: true,
                                    type: 'error',
                                    message: '用户名或者密码错误'
                                })
                            }
                        })

                        //this.$router.push({path: '/student'});
                    } else {
                        this.$message.error('请输入用户名或密码');
                        return false;
                    }
                });

            }

        }
    }
</script>

<style lang="scss" scoped>
    .remind {
        border-radius: 4px;
        padding: 10px 20px;
        display: flex;
        position: fixed;
        right: 20px;
        bottom: 50%;
        flex-direction: column;
        color: #606266;
        background-color: #fff;
        border-left: 4px solid #409eff;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
    }
    .container {
        margin-bottom: 32px;
    }
    .container .el-radio-group {
        margin: 30px 0px;
    }
    a:link {
        color:#ff962a;
        text-decoration:none;
    }
    #login {
        font-size: 14px;
        color: #000;
        background-color: #fff;
    }
    #login .bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        overflow-y: auto;
        height: 100%;
        background: url('../../assets/img/login1.jpg')center top / cover no-repeat;
        background-color: #b6bccdd1 !important;
    }
    #login .main-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #login .main-container .top {
        margin-top: 100px;
        font-size: 30px;
        color: #ff962a;
        display: flex;
        justify-content: center;
    }
    #login .top .icon-kaoshi {
        font-size: 80px;
    }
    #login .top .title {
        margin-top: 160px;
        font-size: 60px;
    }
    #login .bottom {
        display:flex;
        justify-content: center;
        background-color:#fff;
        border-radius: 5px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    #login .bottom .title {
        text-align: center;
        font-size: 30px;
    }
    .bottom .container .title {
        margin: 30px 0px;;
    }
    .bottom .submit .row-login {
        width: 100%;
        background-color: #04468b;
        border-color: #04468b;
        margin: 20px 0px 10px 0px;
        padding: 15px 20px;
    }
    .bottom .submit {
        display: flex;
        justify-content: center;
    }
    .footer {
        margin-top: 50px;
        text-align: center;
    }
    .footer .msg1 {
        font-size: 18px;
        color: #fff;
        margin-bottom: 15px;
    }
    .footer .msg2 {
        font-size: 14px;
        color: #e3e3e3;
        margin-top: 70px;
    }
    .bottom .options {
        margin-bottom: 40px;
        color: #ff962a;
        display: flex;
        justify-content: space-between;
    }
    .bottom .options > a {
        color: #ff962a;
    }
    .bottom .options .register span:nth-child(1) {
        color: #8C8C8C;
    }
</style>