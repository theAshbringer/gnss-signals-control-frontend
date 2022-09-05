import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';

// Костыль для сообщения vue, что id - это number
// https://stackoverflow.com/questions/51418072/invalid-prop-type-from-router-params-expected-number-got-string
function castRouteIDasNumber(route: any) {
  return {
    id: Number(route.params.id),
  };
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Dashboard,
  },
  {
    path: '/bis',
    name: 'Bis',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "bis" */ '@/views/BisCommon.vue'),
  },
  {
    path: '/bis/:id',
    name: 'TheBis',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "bis" */ '@/views/Bis.vue'),
    props: castRouteIDasNumber,
  },
  {
    path: '/nka',
    name: 'Nka',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "nka" */ '@/views/NkaCommon.vue'),
  },
  {
    path: '/nka/:id',
    name: 'TheNka',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "nka" */ '@/views/Nka.vue'),
    props: castRouteIDasNumber,
  },
  {
    path: '/settings',
    name: 'Settings',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "settings" */ '@/views/BisSettings.vue'),
  },
  {
    path: '/tools',
    name: 'Tools',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "tools" */ '@/views/Tools.vue'),
  },
  {
    path: '/tools/dil1of',
    name: 'DIL1OF',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "tools" */ '@/views/L1OFDiTool.vue'),
  },
  {
    path: '/tools/tk_not_sequential',
    name: 'NonSequentialFrames',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "tools" */ '@/views/NonSequentialFrames.vue'),
  },
  {
    path: '/tools/l1of_frames_display',
    name: 'L1OFFramesDisplay',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "tools" */ '@/views/L1OFFramesDisplay.vue'),
  },
  {
    path: '/tools/l2of_frames_display',
    name: 'L2OFFramesDisplay',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "tools" */ '@/views/L2OFFramesDisplay.vue'),
  },
  {
    path: '/tools/l1sf_frames_display',
    name: 'L1SFFramesDisplay',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "tools" */ '@/views/L1SFFramesDisplay.vue'),
  },
  {
    path: '/tools/archive_data',
    name: 'ArchiveData',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "tools" */ '@/views/ArchiveData.vue'),
  },
  {
    path: '/compare_DI-and-SI/signalType=:signalType&id=:id',
    name: 'CompareDIandSI',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "tools" */ '@/views/CompareDIandSI.vue'),
    props: route => ({
      id: Number(route.params.id),
      signalType: route.params.signalType
    }),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
