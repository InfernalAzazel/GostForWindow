import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        meta:{hidden: true},
        component: () => import('./layout/base.vue'),
        redirect: '/proxy',
        children:[
            {
                path: '/proxy',
                component: () => import( "./views/proxy.vue"),
                meta: { title: '代理' },
              },
              {
                path: '/log',
                component: () => import( "./views/log.vue"),
                meta: { title: '日志' },
              },
        ]
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes, 
})

export default router
