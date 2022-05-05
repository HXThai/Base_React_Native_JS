import ActionTypes from '../actionstypes'

export const openXNav = payload => ({
    type: ActionTypes.OPEN_NAV,
    payload
})

export const closeXNav = payload => ({
    type: ActionTypes.CLOSE_NAV,
    payload
})