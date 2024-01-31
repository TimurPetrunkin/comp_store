import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import { INotebook } from '../localData/NotebookData';
import { useNotebooksStore } from './NoteBookStore';

export const useCartStore = defineStore('cartStore', () => {
	const cart = ref<INotebook[]>([]);
	const cartInLocalStorage = localStorage.getItem('cart');

	if (cartInLocalStorage) {
		cart.value = JSON.parse(cartInLocalStorage);
	}

	const totalPrice = computed(() =>
		cart.value.reduce((acc, item) => acc + item.price, 0)
	);

	const addToCart = (item: INotebook) => {
		if (!item.isAdded) {
			cart.value.push(item);
			item.isAdded = true;
		}
	};
	const clearCart = () => {
		const notebookStore = useNotebooksStore();
		cart.value.forEach(item => {
			const notebook = notebookStore.getNotebook(item.id);
			if (notebook) {
				notebook.isAdded = false;
			}
		});
		cart.value = [];
	};
	const removeFromCart = (item: INotebook) => {
		const notebookStore = useNotebooksStore();
		const notebook = notebookStore.getNotebook(item.id);
		if (notebook) {
			notebook.isAdded = false;
		}
		cart.value.splice(cart.value.indexOf(item), 1);
	};

	const checkCartIsEmpty = (): boolean => {
		return cart.value.length === 0;
	};

	watch(
		() => cart,
		state => {
			localStorage.setItem('cart', JSON.stringify(state.value));
		},
		{ deep: true }
	);

	return {
		cart,
		totalPrice,
		addToCart,
		removeFromCart,
		clearCart,
		checkCartIsEmpty,
	};
});
