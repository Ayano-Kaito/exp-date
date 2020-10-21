import { createStore } from 'redux'

const initData = {
    data: [],
    message: '',
    mode: 'default'
};
// レデューサー
export function categoryReducer(state = initData, action) {
    switch (action.type) {
        case 'ADD' :
            return addReducer(state, action);

        case 'EDIT' :
            return editReducer(state, action);

        case 'DELETE':
            return deleteReducer(state, action);

        default:
            return state;
    }
}

function addReducer(state, action) {
    let data = action
    let newdata = state.data.slice();
    newdata.push(data);
    return {
        date: newdata,
        mode: 'default'
    };
}

function editReducer(state, action) {

}

function deleteReducer(state, action) {
    let newdata = state.data.slice();
    newdata.splice(action.index, 1);
    return {
        data: newdata,
        mode: 'default'
    };
}
// アクションクリエーター
export function addCategory(text) {
    return {
        type: 'ADD',
        data: text
    }
}

export function editCategory(num) {
    return {
        type: 'EDIT',
        index: num
    }
}

export function deleteCategory(num) {
    return {
        type: 'DELETE',
        index: num
    }
}

export default createStore(categoryReducer);