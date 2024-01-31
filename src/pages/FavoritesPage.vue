<script setup lang="ts">
import { ref } from 'vue';
import CardList from '../components/CardList.vue';
import { useNotebooksStore } from '../stores/NoteBookStore';
const notebookStore = useNotebooksStore();

const favorites = ref(notebookStore.favorites);
</script>

<template>
	<div>
		<h2 class="text-3xl font-bold mb-8">Мои закладки</h2>
		<CardList :items="favorites" :is-favorite-page="true" />
	</div>
</template>
