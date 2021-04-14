// 用户管理页面
<template>
    <div class="all">
        <div style="margin-left: 620px" >
            <el-input placeholder="请输入用户名进行搜索，可以直接回车搜索..." prefix-icon="el-icon-search"
                      clearable
                      @clear="searchByKeyword"
                      style="width: 350px;margin-right: 10px" v-model="keyword"
                      @keydown.enter.native="searchByKeyword" ></el-input>
            <el-button icon="el-icon-search" type="primary" @click="searchByKeyword" >
                搜索
            </el-button>
        </div>

        <el-table :data="pagination.records" border>
            <el-table-column fixed="left" prop="username" label="用户名" width="180"></el-table-column>
            <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
            <el-table-column  label="状态" width="200" >
                <template slot-scope="scope">
                    <el-button v-if="scope.row.status == 1" type="success" round>正常状态</el-button>
                    <el-button v-if="scope.row.status == 0" type="danger" round>封禁状态</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="注册时间" width="200"></el-table-column>
            <el-table-column  label="封禁/解封" width="150">
                <template slot-scope="scope">
                    <el-button @click="banById(scope.row.id)" v-if="scope.row.status == 1" type="danger" plain>封禁</el-button>
                    <el-button @click="pickById(scope.row.id)" v-if="scope.row.status == 0" type="success" plain>解封</el-button>
                </template>
            </el-table-column>
            <el-table-column  label="操作" width="150">
                <template slot-scope="scope">
<!--                    <el-button @click="checkGrade(scope.row.studentId)" type="primary" size="small">编辑</el-button>-->

                    <el-button @click="deleteById(scope.row.id)" type="danger" size="small">删除</el-button>
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
        data() {
            return {
                pagination: {
                    //分页后的考试信息
                    current: 1, //当前页
                    total: null, //记录条数
                    size: 10, //每页条数
                },
                keyword:"",
                dialogVisible: false, //对话框
                form: {}, //保存点击以后当前试卷的信息
            };
        },
        created() {
            this.getStudentInfo();
        },
        methods: {
            searchByKeyword(){
                this.$axios(`/usersByKeyword/${this.pagination.current}/${this.pagination.size}/${this.keyword}`).then(res => {
                    this.pagination = res.data.data;
                }).catch(error => {});
            },
            getStudentInfo() {
                //分页查询所有试卷信息
                this.$axios(`/users/${this.pagination.current}/${this.pagination.size}`).then(res => {
                    this.pagination = res.data.data;
                }).catch(error => {});
            },
            //改变当前记录条数
            handleSizeChange(val) {
                this.pagination.size = val;
                this.getStudentInfo();
            },
            //改变当前页码，重新发送请求
            handleCurrentChange(val) {
                this.pagination.current = val;
                this.getStudentInfo();
            },
            checkGrade(studentId) { //修改学生信息
                this.dialogVisible = true;
                this.$axios(`/student/${studentId}`).then(res => {
                    this.form = res.data.data;
                });
                //this.form=student;
            },
            banById(id){
                this.$axios({
                    url: `/banUser/${id}`,
                }).then(res => {
                    if(res.data.code ==200) {
                        this.$message({
                            message: res.data.message,
                            type: 'success'
                        })
                    }
                    this.getStudentInfo();
                })
            },
            pickById(id){
                this.$axios({
                    url: `/pickUser/${id}`,
                }).then(res => {
                    if(res.data.code ==200) {
                        this.$message({
                            message: res.data.message,
                            type: 'success'
                        })
                    }
                    this.getStudentInfo();
                })
            },
            deleteById(id) { //删除当前学生
                this.$confirm("确定删除当前用户吗？删除后无法恢复","Warning",{
                    confirmButtonText: '确定删除',
                    cancelButtonText: '算了,留着吧',
                    type: 'danger'
                }).then(()=> { //确认删除
                    this.$axios({
                        url: `/deleteUser/${id}`,
                        method: 'delete',
                    }).then(res => {
                        if(res.data.code ==200) {
                            this.$message({
                                message: res.data.message,
                                type: 'success'
                            })
                        }
                        this.getStudentInfo();
                    })
                }).catch(() => {
                })
            },
            submit() { //提交更改
                this.dialogVisible = false;
                this.$axios({
                    url: '/student',
                    method: 'put',
                    data: {
                        ...this.form
                    }
                }).then(res => {
                    console.log(res)
                    if(res.data.code ==200) {
                        this.$message({
                            message: '更新成功',
                            type: 'success'
                        })
                    }
                    this.getStudentInfo();
                })
            },
            handleClose(done) { //关闭提醒
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    }).catch(_ => {});
            },
        }
    };
</script>
<style lang="scss" scoped>
    .all {
        padding: 0px 40px;
        .page {
            margin-top: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .edit {
            margin-left: 20px;
        }
        .el-table tr {
            background-color: #dd5862 !important;
        }
    }
    .el-table .warning-row {
        background: #000 !important;
    }
    .el-table .success-row {
        background: #dd5862;
    }
</style>