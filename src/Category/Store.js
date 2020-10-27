import { createStore } from 'redux'

const initData = {
    items: [{"category": "食材", "categoryId": 1}],
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
    let items = {
        category: action.category
    }
    let newitem = state.items.slice();
    newitem.push(items);
    return {
        items: newitem,
        mode: 'default'
    };
}

function editReducer(state, action) {

}

function deleteReducer(state, action) {
    let newitem = state.items.slice();
    newitem.splice(action.index, 1);
    return {
        items: newitem,
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