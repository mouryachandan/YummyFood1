import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  fetchCartRequest,
  fetchCartSuccess,
  fetchCartFailure,
  updateQuantityRequest,
  updateQuantitySuccess,
  removeItemRequest,
  removeItemSuccess,
} from "./cardSlice";

const API_BASE_URL = "http://localhost:4000/api/cart";

type FetchCartAction = ReturnType<typeof fetchCartRequest>;
type UpdateQuantityAction = ReturnType<typeof updateQuantityRequest>;
type RemoveItemAction = ReturnType<typeof removeItemRequest>;

function* fetchCartSaga(action: FetchCartAction): Generator {
  try {
    const response: any = yield call(axios.get, `${API_BASE_URL}/${action.payload}`);
    yield put(fetchCartSuccess(response.data));
  } catch (error) {
    yield put(fetchCartFailure("Failed to load cart items"));
  }
}

function* updateQuantitySaga(action: UpdateQuantityAction): Generator {
  try {
    const { cartItemId, newQuantity, change } = action.payload;
    yield call(axios.put, `${API_BASE_URL}/update/${cartItemId}`, { newQuantity });

    yield put(updateQuantitySuccess({ cartItemId, newQuantity, change }));
  } catch (error) {
    console.error("Failed to update quantity", error);
  }
}

function* removeItemSaga(action: RemoveItemAction): Generator {
  try {
    yield call(axios.delete, `${API_BASE_URL}/remove/${action.payload}`);
    yield put(removeItemSuccess(action.payload));
  } catch (error) {
    console.error("Failed to remove item", error);
  }
}

export function* cartSaga(): Generator {
  yield takeLatest(fetchCartRequest.type, fetchCartSaga);
  yield takeLatest(updateQuantityRequest.type, updateQuantitySaga);
  yield takeLatest(removeItemRequest.type, removeItemSaga);
}
