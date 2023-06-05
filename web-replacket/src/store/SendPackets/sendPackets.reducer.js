import { SEND_PACKETS_TYPES } from "./sendPackets.types";

const SEND_PACKETS_INITIAL_STATE = {
    progressValue: 0,
    filePath: '',
    nic: null
}

export const sendPacketsReducer = (state = SEND_PACKETS_INITIAL_STATE, action = {}) => {
    const { type, payload } = action;

    switch(type){
        case SEND_PACKETS_TYPES.UPDATE_PROGRESS_VALUE:
            return {
                ...state,
                progressValue: payload,
            }
        case SEND_PACKETS_TYPES.SET_FILE_PATH:
            return {
                ...state,
                filePath: payload,
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