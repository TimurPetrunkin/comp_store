<script setup lang="ts">
defineProps<{
	id: number;
	image_path: string;
	title: string;
	price: number;
	isFavorite: boolean;
	isAdded: boolean;
	isFavoritePage?: boolean;
}>();
const emit = defineEmits(['addToCart', 'addToFavorite']);
</script>

<template>
	<router-link
		:to="{ name: 'Item', params: { id } }"
		class="bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl flex flex-col justify-between"
	>
		<div>
			<img :src="image_path" alt="Notebook" />
			<p class="mt-2">{{ title }}</p>
		</div>
		<div>
			<div class="flex justify-between mt-5">
				<div class="flex flex-col">
					<span class="text-slate-400">Цена:</span>
					<b>{{ price }} руб.</b>
				</div>
			</div>
			<div v-if="!isFavoritePage" class="flex justify-between mt-5">
				<button
					v-if="!isAdded"
					class="bg-blue-500 text-white py-2 px-4 rounded"
					@click.prevent="emit('addToCart')"
				>
					В корзину
				</button>
				<button
					v-else
					disabled
					class="bg-green-500 text-white py-2 px-4 rounded"
				>
					Уже в корзине
				</button>
				<img
					v-if="!isFavoritePage"
					class="w-10"
					@click.prevent="emit('addToFavorite')"
					:src="isFavorite ? '/like-2.svg' : '/like-1.svg'"
					alt="Like 1"
				/>
			</div>
		</div>
	</router-link>
</template>
