<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useNotebooksStore } from '../stores/NoteBookStore';
const route = useRoute();
const notebookStore = useNotebooksStore();
const item = notebookStore.getNotebook(Number(route.params.id));
</script>
<template>
	<div class="flex">
		<div>
			<img :src="item?.image_path" alt="notebook" class="min-w-96" />
		</div>
		<div class="flex flex-col">
			<div class="flex">
				<h1 class="flex-1 font-bold text-xl mt-2 text-center">
					{{ item?.title }}
				</h1>
				<router-link to="/">
					<button class="bg-blue-500 text-white py-2 px-4 rounded">
						Назад
					</button>
				</router-link>
			</div>
			<p class="mt-10"><b>Описание:</b> {{ item?.description }}</p>
			<div class="flex gap-2 mt-2">
				<span class="font-bold">Цена:</span>
				<div class="flex-1 border-b border-dashed"></div>
				<b>{{ item?.price }}₽</b>
			</div>
			<button
				v-if="!item?.isAdded"
				class="bg-blue-500 text-white py-2 px-4 rounded self-center mt-5"
			>
				Добавить в корзину
			</button>
			<button
				v-else
				disabled
				class="bg-green-500 text-white py-2 px-4 rounded self-center mt-5"
			>
				Уже в корзине
			</button>
			<h1 class="font-bold text-l self-center mt-4">Характеристики</h1>
			<div class="flex gap-2 mt-2">
				<span>Серия:</span>
				<div class="flex-1 border-b border-dashed"></div>
				<span>{{ item?.series }}</span>
			</div>
			<div class="flex gap-2 mt-2">
				<span>Модель:</span>
				<div class="flex-1 border-b border-dashed"></div>
				<span>{{ item?.model }}</span>
			</div>
			<div class="flex gap-2 mt-2">
				<span>Операционная система:</span>
				<div class="flex-1 border-b border-dashed"></div>
				<span>{{ item?.OS }}</span>
			</div>
			<div class="flex gap-2 mt-2">
				<span>Процессор:</span>
				<div class="flex-1 border-b border-dashed"></div>
				<span>{{ item?.processor }}</span>
			</div>
			<div class="flex gap-2 mt-2">
				<span>Видеокарта:</span>
				<div class="flex-1 border-b border-dashed"></div>
				<span>{{ item?.graphics }}</span>
			</div>
			<div class="flex gap-2 mt-2">
				<span>Объем оперативной памяти:</span>
				<div class="flex-1 border-b border-dashed"></div>
				<span>{{ item?.ram }}</span>
			</div>
			<div class="flex gap-2 mt-2">
				<span>Объем хранилища:</span>
				<div class="flex-1 border-b border-dashed"></div>
				<span>{{ item?.storage }}</span>
			</div>
			<div class="flex gap-2 mt-2">
				<span>Экран:</span>
				<div class="flex-1 border-b border-dashed"></div>
				<span>{{ item?.display }}</span>
			</div>
			<div class="flex gap-2 mt-2">
				<span>Вес:</span>
				<div class="flex-1 border-b border-dashed"></div>
				<span>{{ item?.weight }}</span>
			</div>
		</div>
	</div>
</template>
