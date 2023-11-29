import { call, put, takeEvery } from "redux-saga/effects"

import { SHOP_VECATION,GET_MEMBER_LIST, ADD_NEW_MEMBER_LIST, UPDATE_MEMBER_LIST, DELETE_MEMBER_LIST, GET_SHOP_VACATION,GET_SHOP_COMPLIANCE,SHOP_COMPLIANCE,CHANGE_STATUS_MEMBER} from "./actionTypes";
import {
    getMemberListSuccess,
    getMemberListFail,
    addMemberListSuccess,
    addMemberListFail,
    updateMemberListSuccess,
    updateMemberListFail,
    deleteMemberListSuccess,
    deleteMemberListFail,
    setShopVacationSuccess,
    setShopVacationFail,
    getShopVacationSuccess,
    getShopVacationFail,
    getShopComplianceSuccess,
    getShopComplianceFail,
    saveShopComplianceSuccess,
    saveShopComplianceFail,
    updateMemberStatusSuccess,
    updateMemberStatusFail
} from "./actions"

import {
    updateMember,
    updateMemberStatus,
    getSellerMembers,
    addNewMemberList,
    updateJobList,
    deleteJobList,
    setSellerShopVacation,
    getSellerShopVacation,
    getSellerShopCompliance,
    saveSellerShopCompliance
} from "helpers/fakebackend_helper";

function* getSellerShopCompliances(){
    try {
        const response = yield call(getSellerShopCompliance)

        if(response.status==true) yield put(getShopComplianceSuccess(response.data))
        else yield put(getShopComplianceFail(response.message))
        
    } catch (error) {
        yield put(getShopComplianceFail(error))
    }
    
}

function* saveSellerShopCompliances({ payload: data }){
    try {
        const response = yield call(saveSellerShopCompliance,data)
      
        if(response.status==true) yield put(saveShopComplianceSuccess(response.data))
        else yield put(saveShopComplianceFail(response.message))
        
    } catch (error) {
        yield put(saveShopComplianceFail(error))
    }
    
}

function* getSellerShopVacations(){
    try {
        const response = yield call(getSellerShopVacation)
   
        if(response.status==true) yield put(getShopVacationSuccess(response.data))
        else yield put(getShopVacationFail(response.message))
        
    } catch (error) {
        yield put(getShopVacationFail(error))
    }
    
}

function* setSellerShopVacations(){
    try {
        const response = yield call(setSellerShopVacation)
        if(response.status==true) yield put(setShopVacationSuccess(response.data))
        else yield put(setShopVacationFail(response.message))
        
    } catch (error) {
        yield put(setShopVacationFail(error))
    }
    
}

function* fetchSellerStaffList(){
    try {
        const response = yield call(getSellerMembers)
        if(response.status==true) yield put(getMemberListSuccess(response.data))
        else yield put(getMemberListFail(response.message))
        
    } catch (error) {
        yield put(getMemberListFail(error))
    }
    
}


function* onAddNewStaffList({ payload: data }) {
    try {
        const response = yield call(addNewMemberList, data)
        yield put(addMemberListSuccess(response))
    } catch (error) {
        yield put(addMemberListFail(error))
    }
}

function* onUpdateStaffList({ payload: data }) {

    try {
        const response = yield call(updateMember, data)
        yield put(updateMemberListSuccess(response))
    } catch (error) {
        yield put(updateMemberListFail(error))
    }
}

function* onUpdateStaffStatusList({ payload: data }) {

    try {
        const response = yield call(updateMemberStatus, data)
        yield put(updateMemberStatusSuccess(response))
    } catch (error) {
        yield put(updateMemberStatusFail(error))
    }
}



function* onDeleteStaffList({ payload: data }) {

    try {
        const response = yield call(deleteJobList, data)
        yield put(deleteMemberListSuccess(response))
    } catch (error) {
        yield put(deleteMemberListFail(error))
    }
}

function* staffSaga() {
    yield takeEvery(CHANGE_STATUS_MEMBER,onUpdateStaffStatusList);
    yield takeEvery(GET_SHOP_COMPLIANCE,getSellerShopCompliances);
    yield takeEvery(SHOP_COMPLIANCE,saveSellerShopCompliances);
    yield takeEvery(GET_SHOP_VACATION,getSellerShopVacations);
    yield takeEvery(GET_MEMBER_LIST,fetchSellerStaffList);
    yield takeEvery(SHOP_VECATION,setSellerShopVacations);
    yield takeEvery(ADD_NEW_MEMBER_LIST, onAddNewStaffList);
    yield takeEvery(UPDATE_MEMBER_LIST, onUpdateStaffList);
    yield takeEvery(DELETE_MEMBER_LIST, onDeleteStaffList);
}

export default staffSaga;