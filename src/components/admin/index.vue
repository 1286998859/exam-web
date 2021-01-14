// 展示组件页面
<template>
    <div id="index">
        <header1 class="topbar"></header1>
        <section class="container">
            <div class="left_side">
                <mainLeft></mainLeft>
            </div>
            <div class="main_wrapper">
                <navigator class="nav"></navigator>
                <router-view></router-view>
            </div>
        </section>
    </div>
</template>

<script>
    import header from '../common/header'
    import mainLeft from '../common/mainLeft'
    import navigator from '../common/navigator'
    export default {
        components:{
            header1: header,
            mainLeft: mainLeft,
            navigator:navigator
        },
        data() {
            return {
                username: '许如梦'
            }
        },
        methods: {
            destroyBus(){
                this.bus.$off('sendIndex1');
                this.bus.$off('sendIndex2');
            }
        },
        created() {
            this.destroyBus();
        }
    }
</script>

<style lang="scss" scoped>
    #index .nav {
        box-shadow: 1px 0 5px rgba(0, 0, 0, 0.1);
        margin-bottom: 30px;
    }
    .container {
        display: flex;
        background-color: #fff;
    }
    .main_wrapper {
        overflow: hidden;
        flex: 1;
        background-color: #fff;
    }
</style>