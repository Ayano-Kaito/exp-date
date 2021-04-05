import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const itemMock = {
    initMock: () => {
        // inject mock
        const mock = new MockAdapter(axios);

        const items = {
          "categoryName": "食材",
          "categoryId": 1,
          "totalResults": 2,
          "results": 20,
          "offset": 0,
          "items": [
            {
              "itemName": "たまご",
              "itemId": 1,
              "stock": 10,
              "limitDate": "2020-06-30",
              "imagePath": "https://hogehoge/sample.jpg",
              "remark": "1つ割れているからそれから使うこと"
            },
            {
              "itemName": "トマト",
              "itemId": 2,
              "stock": 5,
              "limitDate": "",
              "image": "",
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
export default itemMock;
