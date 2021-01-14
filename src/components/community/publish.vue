<template>




    <div
         ref="DiscussPost" :model="DiscussPost">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/student/myCommunity' }">社区首页</el-breadcrumb-item>
            <el-breadcrumb-item>发布帖子</el-breadcrumb-item>

        </el-breadcrumb>
        <br>
    <div class="title-box">
        <input  v-model="DiscussPost.title" type="text" class="title"  placeholder="请输入标题..." />
        <el-button type="primary" @click="getConfirm()" >发 布</el-button>
    </div>
    <mavon-editor ref="md" @imgAdd="imgAdd" @imgDel="imgDel" @save="saveArticle" v-model="DiscussPost.content"  class="editor" />
    </div>
</template>

<script>
    import axios from 'axios'
    import qs from 'qs'
    const area_axios = axios.create({
        headers: {'Content-Type': 'application/json;charset=utf-8',},// 设置传输内容的类型和编码
        withCredentials: true,// 指定某个请求应该发送凭据
    })
    const file_axios = axios.create({
        headers: {'Content-Type': 'multipart/form-data',},// 设置传输内容的类型和编码
        withCredentials: true,// 指定某个请求应该发送凭据
    })
    const area_form_axios = axios.create({
        headers: {'Content-Type': 'application/x-www-form-urlencoded',},// 设置传输内容的类型和编码
        withCredentials: true,// 指定某个请求应该发送凭据
    })
    export default {
        name: "publish",
        data(){
            return{
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
                },
                rules: {
                    title: [{required: true, message: '请输入帖子题目', trigger: 'blur'}],
                    content: [{required: true, message: '请输入帖子内容', trigger: 'blur'}],
                },
                img_file: {},// 一次上次多张图片时使用
            }
        },
        created() {
            this.getUser();
        },
        methods:{
            getConfirm(){
                this.$confirm("您确定要发布帖子吗？","Warning",{
                    confirmButtonText: '确定发布',
                    cancelButtonText: '算了,取消发布',
                    type: 'danger'
                }).then(()=> { //确认发布
                    this.publishDiscuss();
                }).catch(() => {
                })
            },
            getUser(){
                this.DiscussPost.userId = this.$cookies.get("cid");
            },
            publishDiscuss(){
                //alert(this.DiscussPost.title)
                    if (null != this.DiscussPost.title && null != this.DiscussPost.content && this.DiscussPost.title.length > 0 && this.DiscussPost.content.length > 0 ) {
                        this.postRequest('/community/addDiscuss',this.DiscussPost).then(res=>{
                            if(res.data.code ==200) {
                                this.$message({
                                    message: '发布成功',
                                    type: 'success'
                                });
                                this.$router.push({path: '/student/myCommunity' });
                            }else if (res.data.code == 400){
                                this.$message({
                                    message: '发布失败',
                                    type: 'error'
                                })
                            }
                        });
                    }else {

                        this.$message.error('请输入帖子标题或内容');
                        return false;
                    }

            },
            // 添加图片
            imgAdd(pos, file){
                console.log("pos:"+pos)
                // 第一步.将图片上传到服务器.
                var formdata = new FormData();
                formdata.append('pic', file);
                file_axios({
                    url: '/img_upload',
                    method: 'post',
                    data: formdata,
                }).then((response) => {
                    // 第二步.将返回的url替换到文本原位置
                    var url = response.data;
                    //通过引入对象获取: import {mavonEditor} from ... 等方式引入后，此时$vm即为mavonEditor
                    //通过$refs获取: html声明ref : <mavon-editor ref=md ></mavon-editor>， 此时$vm为 this.$refs.md`
                    this.$refs.md.$img2Url(pos, url);
                })
            },
            // 删除图片
            imgDel(pos){
                console.log("imgDel pos:"+pos)
            },
            // 多张图片
            mulUploadimg(){
                // 第一步.将图片上传到服务器.
                var formdata = new FormData();
                for(var _img in this.img_file){
                    debugger
                    // 后台需要图片的key一致
                    formdata.append('pics', this.img_file[_img]);
                }
                file_axios({
                    url: '/mul_img_upload',
                    method: 'post',
                    data: formdata,
                }).then((res) => {
                    /**
                     * 例如：返回数据为 res = [[pos, url], [pos, url]...]
                     * pos 为原图片标志（0）
                     * url 为上传后图片的url地址
                     */
                        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
                    var  idx_url = res.data;
                    idx_url.forEach(item => {
                        //通过引入对象获取: import {mavonEditor} from ... 等方式引入后，此时$vm即为mavonEditor
                        //通过$refs获取: html声明ref : <mavon-editor ref=md ></mavon-editor>， 此时$vm为 this.$refs.md`
                        this.$refs.md.$img2Url(item[0], item[1]);
                    });
                })
            },
            // 多张图片
            imgDelMul(pos){
                console.log("imgDel pos:"+pos)
                delete this.img_file[pos];
            },
        }
    }
</script>

<style scoped>
    .title-box {
        display: grid;
        grid-template-columns: 22fr 2fr;
    }
    .title {
        background: none;
        color: #303133;
        text-indent: 0px;
        outline: none;
        font-size: 16px;
        font-weight: bold;
        display: block;

        border: none;
        border-bottom: 1px solid #e0e0e0;
        border-radius: 0;
        line-height: 1;
        overflow: visible;
        margin-bottom: 15px;
        padding: 4px;
    }
    .title:focus {
        border-color: #409eff;
    }
    .editor {
        height: 850px;
    }
</style>