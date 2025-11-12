import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { taskReducer } from "./taskSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

// ===============================================
// Redux Persist Setup (optional - currently disabled)
// ===============================================
// const rootReducer = combineReducers({
//   todo: taskReducer,
// });

// const persistConfig = {
//   key: "root",
//   storage,
//   version: 1,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({ serializableCheck: false }),
// });

// export const persistor = persistStore(store);

// ===============================================
// Simple Redux Store (Active)
// ===============================================
const store = configureStore({
  reducer: {
    todo: taskReducer,
  },
});

// ===============================================
// Export Default Store
// ===============================================
export default store;
