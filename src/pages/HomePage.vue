<script setup lang="ts">
import { ref } from 'vue';
import CardList from '../components/CardList.vue';
import { useCartStore } from '../stores/CartStore';
import { useNotebooksStore } from '../stores/NoteBookStore';
const notebookStore = useNotebooksStore();
const cartStore = useCartStore();
const items = ref(notebookStore.notebooks);
const onChangeSearchInput = (event: Event) => {
	items.value = notebookStore.searchNotebooks(
		(event.target as HTMLInputElement).value
	);
};
</script>
<template>
	<div class="flex justify-between items-center">
		<h2 class="text-3xl font-bold mb-8">Все ноутбуки</h2>
		<div class="relative">
			<img class="absolute left-4 top-3" src="/search.svg" alt="Search" />
			<input
				@input="onChangeSearchInput"
				type="text"
				placeholder="Поиск..."
				class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
			/>
		</div>
	</div>
	<div class="mt-10">
		<CardList
			:items="items"
			@add-to-cart="cartStore.addToCart"
			@add-to-favorite="notebookStore.addToFavorite"
		/>
	</div>
</template>
