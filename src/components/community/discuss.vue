<template>
    <el-row>
        <el-col :span="20" :offset="2">
            <el-card class="markdown-body">
                <h1>{{DiscussPost.title}}</h1>
<!--                <blockquote>{{'用户：' + DiscussPost.user.username + ' | 创建时间：' + DiscussPost.createTime }}</blockquote>-->
                <blockquote>{{'用户：' + User.username + ' | 创建时间：' + DiscussPost.createTime }}</blockquote>

                <VueShowdown
                        :markdown="DiscussPost.content"
                        flavor="vanilla"
                        :options="{ emoji: true, tables: true }"
                        :extensions="extensions"
                />
            </el-card>

            <div class="container mt-3">
                <!-- 回帖数量 -->
                <div class="row">
                    <div class="col-8">
                        <h6><b class="square"></b> <i >30</i>条回帖</h6>
                    </div>
                    <div class="col-4 text-right">
                        <a href="#replyform" class="btn btn-primary btn-sm">&nbsp;&nbsp;回&nbsp;&nbsp;帖&nbsp;&nbsp;</a>
                    </div>
                </div>
                <!-- 回帖列表 -->
                <ul class="list-unstyled mt-4">
                    <li class="media pb-3 pt-3 mb-3 border-bottom" v-for="(list,index) in this.Lists">
                        <a href="profile.html">
                            <img :src="list.user.headerUrl" class="align-self-start mr-4 rounded-circle user-header"
                                 alt="用户头像">
                        </a>
                        <div class="media-body">
                            <div class="mt-0">
                                <span class="font-size-12 text-success" >{{list.user.username}}</span>
                                <span class="badge badge-secondary float-right floor">
                <!-- cvo + Stat 可得遍历次数(thymeleaf 隐含状态对象) -->
                <i >{{index+1}} </i>#
              </span>
                            </div>
                            <div class="mt-2" >
                                {{list.comment.content}}
                            </div>
                            <div class="mt-4 text-muted font-size-12">
              <span>发布于 <b
                      >{{list.comment.createTime}}</b></span>
<!--                                <ul class="d-inline float-right">-->
<!--                                    <li class="d-inline ml-2">-->
<!--                                        <a href="javascript:;" th:onclick="|like(this, 2, ${cvo.comment.id}, ${cvo.comment.userId}, ${post.id});|" class="text-primary">-->
<!--                                            <b th:text="${cvo.likeStatus == 1 ? '已赞' : '赞'}">赞</b> (<i th:text="${cvo.likeCount}">1</i>)-->
<!--                                        </a>-->
<!--                                    </li>-->
<!--                                    <li class="d-inline ml-2">|</li>-->
<!--                                    <li class="d-inline ml-2"><a href="#" class="text-primary">回复(<i th:text="${cvo.replyCount}">2</i>)</a>-->
<!--                                    </li>-->
<!--                                </ul>-->
                            </div>
                            <!-- 回复列表 -->
                            <ul class="list-unstyled mt-4 bg-gray p-3 font-size-12 text-muted">
                                <li class="pb-3 pt-3 mb-3 border-bottom" v-for="(rep,index) in list.replys">
                                    <div>
                  <span  v-if="rep.target==null">
                    <b class="text-info" >{{rep.user.username}}</b>:&nbsp;&nbsp;
                  </span>
                                        <span  v-if="rep.target!=null">
                    <i class="text-info" >{{rep.user.username}}</i> 回复
                    <b class="text-info" >{{rep.target.username}}</b>:&nbsp;&nbsp;
                  </span>
                                        <span >{{rep.reply.content}}</span>
                                    </div>
                                    <div class="mt-3">
                                        <span >{{rep.reply.createTime}}</span>
                                        <ul class="d-inline float-right">
                                            <li class="d-inline ml-2">
<!--                                                <a href="javascript:;" th:onclick="|like(this, 2, ${rvo.reply.id}, ${rvo.reply.userId}, ${post.id});|" class="text-primary">-->
<!--                                                    <b th:text="${rvo.likeStatus == 1 ? '已赞' : '赞'}">赞</b> (<i th:text="${rvo.likeCount}">1</i>)-->
<!--                                                </a>-->
                                            </li>
                                            <li class="d-inline ml-2">|</li>
                                            <li class="d-inline ml-2"><a href="#huifu" data-toggle="collapse"
                                                                         class="text-primary">回复</a></li>
                                        </ul>
                                        <div id="huifu" class="mt-4 collapse">
                                            <form method="post" action="@{|/comment/add/${post.id}|}">
                                                <div>
                                                    <el-input type="text" class="input-size" name="content" :placeholder="'回复：'+rep.user.username"/>
                                                    <input type="hidden" name="entityType" value="2">
                                                    <input type="hidden" name="entityId"   value=rep.comment.id>
                                                    <input type="hidden" name="targetId" value=rep.user.id>
                                                </div>
                                                <div class="text-right mt-2">
                                                    <button type="submit" class="btn btn-primary btn-sm" onclick="">&nbsp;&nbsp;回&nbsp;&nbsp;复&nbsp;&nbsp;</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </li>
<!--                                 回复输入框 -->
                                <li class="pb-3 pt-3">
                                    <form method="post" action="@{|/comment/add/${post.id}|}">
                                        <div>
                                            <input type="text" class="input-size" name="content" placeholder="请输入你的观点"/>
                                            <input type="hidden" name="entityType" value="2">
                                            <input type="hidden" name="entityId" value="list.comment.id" v-model="list.comment.id">
                                        </div>
                                        <div class="text-right mt-2">
                                            <button type="submit" class="btn btn-primary btn-sm" onclick="">&nbsp;&nbsp;回&nbsp;&nbsp;复&nbsp;&nbsp;</button>
                                        </div>
                                    </form>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>

                <!-- 回帖输入 -->
                <div class="container mt-3">
                    <form   action="/comment/add" class="replyform" method="post" >
                        <p class="mt-3">
                            <a name="replyform"></a>
                            <textarea placeholder="在这里畅所欲言你的看法吧!"  name="content"></textarea>
                            <input type="hidden" name="entityType" value="1" >
                            <input type="hidden" name="entityId"  :value=this.DiscussPost.id >
                        </p>
                        <p class="text-right">
                            <button type="submit" @click="submit1()"  class="btn btn-primary btn-sm">回帖</button>
                        </p>
                    </form>
                </div>


            </div>

        </el-col>
        <el-backtop></el-backtop>
    </el-row>
</template>

<script>
    import showdownHighlight from "showdown-highlight/lib";
    import 'bootstrap/dist/css/bootstrap.min.css'
    import 'bootstrap/dist/js/bootstrap.min.js'
    import 'popper.js/dist/popper.min'
    import 'jquery/dist/jquery.min'

    export default {
        name: "discuss",
        data() {
            return {
                Lists:{

                },
                DiscussPost: {
                    id: "",
                    userId: "",
                    title: "",
                    content: "",
                    type: "",
                    status: "",
                    createTime: "",
                    commentCount: "",
                    score: "",

                },
                User: {
                    id: "",
                    username: "",
                    headerUrl: "",
                },
                comments:[],
                list:{
                    comment:"",
                    replys:[]

                },
                comment:{
                    id:"",
                    userId:"",
                    entityType:"",
                    entityId:"",
                    targetId:"",
                    content:"",
                    status:"",
                    createTime:""
                },
                comment1:{
                    id:"",
                    userId:"",
                    entityType:"",
                    entityId:"",
                    targetId:"",
                    content:"",
                    status:"",
                    createTime:""
                },

                extensions: [showdownHighlight]
            }
        },
        created() {
            this.getRequest('/post/'+this.$route.params.id,).then(res=>{
                if(res.data.code==200){
                    this.DiscussPost = res.data.data[0];
                    this.User=res.data.data[1];
                    this.Lists=res.data.data[2];

                    this.comment1.id=1;
                    this.comment1.userId=20171190;
                    this.comment1.entityType=1;
                    this.comment1.entityId=293;
                    this.comment1.targetId=0;
                    this.comment1.content="我";
                    this.comment1.status=0;
                    this.comment1.createTime="2021-01-15 11:23:43";

                    let formData = JSON.stringify(this.comment1);
                    alert(formData);
                    console.log(formData);

                }
            });

        },
        methods:{
            submit1(){
                if(this.Comment.content != null && this.Comment.content.length > 0) {
                    this.postRequest('/comment/add1/', this.comment).then(res => {
                        if (res.data.code == 200) {
                            this.$message({
                                message: '发布成功',
                                type: 'success'
                            });
                            this.$router.push({path: '/student/myCommunity'});
                        } else if (res.data.code == 400) {
                            this.$message({
                                message: '发布失败',
                                type: 'error'
                            })
                        }

                    })
                }
                else {
                    this.$message.error('请输入要回复的内容');
                    return false;
                }

            }
        }
    }
</script>

<style scoped>
    .el-card {
        margin-top: 15px;
        padding: 20px;
    }
    .input-size {
        width: 100%;
        height: 35px;
    }
    .replyform textarea {
        width: 100%;
        height: 200px;
    }
</style>