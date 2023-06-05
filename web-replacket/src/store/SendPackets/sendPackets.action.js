import { SEND_PACKETS_TYPES } from "./sendPackets.types";
import { createAction } from '../../utils/reducer/reducer.utils'

export const setFilePath = (path) => createAction(SEND_PACKETS_TYPES.SET_FILE_PATH, path);

export const setProgressValue = (newValue) => createAction(SEND_PACKETS_TYPES.UPDATE_PROGRESS_VALUE, newValue);

export const setNIC = (nic) => createAction(SEND_PACKETS_TYPES.SET_NIC, nic);