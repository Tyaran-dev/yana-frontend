import { configureStore, createSlice } from '@reduxjs/toolkit';
import { hotelDataSlice } from './hotels/hotelsSlice';
import { combineReducers } from 'redux';
import {
  persistStore,
  persistReducer,

} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    value: null,
  },
  reducers: {
    setData: (state, action) => {
      state.value = action.payload;
    },
    clearData: (state) => {
      state.value = null;
    },
  },
});


export const { setData, clearData } = dataSlice.actions;

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [ 'hotelData']
};


const hotelDataPersistConfig = {
  key: 'hotelData',
  storage,
  whitelist: ['searchParamsData', 'hotels']
};


const rootReducer = combineReducers({
  data: dataSlice.reducer,
  hotelData: persistReducer(hotelDataPersistConfig, hotelDataSlice.reducer) // ✅ wrap with persist

});

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,

    }),
});

// ✅ Add these type exports
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;
