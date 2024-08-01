import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {thunk} from 'redux-thunk';
import emailReducer from './emailSlice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['loading', 'currentEmail'],
};

const persistedReducer = persistReducer(persistConfig, emailReducer);

const store = configureStore({
  reducer: {
    emails: persistedReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }).concat(thunk),
});

export default store;
export const persistor = persistStore(store);
