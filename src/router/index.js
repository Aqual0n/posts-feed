import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "../views/Index.vue";

const Login = () => import('../views/Login.vue')
const Edit = () => import('../views/Edit.vue')
const NotFound = () => import('../views/NotFound.vue')

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Index',
        component: Index
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/edit/:id',
        name: 'Edit',
        component: Edit
    },
    {
        path: '*',
        name: 'NotFound',
        component: NotFound
    }
]

const router = new VueRouter({
    routes
})

export default router
