
// 自定义全局数据
const state = {
    isLogin: false,
    userInfo: {}
}

const tempState = JSON.parse(JSON.stringify(state));

// 初始化数据 - 持久化
export const initState = () => {
    for (const key in state) {
        const stateVal = state[key];
        const storageVal = wx.getStorageSync(key);
        // 双向同步数据
        if (stateVal !== storageVal) {
            if (!storageVal && storageVal === '') {
                wx.setStorageSync(key, stateVal);
            } else {
                state[key] = storageVal;
            }
        }
    }
}

// 重置数据
export const resetState = () => {
    state = JSON.parse(JSON.stringify(tempState));
    for (const key in state) {
        wx.setStorageSync(key, state[key]);
    }
}

// 获取数据
export const getState = () => { 
    return state
}

// 更新数据
export const updateState = (key, value) => {
    state[key] = value;
    wx.setStorageSync(key, value);
}

const exportObj = {
    initState,
    getState,
    resetState,
    updateState
}

Object.assign(wx, exportObj);

export default exportObj;