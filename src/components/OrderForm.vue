<script setup lang="ts">
import { ref } from 'vue';
import { useCartStore } from '../stores/CartStore';
import InfoBlock from './InfoBlock.vue';

const emit = defineEmits(['changeOrder', 'changeDrawer']);
const cartStore = useCartStore();
const oderCreated = ref(false);
const name = ref('');
const surname = ref('');
const number = ref('');
const address = ref('');
const email = ref('');
const validateLength = ref(false);
const validateNumber = ref(false);
const validateEmail = ref(false);

const changeOrderStatus = (): void => {
	validateLength.value = false;
	validateEmail.value = false;
	validateNumber.value = false;
	if (
		name.value.length === 0 ||
		surname.value.length === 0 ||
		number.value.length === 0 ||
		address.value.length === 0 ||
		email.value.length === 0
	) {
		validateLength.value = true;
		return;
	} else {
		const validEmail = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
		const validNumber = /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/;
		if (!email.value.match(validEmail)) {
			validateEmail.value = true;
			return;
		}
		if (!number.value.match(validNumber)) {
			validateNumber.value = true;
			return;
		}
		oderCreated.value = !oderCreated.value;
		cartStore.clearCart();
	}
};
</script>

<template>
	<div class="fixed top-0 left-0 h-full w-full bg-black z-30 opacity-80"></div>
	<div
		class="bg-white w-96 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 p-10 rounded-xl shadow-xl"
	>
		<img
			class="opacity-60 cursor-pointer hover:opacity-100 transition absolute top-3 right-3"
			src="/close.svg"
			alt=""
			@click="emit('changeOrder')"
		/>
		<form v-if="!oderCreated" @submit.prevent="changeOrderStatus">
			<h1 class="text-center font-bold">Заполните данные для доставки</h1>
			<div class="flex flex-col gap-2 mt-2">
				<div class="flex flex-col">
					<input
						type="text"
						placeholder="Ваше имя"
						class="shadow-xl border-2 p-1 rounded"
						v-model="name"
					/>
					<p
						v-if="name.length === 0 && validateLength"
						class="text-red-500 text-sm mt-1 ml-1"
					>
						{{
							name.length > 0
								? 'Неправильный формат'
								: 'Поле обязательно для заполнения'
						}}
					</p>
				</div>

				<div class="flex flex-col">
					<input
						type="text"
						placeholder="Ваше фамилия"
						class="shadow-xl border-2 p-1 rounded"
						v-model="surname"
					/>
					<p
						v-if="surname.length === 0 && validateLength"
						class="text-red-500 text-sm mt-1 ml-1"
					>
						Поле обязательно для заполнения
					</p>
				</div>

				<div class="flex flex-col">
					<input
						type="email"
						placeholder="Email"
						class="shadow-xl border-2 p-1 rounded"
						v-model="email"
					/>
					<p
						v-if="email.length === 0 && validateLength"
						class="text-red-500 text-sm mt-1 ml-1"
					>
						Поле обязательно для заполнения
					</p>
					<p v-if="validateEmail" class="text-red-500 text-sm mt-1 ml-1">
						Неправильный формат
					</p>
				</div>

				<div class="flex flex-col">
					<input
						type="tel"
						placeholder="Номер телефона"
						class="shadow-xl border-2 p-1 rounded"
						v-model="number"
					/>
					<p
						v-if="number.length === 0 && validateLength"
						class="text-red-500 text-sm mt-1 ml-1"
					>
						Поле обязательно для заполнения
					</p>
					<p v-if="validateNumber" class="text-red-500 text-sm mt-1 ml-1">
						Неправильный формат
					</p>
				</div>
				<div class="flex flex-col">
					<input
						type="text"
						placeholder="Адрес доставки"
						class="shadow-xl border-2 p-1 rounded"
						v-model="address"
					/>
					<p
						v-if="address.length === 0 && validateLength"
						class="text-red-500 text-sm mt-1 ml-1"
					>
						Поле обязательно для заполнения
					</p>
				</div>
				<button class="bg-blue-500 text-white py-2 px-4 rounded mt-4">
					Заказать
				</button>
			</div>
		</form>
		<div v-else class="flex flex-col">
			<InfoBlock
				title="Заказ оформлен!"
				:description="`Ваш заказ скоро будет передан курьерской доставке`"
				image-url="/order-success-icon.png"
			/>
			<button
				class="bg-blue-500 text-white py-2 px-4 rounded mt-4"
				@click="
					() => {
						emit('changeOrder');
						emit('changeDrawer');
					}
				"
			>
				Вернуться на главную
			</button>
		</div>
	</div>
</template>
