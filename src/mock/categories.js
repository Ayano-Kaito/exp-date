import axios from 'axios';
import axiosMockAdapter from 'axios-mock-adapter';

const mock = new axiosMockAdapter(axios);

const categories = [
    {
        "categoryId": 1,
        "categoryName": "食材"
    },
    {
        "categoryId": 2,
        "categoryName": "調味料"
    },
    {
        "categoryId": 3,
        "categoryName": "冷凍食品"
    }
]

mock.onGet("/api/categories").reply(200, categories);

mock.onPost("/api/categories", { params: {categoryName: "飲み物"} }).reply(201, {categoryId: 4});

mock.onPut("/api/categories", { params: {categoryId: 4, categoryName: "飲み物"} }).reply(200, {categoryId: 4});

mock.onDelete("/api/categories", { params: {categoryId: 1} }).reply(200);
