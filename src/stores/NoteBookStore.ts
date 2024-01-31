import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import NotebookData, {
	INotebook,
	INotebookData,
} from '../localData/NotebookData';

export const useNotebooksStore = defineStore('noteBookStore', () => {
	const notebooks = ref<INotebook[]>(
		NotebookData.map(
			(item: INotebookData): INotebook => ({
				...item,
				isFavorite: false,
				isAdded: false,
			})
		)
	);

	const notebooksInLocalStorage = localStorage.getItem('notebooks');

	if (notebooksInLocalStorage) {
		notebooks.value = JSON.parse(notebooksInLocalStorage);
	}

	const getNotebook = (id: number): INotebook | undefined => {
		return notebooks.value.find(notebook => notebook.id === id);
	};

	const searchNotebooks = (searchText: string): INotebook[] => {
		return notebooks.value.filter(notebook => {
			return notebook.title.toLowerCase().includes(searchText.toLowerCase());
		});
	};

	const favorites = computed(() => {
		return notebooks.value.filter(notebook => notebook.isFavorite);
	});

	const addToFavorite = (item: INotebook) =>
		(item.isFavorite = !item.isFavorite);

	watch(
		() => notebooks,
		state => {
			localStorage.setItem('notebooks', JSON.stringify(state.value));
		},
		{ deep: true }
	);

	return {
		notebooks,
		getNotebook,
		addToFavorite,
		searchNotebooks,
		favorites,
	};
});
