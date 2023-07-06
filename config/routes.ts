export default [
  { path: '/user', layout: false, routes: [{ path: '/user/login', component: './User/Login' }] },
  { path: '/user', layout: false, routes: [{ path: '/user/register', component: './User/Register' }],},
  { path: '/welcome', name: '首页', icon: 'smile', component: './Welcome' },
  { path: '/', redirect: '/welcome' },
  { path: '/add_chart', name: '智能分析', icon: 'barChart', component: './AddChart' },
  { path: '/search_chart', name: '历史图表', icon: 'history', component: './SearchChart'},
  {
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', component: './Admin' },
    ],
  },
  { path: '*', layout: false, component: './404' },
];
