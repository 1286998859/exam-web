<template>
    <div>
        <div style="margin-left: 900px" >
            <el-input placeholder="请输入帖子标题进行搜索，可以直接回车搜索..." prefix-icon="el-icon-search"
                      clearable
                      @clear="searchByKeyword"
                      style="width: 350px;margin-right: 10px" v-model="keyword"
                      @keydown.enter.native="searchByKeyword" ></el-input>
            <el-button icon="el-icon-search" type="primary" @click="searchByKeyword" >
                搜索
            </el-button>
        </div>

        <el-table :data="pagination.records" border>
            <el-table-column fixed="left" prop="user.username" label="用户名" width="150"></el-table-column>
            <el-table-column prop="title" label="标题" width="200">
                <template slot-scope="scope">
                    <router-link class="main-text" :to="'/post/' + scope.row.id" >{{scope.row.title}}</router-link>
                </template>
            </el-table-column>
            <el-table-column  label="是否置顶" width="130" >
                <template slot-scope="scope">
                    <el-button v-if="scope.row.type == 1" type="success" round>置顶状态</el-button>
                    <el-button v-if="scope.row.type == 0" type="primary" round>正常状态</el-button>
                </template>
            </el-table-column>
            <el-table-column  label="是否加精" width="130" >
                <template slot-scope="scope">
                    <el-button v-if="scope.row.status == 1" type="success" round>精华状态</el-button>
                    <el-button v-if="scope.row.status == 0" type="primary" round>正常状态</el-button>
                    <el-button v-if="scope.row.status == 2" type="primary" round>正常状态</el-button>
                </template>
            </el-table-column>
            <el-table-column  label="是否拉黑" width="130" >
                <template slot-scope="scope">
                    <el-button v-if="scope.row.status == 2" type="danger" round>拉黑状态</el-button>
                    <el-button v-if="scope.row.status == 0" type="primary" round>正常状态</el-button>
                    <el-button v-if="scope.row.status == 1" type="primary" round>正常状态</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="发布时间" width="200"></el-table-column>
            <el-table-column prop="commentCount" label="评论数量" width="80"></el-table-column>
            <el-table-column  label="置顶/加精" width="250">
                <template v-show="scope.row.status != 2" slot-scope="scope">
                    <el-button v-show="scope.row.status != 2" @click="cancelTop(scope.row.id)" v-if="scope.row.type == 1" type="primary" plain>取消置顶</el-button>
                    <el-button v-show="scope.row.status != 2" @click="makeTop(scope.row.id)" v-if="scope.row.type == 0" type="success" plain>设置置顶</el-button>
                    <el-button v-show="scope.row.status != 2" @click="cancelPerfect(scope.row.id)" v-if="scope.row.status == 1" type="primary" plain>取消加精</el-button>
                    <el-button v-show="scope.row.status != 2" @click="makePerfect(scope.row.id)" v-if="scope.row.status == 0" type="success" plain>设置加精</el-button>
                </template>
            </el-table-column>
            <el-table-column  label="操作" width="150">
                <template slot-scope="scope">
                    <el-button @click="cancelBan(scope.row.id)" v-if="scope.row.status == 2" type="success" size="small">取消拉黑</el-button>
                    <el-button @click="makeBan(scope.row.id)" v-if="scope.row.status != 2" type="danger" size="small">拉黑</el-button>
                </template>
            </el-table-column>
        </el-table>
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
</template>

<script>
    export default {
        name: "discussManage",
        data(){
            return{
                pagination: {
                    //分页后的考试信息
                    current: 1, //当前页
                    total: null, //记录条数
                    size: 10, //每页条数
                },
                keyword:"",
            };
        },
        created() {
            this.getDiscussInfo();
        },
        methods:{
            searchByKeyword(){
                this.$axios(`/discussPostsByKeyword/${this.pagination.current}/${this.pagination.size}/${this.keyword}`).then(res => {
                    this.pagination = res.data.data;
                }).catch(error => {});
            },
            makeTop(id){
                this.$axios({
                    url: `/makeTop/${id}`,
                }).then(res => {
                    if(res.data.code ==200) {
                        this.$message({
                            message: res.data.message,
                            type: 'success'
                        })
                    }
                    this.getDiscussInfo();
                })
            },
            cancelTop(id){
                this.$axios({
                    url: `/cancelTop/${id}`,
                }).then(res => {
                    if(res.data.code ==200) {
                        this.$message({
                            message: res.data.message,
                            type: 'success'
                        })
                    }
                    this.getDiscussInfo();
                })
            },
            makePerfect(id){
                this.$axios({
                    url: `/makePerfect/${id}`,
                }).then(res => {
                    if(res.data.code ==200) {
                        this.$message({
                            message: res.data.message,
                            type: 'success'
                        })
                    }
                    this.getDiscussInfo();
                })
            },
            cancelPerfect(id){
                this.$axios({
                    url: `/cancelPerfect/${id}`,
                }).then(res => {
                    if(res.data.code ==200) {
                        this.$message({
                            message: res.data.message,
                            type: 'success'
                        })
                    }
                    this.getDiscussInfo();
                })
            },
            makeBan(id){
                this.$axios({
                    url: `/makeBan/${id}`,
                }).then(res => {
                    if(res.data.code ==200) {
                        this.$message({
                            message: res.data.message,
                            type: 'success'
                        })
                    }
                    this.getDiscussInfo();
                })
            },
            cancelBan(id){
                this.$axios({
                    url: `/cancelBan/${id}`,
                }).then(res => {
                    if(res.data.code ==200) {
                        this.$message({
                            message: res.data.message,
                            type: 'success'
                        })
                    }
                    this.getDiscussInfo();
                })
            },

            getDiscussInfo() {
                //分页查询所有帖子discussPosts
                this.$axios(`/discussPostAll/${this.pagination.current}/${this.pagination.size}`).then(res => {
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
        },
    }
</script>

<style scoped>

</style>