import { createSelector } from 'reselect'

const selectSendPacketReducer = state => state.packetSender;

export const selectProgressValue = createSelector(
    [selectSendPacketReducer],
    (sender) => sender.progressValue
)

export const selectFilePath = createSelector(
    [selectSendPacketReducer],
    (sender) => sender.filePath
)

export const selectNIC = createSelector(
    [selectSendPacketReducer],
    (sender) => sender.nic
)