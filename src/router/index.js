import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [
		/*{
			path: '/',
			component: () => import('../pages/login'),
			redirect: '/layout'
		},*/
		{
			path: '/',
			component: () => import('../pages/layout'),
			children: [
				{
					path: '/',
					component: () => import('../pages/home')
				},
        {
          path:'/chart1',
          component: ()=>import('../pages/echarts/chart1')
        }
			]
		}
	]
})
