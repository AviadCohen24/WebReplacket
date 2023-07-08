import { SEND_PACKETS_TYPES } from "./sendPackets.types";

const SEND_PACKETS_INITIAL_STATE = {
    progressValue: 0,
    maxProgressValue: 0,
    file: '',
    nic: null
}

export const sendPacketsReducer = (state = SEND_PACKETS_INITIAL_STATE, action = {}) => {
    const { type, payload } = action;

    switch(type){
        case SEND_PACKETS_TYPES.SET_MAX_PROGRESS_VALUE:
            return {
                ...state,
                maxProgressValue: payload,
            }
        case SEND_PACKETS_TYPES.UPDATE_PROGRESS_VALUE:
            return {
                ...state,
                progressValue: payload,
            }
        case SEND_PACKETS_TYPES.SET_FILE:
            return {
                ...state,
                file: payload,
            }
        case SEND_PACKETS_TYPES.SET_NIC:
            return {
                ...state,
                nic: payload
            }
        default:
            return state;
    }
}