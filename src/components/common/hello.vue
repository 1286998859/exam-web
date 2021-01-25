<template>
    <section class="index">
        <div class="hello">
            <span>尊敬的{{user.userName}}您好，欢迎使用黎明社区后台管理系统！</span>
        </div>

    </section>
</template>

<script>
    export default {
        data() {
            return {
                user: { //用户信息
                    userName: null,
                    userId: null
                }
            }
        },
        created() {
            this.getUserInfo()
        },
        methods: {
            getUserInfo() { //获取用户信息
                let userName = this.$cookies.get("cname");
                let userId = this.$cookies.get("cid");
                this.user.userName = userName;
                this.user.userId = userId
            },

        }
    }
</script>


<style lang="scss" scoped>
    .index {
        margin-left: 70px;
        .hello {
            font-size: 20px;
            color: #726f70;
            .icon-xihuan {
                font-size: 30px;
                color: #dd6572;
            }
        }
        .msg {
            .title {
                font-size: 16px;
                color: #000;
                margin-top: 20px;
                margin-left: 10px;
            }
            ul {
                display: flex;
                flex-direction: column;
                width: 200px;
                overflow: hidden;
            }
            li {
                margin-top: 10px;
                font-size: 14px;
                color: lightcoral;
                cursor: pointer;
                display: inline-block;
            }
        }
    }
</style>