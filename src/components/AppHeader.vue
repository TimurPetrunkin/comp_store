<script setup lang="ts">
import axios from 'axios';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useCartStore } from '../stores/CartStore';
import { BASE_URL, WEATHER_API } from '../constants';
const cartStore = useCartStore();
type TypeGetWeatherResponse = {
	main: {
		feels_like: number;
		grnd_level: number;
		humidity: number;
		pressure: number;
		sea_level: number;
		temp: number;
		temp_max: number;
		temp_min: number;
	};
};
const temperature = ref(0);
const currentTime = ref(Date.now());
const intervalTime = ref();
const intervalWeather = ref();

const emit = defineEmits(['changeDrawer']);

const timeStr = computed(() =>
	new Date(currentTime.value).toLocaleTimeString('ru-RU', {
		timeZone: 'Europe/Moscow',
		hour: '2-digit',
		minute: '2-digit',
	})
);

const fetchWeather = async () => {
	try {
		const { data } = await axios.get<TypeGetWeatherResponse>(
			`${BASE_URL}?q=Moscow&appid=${WEATHER_API}&units=metric`
		);
		temperature.value = Math.trunc(data.main.temp);
	} catch (err) {
		console.log(err);
	}
};

onMounted(() => {
	fetchWeather();
	intervalWeather.value = setInterval(() => {
		fetchWeather();
	}, 50000);
	intervalTime.value = setInterval(() => {
		currentTime.value = Date.now();
	}, 5000);
});

onUnmounted(() => {
	clearInterval(intervalTime.value);
	clearInterval(intervalWeather.value);
});
</script>

<template>
	<header class="flex justify-between border-b border-slate-200 px-10 py-8">
		<div class="flex">
			<router-link to="/">
				<div class="flex items-center gap-4">
					<img src="/compStore.jpg" alt="Logo" class="w-20" />
					<div>
						<h2 class="text-xl font-bold uppercase">Best Store</h2>
						<p class="text-slate-400">Лучший магазин ноутбуков</p>
					</div>
				</div>
			</router-link>
			<div class="px-10">
				<p class="font-bold">Москва</p>
				<p class="text-slate-400 hover:scale-150 transition">
					Время: <span class="font-bold text-slate-950">{{ timeStr }}</span>
				</p>
				<p class="text-slate-400 hover:scale-150 transition">
					Температура
					<span class="font-bold text-slate-950">{{ temperature }}°C</span>
				</p>
			</div>
		</div>
		<ul class="flex items-center gap-10">
			<li
				@click="emit('changeDrawer')"
				class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer"
			>
				<img src="/cart.svg" alt="cart" />
				<b>{{ cartStore.totalPrice }} руб.</b>
			</li>
			<router-link to="/favorites">
				<li
					class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer"
				>
					<img src="/heart.svg" alt="cart" />
					<span>Закладки</span>
				</li>
			</router-link>
		</ul>
	</header>
</template>
