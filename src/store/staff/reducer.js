import {
    GET_MEMBER_LIST_SUCCESS,
    GET_MEMBER_LIST_FAIL,
    ADD_MEMBER_LIST_SUCCESS,
    ADD_MEMBER_LIST_FAIL,
    UPDATE_MEMBER_LIST_SUCCESS,
    UPDATE_MEMBER_LIST_FAIL,
    DELETE_MEMBER_LIST_SUCCESS,
    DELETE_MEMBER_LIST_FAIL,
    SHOP_VECATION_SUCCESS,
    SHOP_VECATION_FAIL,
    GET_SHOP_VACATION_SUCCESS,
    GET_SHOP_VACATION_FAIL,
    SHOP_COMPLIANCE_SUCCESS,
    SHOP_COMPLIANCE_FAIL,
    GET_SHOP_COMPLIANCE_FAIL,
    GET_SHOP_COMPLIANCE_SUCCESS,
    CHANGE_STATUS_MEMBER_SUCCESS,
    CHANGE_STATUS_MEMBER_FAIL

} from "./actionTypes";

const INIT_STATE = {
    members: [],
    jobs:[],
    error: "",
    jobApply: [],
    vacation:0,
    vacation_error:"",
    complainces:{},
    complainces_error:""

}

const StaffReducer = (state = INIT_STATE, action) => {
   
    switch (action.type) {
        case GET_SHOP_VACATION_SUCCESS:
            return {
                ...state,
                vacation:action.payload
            }
        case GET_SHOP_VACATION_FAIL:
            return {
                ...state,
                vacation_error:action.payload
            }
        case SHOP_VECATION_SUCCESS:
            return {
                ...state,
                vacation:action.payload
            }
        case SHOP_VECATION_FAIL:
            return {
                ...state,
                vacation_error:action.payload
            }
        case GET_MEMBER_LIST_SUCCESS:
            return {
                 ...state,
                 members: action.payload,
            };
        case GET_MEMBER_LIST_FAIL:
            return {
                ...state,
                error: action.payload,
            };   

        case ADD_MEMBER_LIST_SUCCESS:           
            return {
                ...state,
                members: [...state.members, action.payload],
            };

        case ADD_MEMBER_LIST_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case UPDATE_MEMBER_LIST_SUCCESS:
            return {
                ...state,
                members: state.members.map(member =>
                    member.id == action.payload.id
                        ? { member, ...action.payload }
                        : member
                ),
            };

        case UPDATE_MEMBER_LIST_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case DELETE_MEMBER_LIST_SUCCESS:
            return {
                ...state,
                members: state.members.filter(
                    member => member.id.toString() !== action.payload.toString()
                ),
            };
        case CHANGE_STATUS_MEMBER_SUCCESS:
            return {
            ...state,
            members:state.members
            }
        case CHANGE_STATUS_MEMBER_FAIL:
            return {
            ...state,
            error: action.payload,
            }

        case DELETE_MEMBER_LIST_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case SHOP_COMPLIANCE_SUCCESS:
            return {
                ...state,
                complainces:action.payload
            }
        case SHOP_COMPLIANCE_FAIL:
            return {
                ...state,
                complainces_error: action.payload,
            };
        case GET_SHOP_COMPLIANCE_FAIL:
            return {
                ...state,
                complainces_error: action.payload,
            };
        case GET_SHOP_COMPLIANCE_SUCCESS:   
        return {
            ...state,
            complainces:action.payload
        }

        default:
            return state
    }
}

export default StaffReducer;