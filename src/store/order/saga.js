import { call, put, takeEvery } from "redux-saga/effects";

// Ecommerce Redux States
import {
  GET_ORDERS,
  GET_ORDER_DETAIL,
  GET_DASHBOARD,
  ADD_NEW_ORDER,
  DELETE_ORDER,
  UPDATE_ORDER,
  GET_TICKETS,
  GET_TICKET_DETAIL,
  ADD_NEW_TICKET,
  ADD_TICKET_MESSAGE,
  UPDATE_TICKET,
} from "./actionTypes";
import {
  getDashboardSuccess,
  getDashboardFail,
  getOrdersListsFail,
  getOrdersListsSuccess,
  getOrderDetailFail,
  getOrderDetailSuccess,
  addNewOrderFail,
  addNewOrderSuccess,
  updateOrdersSuccess,
  updateOrdersFail,
  deleteOrdersSuccess,
  deleteOrdersFail,
  getTicketsListsFail,
  getTicketsListsSuccess,
  getTicketDetailFail,
  getTicketDetailSuccess,
  addNewTicketFail,
  addNewTicketSuccess,
  updateTicketSuccess,
  updateTicketFail,
  addTicketMessageFail,
  addTicketMessageSuccess,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getOrders,
  addNewOrder,
  updateOrder,
  deleteOrder,
  getSellerDashboard,
  getTickets,
  getTicketDetails,
  addNewTicket,
  addTicketMessage,
  updateTicket,
  getOrderDetails
} from "helpers/backend_helper";
import { take } from "lodash";

function* fetchDashboard() {
  try {
    const response = yield call(getSellerDashboard);
    yield put(getDashboardSuccess(response.data));
  } catch (error) {
    yield put(getDashboardFail(error));
  }
}

function* fetchTickets() {
  try {
    const response = yield call(getTickets);
    yield put(getTicketsListsSuccess(response.data));
  } catch (error) {
    yield put(getTicketsListsFail(error));
  }
}

function* fetchTicketDetail({ ticketID }) {
  try {
    const response = yield call(getTicketDetails,ticketID);
    yield put(getTicketDetailSuccess(response.data));
  } catch (error) {
    yield put(getTicketDetailFail(error));
  }
}

function* fetchOrders() {
  try {
    const response = yield call(getOrders);
    yield put(getOrdersListsSuccess(response.data));
  } catch (error) {
    yield put(getOrdersListsFail(error));
  }
}

function* fetchOrderDetail({ orderID }) {
  try {
    const response = yield call(getOrderDetails,orderID);
    yield put(getOrderDetailSuccess(response.data));
  } catch (error) {
    yield put(getOrderDetailFail(error));
  }
}

function* onUpdateOrder({ payload: order }) {
  try {
    const response = yield call(updateOrder, order);
    yield put(updateOrdersSuccess(response));
  } catch (error) {
    yield put(updateOrdersFail(error));
  }
}

function* onDeleteOrder({ payload: order }) {
  try {
    const response = yield call(deleteOrder, order);
    yield put(deleteOrdersSuccess(response));
  } catch (error) {
    yield put(deleteOrdersFail(error));
  }
}

function* onAddNewOrder({ payload: order }) {
  try {
    const response = yield call(addNewOrder, order);
    yield put(addNewOrderSuccess(response));
  } catch (error) {
    yield put(addNewOrderFail(error));
  }
}


function* onAddNewTicket({ payload: ticket }) {
  try {
    const response = yield call(addNewTicket, ticket);
    yield put(addNewTicketSuccess(response?.data));
    try {
      const response = yield call(getTickets);
      yield put(getTicketsListsSuccess(response.data));
    } catch (error) {
      yield put(getTicketsListsFail(error));
    }
  } catch (error) {
    yield put(addNewTicketFail(error));
  }
}



function* onAddTicketMessage({ payload: message }) {
  try {
    const response = yield call(addTicketMessage, message);
    yield put(addTicketMessageSuccess(response));

    try {
      const response = yield call(getTicketDetails,message.ticket_number);
      yield put(getTicketDetailSuccess(response.data));
    } catch (error) {
      yield put(getTicketDetailFail(error));
    }
  } catch (error) {
    yield put(addTicketMessageFail(error));
  }
}


function* orderSaga() {
  yield takeEvery(ADD_NEW_TICKET,onAddNewTicket);
  yield takeEvery(GET_DASHBOARD,fetchDashboard);
  yield takeEvery(GET_TICKETS,fetchTickets);
  yield takeEvery(ADD_TICKET_MESSAGE,onAddTicketMessage);
  yield takeEvery(GET_TICKET_DETAIL,fetchTicketDetail);
  yield takeEvery(GET_ORDERS, fetchOrders);
  yield takeEvery(GET_ORDER_DETAIL, fetchOrderDetail);
   yield takeEvery(ADD_NEW_ORDER, onAddNewOrder);
  yield takeEvery(UPDATE_ORDER, onUpdateOrder);
  yield takeEvery(DELETE_ORDER, onDeleteOrder);
 }

export default orderSaga;
