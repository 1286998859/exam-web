
<template>

    <div class="main">
        <div class="container">
            <div class="position-relative">
                <!-- 筛选条件 -->
                <ul class="nav nav-tabs mb-3">
                    <li class="nav-item">
                        <a class="nav-link active" href="#">最新</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">最热</a>
                    </li>

                    <div style="margin-left:800px">
                        <el-button @click="goPublish" v-if="this.$cookies.get('cname')!=null" type="primary">发布帖子<i class="el-icon-upload el-icon--right"></i></el-button>
                    </div>

                </ul>

            </div>
            <!-- 弹出框 -->
            <div class="modal fade" id="publishModal" tabindex="-1" role="dialog" aria-labelledby="publishModalLabel"
                 aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="publishModalLabel">新帖发布</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">标题：</label>
                                    <input type="text" class="form-control" id="recipient-name">
                                </div>
                                <div class="form-group">
                                    <label for="message-text" class="col-form-label">正文：</label>
                                    <textarea class="form-control" id="message-text" rows="15"></textarea>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-primary" id="publishBtn">发布</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 提示框 -->
            <div class="modal fade" id="hintModal" tabindex="-1" role="dialog" aria-labelledby="hintModalLabel"
                 aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="hintModalLabel">提示</h5>
                        </div>
                        <div class="modal-body" id="hintBody">
                            发布完毕!
                        </div>
                    </div>
                </div>
            </div>

            <!-- 帖子列表 -->
            <ul class="list-unstyled">
                <li class="media pb-3 pt-3 mb-3 border-bottom" v-for="(DiscussPost,index) in DiscussPosts" :key="index">
<!--                    <a href="@{|/user/profile/${map.user.id}|}">-->
                        <img :src="DiscussPost.user.headerUrl" class="mr-4 rounded-circle" alt="用户头像" style="width:50px;height:50px;">
<!--                    </a>-->
                    <div class="media-body">
                        <h6 class="mt-0 mb-3">
                            <router-link class="main-text" :to="'/post/' + DiscussPost.id" v-html="DiscussPost.title"></router-link>
<!--                            <a  >{{DiscussPost.title}}</a>-->
                            <span class="badge badge-secondary bg-primary" v-if="DiscussPost.type==1">置顶</span>
                            <span class="badge badge-secondary bg-danger" v-if="DiscussPost.status==1">精华</span>
                        </h6>
                        <div class="text-muted font-size-12">
                            <u class="mr-3" >{{DiscussPost.user.username}}</u> 发布于
                            <b value-format="yyyy-MM-ddHH:mm:ss" >{{DiscussPost.createTime}}</b>
                            <ul class="d-inline float-right">
<!--                                <li class="d-inline ml-2">赞 <span v-text="${map.likeCount}">11</span></li>-->
                                <li class="d-inline ml-2">|</li>
                                <li class="d-inline ml-2">回帖 <span >{{DiscussPost.commentCount}}</span></li>
                            </ul>
                        </div>
                    </div>
                </li>
            </ul>

            <el-dialog
                    title="发布帖子"
                    :visible.sync="dialogVisible"
                    width="100%"
                    :before-close="handleClose">

                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">

                        <div class="modal-body wid" width="100%" >
                            <form width="100%">
                                <div class="form-group" width="100%">
                                    <label for="recipient-name" class="col-form-label">标题：</label>
                                    <input type="text" class="form-control" >
                                </div>

                                <div class="form-group" width="100%">
                                    <label for="message-text" class="col-form-label">正文：</label>
                                    <mavon-editor  class="editor" />
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">发 布</el-button>
                </span>
            </el-dialog>

            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pagination.current"
                    :page-sizes="[1,5,10,20]"
                    :page-size="pagination.size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pagination.total"
                    class="page">
            </el-pagination>


        </div>
    </div>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.min.css'
    import 'bootstrap/dist/js/bootstrap.min.js'
    export default {
        name: "index",

        data(){
            return{
                dialogVisible: false,
                pagination: {
                    //分页后的考试信息
                    current: 1, //当前页
                    total: null, //记录条数
                    size: 10, //每页条数
                },
                DiscussPosts:[],
                DiscussPost:{
                    id:"",
                    userId:"",
                    title:"",
                    content:"",
                    type:"",
                    status:"",
                    createTime:"",
                    commentCount:"",
                    score:"",
                    User:{
                        id:"",
                        username:"",
                        headerUrl:"",
                    }
                },
                // User:{
                //     id:"",
                //     username:"",
                //     password:"",
                //     salt:"",
                //     email:"",
                //     type:"",
                //     status:"",
                //     activationCode:"",
                //     headerUrl:"",
                //     createTime:"",
                // }

            }

        },
        created() {
            this.getDiscussInfo();
        },
        methods:{
            goPublish(){
                this.$router.push('/community/publish');
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            getDiscussInfo() {
                //分页查询所有帖子
                this.$axios(`/discussPosts/${this.pagination.current}/${this.pagination.size}`).then(res => {
                    this.pagination = res.data.data;
                    this.DiscussPosts = this.pagination.records;
                }).catch(error => {});
            },
            //改变当前记录条数
            handleSizeChange(val) {
                this.pagination.size = val;
                this.getDiscussInfo();
            },
            //改变当前页码，重新发送请求
            handleCurrentChange(val) {
                this.pagination.current = val;
                this.getDiscussInfo();
            },
        }
    }

</script>

<style scoped>

</style>