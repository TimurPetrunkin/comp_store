<script setup lang="ts">
import { INotebook } from '../localData/NotebookData';
import DrawerCard from './DrawerCard.vue';
const emit = defineEmits(['removeFromCart']);
defineProps<{
	cart: INotebook[];
}>();
</script>

<template>
	<div class="flex flex-col flex-1 gap-4" v-auto-animate>
		<DrawerCard
			v-for="item in cart"
			:key="item.id"
			:title="item.title"
			:imageURL="item.image_path"
			:price="item.price"
			@on-click-remove="() => emit('removeFromCart', item)"
		/>
	</div>
</template>
