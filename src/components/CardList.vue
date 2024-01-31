<script setup lang="ts">
import { INotebook } from '../localData/NotebookData';
import CardItem from './CardItem.vue';
defineProps<{
	items: INotebook[];
	isFavoritePage?: boolean;
}>();
const emit = defineEmits(['addToCart', 'addToFavorite']);
</script>

<template>
	<div class="grid grid-cols-4 gap-5" v-auto-animate>
		<CardItem
			v-for="item in items"
			:key="item.id"
			:id="item.id"
			:title="item.title"
			:image_path="item.image_path"
			:price="item.price"
			:is-added="item.isAdded"
			:is-favorite="item.isFavorite"
			:is-favorite-page="isFavoritePage"
			@add-to-cart="() => emit('addToCart', item)"
			@add-to-favorite="() => emit('addToFavorite', item)"
		/>
	</div>
</template>
