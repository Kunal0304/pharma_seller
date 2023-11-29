import axios from "axios";
import { del, get, post, put } from "./api_helper";
import * as url from "./url_helper";

// Gets the logged in user data from local session
const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

const getAuthToken = () =>{

  const user = localStorage.getItem("authUser");
  if (user){
    user = JSON.parse(user);
    return user.token;
  }
   
  return null;
  
} 
//is user is logged in
const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};


// Auth Login Method
const postAuthLogin = data => post(url.BASE_URL+url.POST_AUTH_LOGIN, data);



// get groups
export const getGroups = () => get(url.GET_GROUPS);

// get seller groups
export const getProductTypes = () => get(url.BASE_URL+url.GET_PRODUCT_TYPES);

// get seller groups
export const getProductCategories = () => get(url.BASE_URL+url.GET_PRODUCT_CATEGORIES);

export const getParentProducts = () => get(url.BASE_URL+url.GET_PARENT_PRODUCTS);
// get seller groups
export const getSellerProducts = () => get(url.BASE_URL+url.GET_SELLER_PRODUCTS);
// get seller groups
export const getProductRequests = () => get(url.BASE_URL+url.GET_PRODUCT_REQUESTS);

// get seller members
export const addProductRequest = request => post(url.BASE_URL+url.GET_PRODUCT_REQUESTS, request);

// get seller members
export const cancelProductRequest = request => post(url.BASE_URL+url.CANCEL_PRODUCT_REQUESTS, request);

// get seller groups
export const getSellerGroups = () => get(url.BASE_URL+url.GET_SELLER_GROUPS);

// get seller members
export const getSellerMembers = () => get(url.BASE_URL+url.GET_SELLER_MEMBERS);

// get seller dashboard
export const getSellerDashboard = () => get(url.BASE_URL+url.GET_SELLER_DASHBOARD);

// get seller members
export const addNewMemberList = member => post(url.BASE_URL+url.ADD_SELLER_MEMBERS, member);

// get seller members
export const setSellerShopVacation = () => get(url.BASE_URL+url.SET_SELLER_SHOP_VACATION);

export const getSellerShopVacation = () => get(url.BASE_URL+url.GET_SELLER_SHOP_VACATION);

export const getSellerShopCompliance = () => get(url.BASE_URL+url.GET_SELLER_SHOP_COMPLIANCE);

export const saveSellerShopCompliance = compliances => post(url.BASE_URL+url.SAVE_SELLER_SHOP_COMPLIANCE,compliances);

export const saveSellerInventory = product => post(url.BASE_URL+url.SAVE_INVENTORY,product);

export const updateSellerInventory = product => post(url.BASE_URL+url.UPDATE_INVENTORY+'/'+product.id,product);

// get seller members
export const changeSallerInventory = request => post(url.BASE_URL+url.CHANGE_INVENTORY+'/'+request.id, request);

// get orders
export const getOrders = () => get(url.BASE_URL+url.GET_SELLER_ORDERS);

export const getOrderDetails = orderID => get(url.BASE_URL+url.GET_ORDER_DETAIL+orderID);

// add order
export const addNewOrder = order => post(url.ADD_NEW_ORDER, order);

// update order
export const updateOrder = order => put(url.UPDATE_ORDER, order);

// delete order
export const deleteOrder = order =>
  del(url.DELETE_ORDER, { headers: { order } });

// get orders
export const getTickets = () => get(url.BASE_URL+url.GET_TICKETS);

export const getTicketDetails = ticketID => get(url.BASE_URL+url.GET_TICKET_DETAIL+ticketID);



export const addTicketMessage = message => post(url.BASE_URL+url.ADD_TICKET_MESSAGE+message.ticket_number,message);

// add order
export const addNewTicket = ticket => post(url.BASE_URL+url.ADD_NEW_TICKET, ticket);

// update order
export const updateTicket = ticket => put(url.BASE_URL+url.UPDATE_TICKET, ticket);  

export {
    getLoggedInUser,
    isUserAuthenticated,
    postAuthLogin,
  };
  