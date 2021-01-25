<template>
    <div>
        <el-container>
            <el-header class="homeHeader">
                <div class="title">黎明社区生活互动平台</div>
                <div>

                    <el-dropdown class="userInfo" @command="commandHandler">
                        <span class="el-dropdown-link">{{user.userName}}<i><img src="../../assets/img/touxiang1.jpg" alt=""></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="mySetting">个人中心</el-dropdown-item>
                            <el-dropdown-item command="logout" @click="exit()" divided>注销登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu router :default-active="activeIndex" class="el-menu-demo" mode="vertical" @select="handleSelect">
                        <el-menu-item index="/student/myCommunity"><i class="el-icon-s-home"></i>我的社区</el-menu-item>
                        <el-menu-item  index="/student/myExam" @click="myExam()"><i class="el-icon-document"></i>我的试卷</el-menu-item>
                        <el-menu-item index="/student/myPratice"><i class="el-icon-edit"></i>我的练习</el-menu-item>
                        <el-menu-item index="/student/myScore"><i class="el-icon-data-analysis"></i>我的分数</el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view class="homeRouterView"/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                user:{},

            }
        },
        created() {
            this.userInfo()
        },

        methods:{
            commandHandler(cmd) {
                if (cmd == 'logout') {
                    this.$confirm('此操作将注销登录, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$router.push({path:"/"}); //跳转到登录页面
                        this.$cookies.remove("cname"); //清除cookie
                        this.$cookies.remove("cid");
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消操作'
                        });
                    });
                }else if (cmd == 'mySetting') {
                    this.$router.push('/student/mySetting');
                }

            },
            userInfo() {
                let studentName = this.$cookies.get("cname");
                let studentId = this.$cookies.get("cid");
                console.log(`studentId${studentId}`);
                console.log(`studentName ${studentName}`);
                this.user.userName = studentName;
                this.user.studentId = studentId;
            },

        }
    }
</script>

<style>
    .homeRouterView {
        margin-top: 10px;
    }

    .homeWelcome {
        text-align: center;
        font-size: 30px;
        font-family: 华文行楷;
        color: #409eff;
        padding-top: 50px;
    }

    .homeHeader {
        background-color: #409eff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 15px;
        box-sizing: border-box;
    }

    .homeHeader .title {
        font-size: 30px;
        font-family: 华文行楷;
        color: #ffffff
    }

    .homeHeader .userInfo {
        cursor: pointer;
    }

    .el-dropdown-link img {
        width: 48px;
        height: 48px;
        border-radius: 24px;
        margin-left: 8px;
    }

    .el-dropdown-link {
        display: flex;
        align-items: center;
    }
</style>