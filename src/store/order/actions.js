import {
  GET_ORDERS,
  GET_ORDERS_FAIL,
  GET_ORDERS_SUCCESS,
  GET_ORDER_DETAIL,
  GET_ORDER_DETAIL_FAIL,
  GET_ORDER_DETAIL_SUCCESS,
  ADD_NEW_ORDER,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_FAIL,
  UPDATE_ORDER,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  GET_DASHBOARD,
  GET_DASHBOARD_SUCCESS,
  GET_DASHBOARD_FAIL,
  GET_TICKETS,
  GET_TICKETS_FAIL,
  GET_TICKETS_SUCCESS,
  GET_TICKET_DETAIL,
  GET_TICKET_DETAIL_FAIL,
  GET_TICKET_DETAIL_SUCCESS,
  ADD_NEW_TICKET,
  ADD_TICKET_SUCCESS,
  ADD_TICKET_FAIL,
  ADD_TICKET_MESSAGE,
  ADD_TICKET_MESSAGE_SUCCESS,
  ADD_TICKET_MESSAGE_FAIL,
  UPDATE_TICKET,
  UPDATE_TICKET_SUCCESS,
  UPDATE_TICKET_FAIL,

} from "./actionTypes"



export const getDashboard = () => ({
  type: GET_DASHBOARD,
})

export const getDashboardSuccess = dashboard => ({
  type: GET_DASHBOARD_SUCCESS,
  payload: dashboard,
})

export const getDashboardFail = error => ({
  type: GET_DASHBOARD_FAIL,
  payload: error,
})



export const getOrdersLists = () => ({
  type: GET_ORDERS,
})

export const getOrdersListsSuccess = orders => ({
  type: GET_ORDERS_SUCCESS,
  payload: orders,
})

export const getOrdersListsFail = error => ({
  type: GET_ORDERS_FAIL,
  payload: error,
})

export const getOrderDetail = orderID => ({
  type: GET_ORDER_DETAIL,
  orderID
})

export const getOrderDetailSuccess = order => ({
  type: GET_ORDER_DETAIL_SUCCESS,
  payload: order,
})

export const getOrderDetailFail = error => ({
  type: GET_ORDER_DETAIL_FAIL,
  payload: error,
})

export const addOrder = order => ({
  type: ADD_NEW_ORDER,
  payload: order,
})

export const addNewOrderSuccess = order => ({
  type: ADD_ORDER_SUCCESS,
  payload: order,
})

export const addNewOrderFail = error => ({
  type: ADD_ORDER_FAIL,
  payload: error,
})

export const updateOrders = order => ({
  type: UPDATE_ORDER,
  payload: order,
})

export const updateOrdersSuccess = order => ({
  type: UPDATE_ORDER_SUCCESS,
  payload: order,
})

export const updateOrdersFail = error => ({
  type: UPDATE_ORDER_FAIL,
  payload: error,
})

export const deleteOrders = order => ({
  type: DELETE_ORDER,
  payload: order,
})

export const deleteOrdersSuccess = order => ({
  type: DELETE_ORDER_SUCCESS,
  payload: order,
})

export const deleteOrdersFail = error => ({
  type: DELETE_ORDER_FAIL,
  payload: error,
})



export const getTicketsLists = () => ({
  type: GET_TICKETS,
})

export const getTicketsListsSuccess = tickets => ({
  type: GET_TICKETS_SUCCESS,
  payload: tickets,
})

export const getTicketsListsFail = error => ({
  type: GET_TICKETS_FAIL,
  payload: error,
})


export const getTicketDetails = ticketID => ({
  type: GET_TICKET_DETAIL,
  ticketID,
})

export const getTicketDetailSuccess = tickets => ({
  type: GET_TICKET_DETAIL_SUCCESS,
  payload: tickets,
})

export const getTicketDetailFail = error => ({
  type: GET_TICKET_DETAIL_FAIL,
  payload: error,
})

export const addTicket = ticket => ({
  type: ADD_NEW_TICKET,
  payload: ticket,
})

export const addNewTicketSuccess = ticket => ({
  type: ADD_TICKET_SUCCESS,
  payload: ticket,
})

export const addNewTicketFail = error => ({
  type: ADD_TICKET_FAIL,
  payload: error,
})

export const addTicketMessage = message => ({
  type: ADD_TICKET_MESSAGE,
  payload: message,
})

export const addTicketMessageSuccess = message => ({
  type: ADD_TICKET_MESSAGE_SUCCESS,
  payload: message,
})

export const addTicketMessageFail = error => ({
  type: ADD_TICKET_MESSAGE_FAIL,
  payload: error,
})


export const updateTicket = ticket => ({
  type: UPDATE_TICKET,
  payload: ticket,
})

export const updateTicketSuccess = ticket => ({
  type: UPDATE_TICKET_SUCCESS,
  payload: ticket,
})

export const updateTicketFail = error => ({
  type: UPDATE_TICKET_FAIL,
  payload: error,
})

