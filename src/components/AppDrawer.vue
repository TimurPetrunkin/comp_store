<script setup lang="ts">
import { computed } from 'vue';
import { useCartStore } from '../stores/CartStore';
import DrawerCardList from './DrawerCardList.vue';
import DrawerHead from './DrawerHead.vue';
import InfoBlock from './InfoBlock.vue';
const cartStore = useCartStore();
const emit = defineEmits(['changeDrawer', 'changeOrder']);
const cartIsEmpty = computed(() => cartStore.checkCartIsEmpty());
const ButtonDisabled = computed(() => cartIsEmpty.value);
</script>

<template>
	<div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
	<div
		class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8 max-h-screen overflow-y-auto"
	>
		<DrawerHead @change-drawer="emit('changeDrawer')" />

		<div v-if="!cartStore.totalPrice" class="flex h-full items-center">
			<InfoBlock
				v-if="!cartStore.totalPrice"
				title="Корзина пустая"
				description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ"
				image-url="/package-icon.png"
			/>
		</div>

		<div v-else>
			<DrawerCardList
				:cart="cartStore.cart"
				@remove-from-cart="cartStore.removeFromCart"
			/>
			<div class="flex flex-col gap-4 mt-7">
				<div class="flex gap-2">
					<span>Итого:</span>
					<div class="flex-1 border-b border-dashed"></div>
					<b>{{ cartStore.totalPrice }} ₽</b>
				</div>
				<button
					:disabled="ButtonDisabled"
					@click="emit('changeOrder')"
					class="bg-lime-500 w-full rounded-xl py-3 text-white hover:bg-lime-600 transition active:bg-lime-700 disabled:bg-slate-400 cursor-pointer"
				>
					Оформить заказ
				</button>
			</div>
		</div>
	</div>
</template>
