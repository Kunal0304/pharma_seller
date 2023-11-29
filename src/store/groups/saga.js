import { call, put, takeEvery } from "redux-saga/effects"

import { GET_GROUP_LIST, ADD_NEW_GROUP_LIST, UPDATE_GROUP_LIST, DELETE_GROUP_LIST} from "./actionTypes";
import {
    getGroupListSuccess,
    getGroupListFail,
    addGroupListSuccess,
    addGroupListFail,
    updateGroupListSuccess,
    updateGroupListFail,
    deleteGroupListSuccess,
    deleteGroupListFail,
} from "./actions"

import {
    updateGroup,
    getSellerGroups,
    addNewGroupList,
    updateJobList,
    deleteJobList,
} from "helpers/fakebackend_helper";

function* fetchSellerGroupsList(){
    try {
        const response = yield call(getSellerGroups)
        if(response.status==true) yield put(getGroupListSuccess(response.data))
        else yield put(getGroupListFail(response.message))
        
    } catch (error) {
        yield put(getGroupListFail(error))
    }
    
}


function* onAddNewGroupList({ payload: data }) {
    try {
        const response = yield call(addNewGroupList, data)
        yield put(addGroupListSuccess(response.data))
    } catch (error) {
        yield put(addGroupListFail(error))
    }
}

function* onUpdateGroupList({ payload: data }) {
    try {
        const response = yield call(updateGroup, data)

        yield put(updateGroupListSuccess(response))
        
    } catch (error) {
        yield put(updateGroupListFail(error))
    }
}

function* onDeleteGroupList({ payload: data }) {

    try {
        const response = yield call(deleteJobList, data)
        yield put(deleteGroupListSuccess(response))
    } catch (error) {
        yield put(deleteGroupListFail(error))
    }
}



function* groupsSaga() {
    yield takeEvery(GET_GROUP_LIST,fetchSellerGroupsList);
    yield takeEvery(ADD_NEW_GROUP_LIST, onAddNewGroupList)
    yield takeEvery(UPDATE_GROUP_LIST, onUpdateGroupList)
    yield takeEvery(DELETE_GROUP_LIST, onDeleteGroupList)
}

export default groupsSaga;