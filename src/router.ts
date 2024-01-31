import { createRouter, createWebHistory } from 'vue-router';
export default createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'Home',
			component: () => import('./pages/HomePage.vue'),
		},
		{
			path: '/item/:id',
			name: 'Item',
			component: () => import('./pages/ItemPage.vue'),
		},
		{
			path: '/favorites',
			name: 'Favorites',
			component: () => import('./pages/FavoritesPage.vue'),
		},
	],
});
