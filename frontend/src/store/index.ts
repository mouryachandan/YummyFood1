import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import cartReducer from "../store/address/card/cardSlice";
import { cartSaga } from "../store/address/card/cardSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(cartSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
