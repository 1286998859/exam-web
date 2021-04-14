<template>
    <div class="all">
        <el-table :data="pagination.records" border>
            <el-table-column fixed="left" prop="username" label="用户名" width="180"></el-table-column>
            <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
            <el-table-column prop="createTime" label="注册时间" width="200"></el-table-column>
            <el-table-column  label="查看成绩" width="150">
                <template slot-scope="scope">
                    <el-button @click="checkGrade(scope.row.id)" type="primary" size="small">查看成绩</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pagination.current"
                :page-sizes="[5, 10]"
                :page-size="pagination.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pagination.total"
                class="page"
        ></el-pagination>
    </div>
</template>

<script>
    export default {
        name: "allUsersGrade",

        data() {
            return {
                pagination: {
                    //分页后的考试信息
                    current: 1, //当前页
                    total: null, //记录条数
                    size: 10 //每页条数
                }
            };
        },
        created() {
            this.getAnswerInfo();
        },
        methods: {
            getAnswerInfo() {
                //分页查询所有试卷信息
                this.$axios(`/users/${this.pagination.current}/${this.pagination.size}`).then(res => {
                    this.pagination = res.data.data;
                }).catch(error => {});
            },
            //改变当前记录条数
            handleSizeChange(val) {
                this.pagination.size = val;
                this.getAnswerInfo();
            },
            //改变当前页码，重新发送请求
            handleCurrentChange(val) {
                this.pagination.current = val;
                this.getAnswerInfo();
            },
            checkGrade(studentId) {
                this.$router.push({ path: "/grade", query: { studentId: studentId } });
            }
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