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
                        <h6><b class="square"></b> <i >{{this.DiscussPost.commentCount}}</i>条回帖</h6>
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
                                <li class="pb-3 pt-3 mb-3 border-bottom" v-for="(rep,index1) in list.replys">
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
<!--                                            <li class="d-inline ml-2">|</li>-->
                                            <li class="d-inline ml-2"><a :href="'#huifu'+index1+index" data-toggle="collapse"
                                                                         class="text-primary">回复</a></li>
                                        </ul>
                                        <div :id="'huifu'+index1+index" class="mt-4 collapse">
                                            <el-form >
                                                <div>
                                                    <input  :id="index+'x'+index1" type="text" class="input-size" name="content2" :placeholder="'回复：'+rep.user.username"/>
                                                </div>
                                                <div class="text-right mt-2">
                                                    <el-button type="primary" class="btn btn-primary btn-sm" @click="submit3(index,index1,list.comment.id,rep.user.id)">&nbsp;&nbsp;回&nbsp;&nbsp;复&nbsp;&nbsp;</el-button>
                                                </div>
                                            </el-form>
                                        </div>
                                    </div>
                                </li>
<!--                                 回复输入框 -->
                                <li class="pb-3 pt-3">
                                    <el-form  >
                                        <div>
                                            <el-form-item>
                                                <input :id="index" ref="helo"  type="text" class="input-size" name="content1"  placeholder="请输入你的观点"/>
                                            </el-form-item>
                                            <el-form-item>
                                                <el-input type="hidden" name="entityType" value="2"/>
                                            </el-form-item>
                                            <el-form-item>
                                                <el-input type="hidden" name="entityId" value="list.comment.id" v-model="list.comment.id"/>
                                            </el-form-item>
                                        </div>
                                        <div class="text-right mt-2">
                                            <el-button type="primary" @click="submit2(index,list.comment.id)" class="btn btn-primary btn-sm" >&nbsp;&nbsp;回&nbsp;&nbsp;复&nbsp;&nbsp;</el-button>
                                        </div>
                                    </el-form>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>

                <!-- 回帖输入 -->
                <div class="container mt-3">
                    <el-form id="discuss"    class="replyform"  >
                        <p class="mt-3">
                            <a name="replyform"></a>
                            <el-form-item>
                                <el-input v-model="hh"  type="textarea" placeholder="在这里畅所欲言你的看法吧!"   >
                                </el-input>
                            </el-form-item>
                            <el-form-item>
                                <input type="hidden" v-model="this.comment1.entityType" >
                            </el-form-item>
                            <el-form-item>
                                <input type="hidden" v-model="this.comment1.entityId"  >
                            </el-form-item>
                        </p>
                        <p class="text-right">
                            <el-button type="primary" @click="submit1()"  class="btn btn-primary btn-sm">回帖</el-button>
                        </p>
                    </el-form>
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
                hh:"",
                hcontent:"",
                h2:[],

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
                    this.comment1.userId=this.$cookies.get('cid');
                    this.comment1.entityType=1;
                    this.comment1.entityId=293;
                    this.comment1.targetId=0;
                    this.comment1.status=0;
                    this.comment1.createTime="2021-01-15 11:23:43";
                    //alert(formData);
                }
            });

        },
        methods:{
            submit1(){
                this.comment1.content=this.hh;
                this.comment1.entityId=this.DiscussPost.id;
                //alert(this.comment1.content);
                if(this.comment1.content != null && this.comment1.content.length > 0) {
                    let formdata = JSON.stringify(this.comment1);
                    this.postRequest('/comment/add1',this.comment1 ).then(res => {
                        if (res.data.code == 200) {
                            this.$message({
                                message: '发布成功',
                                type: 'success'
                            });
                            //this.$router.push({path: '/student/myCommunity'});
                            location.reload();
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

            },
            submit2(x,y){

                //alert(document.getElementById('0').value);
                //alert(x);
                this.comment1.content=document.getElementById(x).value;
                this.comment1.entityId=y;
                this.comment1.entityType=2;
                //alert(this.comment1.content);
                if(this.comment1.content != null && this.comment1.content.length > 0) {
                    let formdata = JSON.stringify(this.comment1);
                    this.postRequest('/comment/add1',this.comment1 ).then(res => {
                        if (res.data.code == 200) {
                            this.$message({
                                message: '发布成功',
                                type: 'success'
                            });
                            //this.$router.push({path: '/student/myCommunity'});
                            location.reload();
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

            },
            submit3(a,x,y,z){
                //alert(document.getElementById(x+'x').value);
                //alert(x);
                this.comment1.content=document.getElementById(a+'x'+x).value;
                this.comment1.entityId=y;
                this.comment1.entityType=2;
                this.comment1.targetId=z;
                //alert(this.comment1.content);
                if(this.comment1.content != null && this.comment1.content.length > 0) {
                    let formdata = JSON.stringify(this.comment1);
                    this.postRequest('/comment/add1',this.comment1 ).then(res => {
                        if (res.data.code == 200) {
                            this.$message({
                                message: '发布成功',
                                type: 'success'
                            });
                            //this.$router.push({path: '/student/myCommunity'});
                            location.reload();
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

            },


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