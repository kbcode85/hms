import { defineStore } from 'pinia'

export const useSidebarStore = defineStore({
	id: 'SidebarStore',
	state: () => ({
		isCollapsed: false,
	}),
	actions: {
		toggleSidebar() {
			console.log('toggleSidebar is called')
			this.isCollapsed = !this.isCollapsed
		},
	},
})
