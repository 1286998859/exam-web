import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/common/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },{
    path: '/student',
    component: () => import('../components/student/index'),
    children:[
        {path: '/student/myExam', component: () => import('../components/student/myExam')},
        {path: '/student/myPratice', component: () => import('../components/student/myPratice')},
        {path: '/student/myScore', component: () => import('../components/student/myScore')},
        {path: '/student/mySetting', component: () => import('../components/student/mySetting')},
        {path: '/student/myCommunity', component: () => import('../components/community/index')},
        {path: '/community/publish', component: () => import('../components/community/publish')},
        {
            path: "/post/:id",
            name: "discuss",
            component: () => import("../components/community/discuss"),
            meta: {
                title: "帖子详情",
            },
        },
    ]
  },
    {
        path: '/index', //教师主页
        component: () => import('../components/admin/index'),
        children: [
            {
                path: '/', //首页默认路由
                component: () => import('../components/common/hello')
            },/*
            {
                path:'/grade', //学生成绩
                component: () => import('../components/charts/grade')
            },
            {
                path: '/selectExamToPart', //学生分数段
                component: () => import('../components/teacher/selectExamToPart')
            },
            {
                path: '/scorePart',
                component: () => import('../components/charts/scorePart')
            },
            {
                path: '/allStudentsGrade', //所有学生成绩统计
                component: () => import('../components/teacher/allStudentsGrade')
            },
            {
                path: '/examDescription', //考试管理功能描述
                component: () => import('../components/teacher/examDescription')
            },
            {
                path: '/selectExam', //查询所有考试
                component: () => import('../components/teacher/selectExam')
            },
            {
                path: '/addExam', //添加考试
                component: () => import('../components/teacher/addExam')
            },
            {
                path: '/answerDescription', //题库管理功能介绍
                component: ()=> import('../components/teacher/answerDescription')
            },
            {
                path: '/selectAnswer', //查询所有题库
                component: () => import('../components/teacher/selectAnswer')
            },
            {
                path: '/addAnswer', //增加题库主界面
                component: () => import('../components/teacher/addAnswer')
            },
            {
                path: '/addAnswerChildren', //点击试卷跳转到添加题库页面
                component: () => import('../components/teacher/addAnswerChildren')
            },*/
            {
                path: '/studentManage', //学生管理界面
                component: () => import('../components/teacher/studentManage')
            },/*
            {
                path: '/addStudent', //添加学生
                component: () => import('../components/teacher/addStudent')
            },
            {
                path: '/teacherManage',
                component: () => import('../components/admin/tacherManage')
            },
            {
                path: '/addTeacher',
                component: () => import ('../components/admin/addTeacher')
            }*/
        ]
    },

]

const router = new VueRouter({
  routes
})

export default router
