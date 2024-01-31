<script setup lang="ts">
defineProps({
	id: Number,
	title: String,
	imageURL: String,
	price: Number,
});
const emit = defineEmits(['onClickRemove']);
</script>

<template>
	<div class="flex items-center border border-slate-100 p-4 rounded-xl gap-4">
		<img class="w-16" :src="imageURL" :alt="title" />
		<div class="flex flex-col flex-1">
			<p>{{ title }}</p>

			<div class="flex justify-between mt-2">
				<b class="flex-1">{{ price }}</b>
				<img
					class="opacity-40 cursor-pointer hover:opacity-100 transition"
					src="/close.svg"
					alt=""
					@click="emit('onClickRemove')"
				/>
			</div>
		</div>
	</div>
</template>
