<script setup lang="ts">
import { ref } from 'vue';
import AppDrawer from './components/AppDrawer.vue';
import AppHeader from './components/AppHeader.vue';
import OrderForm from './components/OrderForm.vue';

const drawerOpen = ref(false);
const orderOpen = ref(false);

const changeDrawer = () => {
	drawerOpen.value = !drawerOpen.value;
};
const changeOrder = () => {
	orderOpen.value = !orderOpen.value;
};
</script>

<template>
	<div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
		<OrderForm v-if="orderOpen"  @change-order="changeOrder" @change-drawer="changeDrawer"/>
		<AppDrawer
			v-if="drawerOpen"
			@change-drawer="changeDrawer"
			@change-order="changeOrder"
		/>
		<AppHeader @change-drawer="changeDrawer"  />
		<div class="p-10">
			<router-view> </router-view>
		</div>
	</div>
</template>

<style scoped></style>
