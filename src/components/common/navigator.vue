<template>
    <div id="nav">
        <el-breadcrumb separator-class="el-icon-arrow-right"   >
            <el-breadcrumb-item @click="destroyBus1()" :to="{ path: '/index' }"><a href="javascript:;" @click="destroyBus1()">首页</a></el-breadcrumb-item>
            <el-breadcrumb-item    class="title">{{this.index1}}</el-breadcrumb-item>
            <el-breadcrumb-item   >{{this.index2}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
    import store from '../../vuex/store'
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                active: [],
                index1: null,
                index2: null,
            }
        },
        computed: mapState(["menu"]),
        methods: {
            getIndex() {
                this.bus.$on('sendIndex2',(data)=>{
                    //alert("2");
                    this.index2 = data;
                    //this.active = this.menu[data-1];
                    // console.log(JSON.stringify(this.active)+'----')
                });
                this.bus.$on('sendIndex1',(data)=>{
                    //alert("1");
                    //this.index1 = data;
                    this.active = this.menu[data-1];
                    this.index1 = this.active.title;
                    // console.log(JSON.stringify(this.active)+'----')
                });
                //location.reload();

            },
            destroyBus1(){
                //alert("1");
                //this.bus.$off('sendIndex1');
                this.index1=null;


                //this.bus.$off('sendIndex2');
                this.index2=null;
                //location.reload();
            }
        },
        created() {
            this.getIndex();

        },
        beforeDestroy() {
            //this.bus.$off('sendIndex1'); //销毁
            //this.bus.$off('sendIndex2');
        },
        store
    }
</script>

<style scoped>
    #nav .el-breadcrumb {
        height: 60px;
        line-height: 60px;
        padding-left: 20px;
    }
    #nav .el-breadcrumb .title{
        font-weight: bold;
    }
</style>