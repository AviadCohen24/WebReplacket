import { createSelector } from 'reselect'

const selectSendPacketReducer = state => state.packetSender;

export const selectProgressValue = createSelector(
    [selectSendPacketReducer],
    (sender) => sender.progressValue
)

export const selectFile = createSelector(
    [selectSendPacketReducer],
    (sender) => sender.file
)

export const selectFileName = createSelector(
    [selectFile],
    (file) => file.name
)


export const selectNIC = createSelector(
    [selectSendPacketReducer],
    (sender) => sender.nic
)