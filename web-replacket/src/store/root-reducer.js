import { combineReducers } from "redux";

import { sendPacketsReducer } from "./SendPackets/sendPackets.reducer";

export const rootReducer = combineReducers({
    packetSender: sendPacketsReducer,
}) 