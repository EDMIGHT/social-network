import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Tag } from '@/types/tag.types';

interface IOptionState {
  tags: Tag[];
}

const initialState: IOptionState = {
  tags: [],
};

const options = createSlice({
  name: 'options',
  initialState,
  reducers: {
    setTags: (state, action: PayloadAction<Tag[]>) => {
      state.tags = action.payload;
    },
    addTag: ({ tags }, action: PayloadAction<Tag>) => {
      // ? нужно потом попробовать перевести на структуру Set
      const existedTag = tags.find((tag) => tag.id === action.payload.id);

      if (!existedTag) {
        tags.push(action.payload);
      }
    },
    removeTag: (state, action: PayloadAction<Tag>) => {
      // ! себе на будущее: приравнивать к деструктурируемому значению новое состояния не изменяет сам состояние
      state.tags = state.tags.filter((tag) => tag.id !== action.payload.id);
    },
  },
});

export const { setTags, addTag, removeTag } = options.actions;

export default options.reducer;
