import axios from 'axios';
import axiosMockAdapter from 'axios-mock-adapter';

const mock = new axiosMockAdapter(axios);

const category = [
    {
        "categoryId": 1,
        "category": "食材"
    },
    {
        "categoryId": 2,
        "category": "調味料"
    },
    {
        "categoryId": 3,
        "category": "冷凍食品"
    }
]

mock.onGet("/api/categories").reply(200, category);

mock.onPost("/api/categories", { params: {category: "飲み物"} }).reply(201, {categoryId: 4});

mock.onPut("/api/categories", { params: {categoryId: 4, category: "飲み物"} }).reply(200, {categoryId: 4});

mock.onDelete("/api/categories", { params: {categoryId: 1} }).reply(200);
