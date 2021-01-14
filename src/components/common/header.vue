<template>
    <header id="topbar" class="homeHeader">
        <div class="title">艾学习考试系统教师管理端</div>
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
    </header>
</template>

<script>
    import store from '../../vuex/store'
    import {mapState,mapMutations} from 'vuex'
    export default {
        data() {
            return {
                login_flag: false,
                user: { //用户信息
                    userName: null,
                    userId: null
                }
            }
        },
        created() {
            this.getUserInfo()
        },
        computed: mapState(["flag","menu"]),
        methods: {
            //显示、隐藏退出按钮
            showSetting() {
                this.login_flag = !this.login_flag
            },
            //左侧栏放大缩小
            ...mapMutations(["toggle"]),
            getUserInfo() { //获取用户信息
                let userName = this.$cookies.get("cname")
                let userId = this.$cookies.get("cid")
                this.user.userName = userName
                this.user.userId = userId
            },
            index() {
                this.$router.push({path: '/index'})
            },
            exit() {
                let role = this.$cookies.get("role")
                this.$router.push({path:"/"}) //跳转到登录页面
                this.$cookies.remove("cname") //清除cookie
                this.$cookies.remove("cid")
                this.$cookies.remove("role")
                if(role == 0) {
                    this.menu.pop()
                }
            },
            commandHandler(cmd) {
                if (cmd == 'logout') {
                    this.$confirm('此操作将注销登录, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let role = this.$cookies.get("role");
                        this.$router.push({path:"/"}); //跳转到登录页面
                        this.$cookies.remove("cname"); //清除cookie
                        this.$cookies.remove("cid");
                        this.$cookies.remove("role");
                        if(role == 0) {
                            this.menu.pop();
                        }
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消操作'
                        });
                    });
                }else if (cmd == 'mySetting') {
                    this.$router.push('/student/mySetting');
                }

            }
        },
        store
    }
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
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