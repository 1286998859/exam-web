<template>
    <el-row>
        <el-col :span="20" :offset="2">
            <el-card class="markdown-body">
                <h1>{{DiscussPost.title}}</h1>
                <blockquote>{{'用户：' + DiscussPost.user.username + ' | 创建时间：' + DiscussPost.createTime }}</blockquote>

                <VueShowdown
                        :markdown="DiscussPost.content"
                        flavor="vanilla"
                        :options="{ emoji: true, tables: true }"
                        :extensions="extensions"
                />
            </el-card>
        </el-col>
        <el-backtop></el-backtop>
    </el-row>
</template>

<script>
    import showdownHighlight from "showdown-highlight/lib";

    export default {
        name: "discuss",
        data() {
            return {
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
                    User: {
                        id: "",
                        username: "",
                        headerUrl: "",
                    }
                },
                extensions: [showdownHighlight]
            }
        },
        created() {
            this.getRequest('/post/'+this.$route.params.id,).then(res=>{
                if(res.data.code==200){
                    this.DiscussPost = res.data.data;
                }
            });

        }
    }
</script>

<style scoped>
    .el-card {
        margin-top: 15px;
        padding: 20px;
    }
</style>