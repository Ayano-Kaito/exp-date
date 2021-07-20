import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = {
  initMock: () => {
    // inject mock
    const mock = new MockAdapter(axios);

    // ===== mock for '/api/categories' ===== //
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

    mock.onPost("/api/categories").reply(201, {categoryId: 4});

    mock.onPut("/api/categories").reply(200, {categoryId: 1});

    mock.onDelete("/api/categories").reply(200);

    // ===== mock for '/api/items' ===== //
    const items = {
      "categoryName": "食材",
      "categoryId": 1,
      "totalResults": 2, // 全件数
      "items": [
        {
          "itemName": "たまご",
          "itemId": 1,
          "stock": 10,
          "limitDate": "2020-06-30",
          "imagePath": "src/mock/egg.png",
          "remark": "1つ割れているからそれから使うこと"
        },
        {
          "itemName": "トマト",
          "itemId": 2,
          "stock": 5,
          "limitDate": "2021-05-30",
          "imagePath": "",
          "remark": ""
        }
      ]
    }
    mock.onGet("/api/items").reply(200, items);

    mock.onPost("/api/items").reply(201, {categoryId: 1, itemId: 3});

    mock.onPut("/api/items").reply(200, {categoryId: 1, itemId: 2});

    mock.onDelete("/api/items").reply(200);
  }
}
export default mock;
