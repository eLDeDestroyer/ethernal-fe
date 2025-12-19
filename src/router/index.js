import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import('../views/DashboardView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import('../views/ProfileView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/topic/:uuid',
            name: 'topic',
            component: () => import('../views/TopicView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/question/:topic_id/:question_id',
            name: 'question',
            component: () => import('../views/QuestionView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/answer/:query_result_id',
            name: 'answer',
            component: () => import('../views/AnswerView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/history/:uuid',
            name: 'history',
            component: () => import('../views/HistoryByTopic.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/game',
            name: 'game',
            component: () => import('../views/GameView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/history/question/:topic_id',
            name: 'history-question',
            component: () => import('../views/HistoryByQuest.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue'),
            meta: { guestOnly: true }
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/RegisterView.vue'),
            meta: { guestOnly: true }
        },
    ]
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('access_token');

    if (to.meta.requiresAuth && !token) {
        next('/login');
    } else if (to.meta.guestOnly && token) {
        next('/dashboard');
    } else {
        next();
    }
});

export default router
