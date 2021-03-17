import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * vue 实现动态路由 https://www.cnblogs.com/jj123/p/12784100.html
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

// routerData().then(res => {
//   console.log('routerData-res: ', res)
// })

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/userMana',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/userMana/index'),
        name: 'UserMana',
        meta: { title: '用户管理', icon: 'user', affix: true }
      }
    ]
  }
  // {
  //   path: '/guide',
  //   component: Layout,
  //   redirect: '/guide/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/guide/index'),
  //       name: 'Guide',
  //       meta: { title: 'Guide', icon: 'guide', noCache: true }
  //     }
  //   ]
  // },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/messageManage',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/messageManage'),
        name: 'MessageManage',
        meta: {
          title: '消息管理',
          icon: 'information',
          roles: ['admin', 'editor']
        }
      }
    ]
  },
  {
    path: '/partnerManage',
    component: Layout,
    redirect: '/partnerManage/index',
    name: 'PartnerManage',
    meta: {
      title: '城市合伙人',
      icon: 'partner'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/partner/partnerManage'),
        name: 'PartnerManage',
        meta: { title: '城市合伙人管理', roles: ['admin'] }
      }, {
        path: 'apply',
        component: () => import('@/views/partner/partnerApply'),
        name: 'PartnerApply',
        meta: { title: '城市合伙人申请', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/regionalPartner',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/partner/regionalPartner'),
        name: 'RegionalPartner',
        hidden: true,
        meta: { title: '区域合伙人', icon: 'dashboard', affix: true, isBack: true }
      }
    ]
  },
  {
    path: '/resource',
    component: Layout,
    redirect: '/resource/news',
    name: 'Resource',
    meta: {
      title: '内容管理',
      icon: 'el-icon-s-order'
    },
    children: [
      {
        path: 'banner',
        component: () => import('@/views/resource/banner'),
        name: 'Banner',
        meta: { title: '轮播图管理',
          roles: ['admin'] }
      }, {
        path: 'news',
        component: () => import('@/views/resource/news'),
        name: 'News',
        meta: { title: '资讯管理', affix: true }
      }, {
        path: 'horseLantern',
        component: () => import('@/views/resource/horseLantern'),
        name: 'HorseLantern',
        meta: { title: '走马灯管理', affix: true }
      }
    ]
  },
  {
    path: '/reward',
    component: Layout,
    redirect: '/reward/popularize',
    name: 'Reward',
    meta: {
      title: '奖励发放',
      icon: 'reward'
    },
    children: [
      {
        path: 'popularize',
        component: () => import('@/views/reward/popularize'),
        name: 'Popularize',
        meta: { title: '推广奖励', affix: true }
      }, {
        path: 'community',
        component: () => import('@/views/reward/community'),
        name: 'Community',
        meta: { title: '社区奖励', affix: true }
      }
    ]
  }

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
