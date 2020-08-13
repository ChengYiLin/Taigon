import axios from 'axios';
import adapter from 'axios/lib/adapters/http';

test("Test API", () => {
    return axios({
        method: 'get',
        baseURL: 'http://localhost:8000',
        url: '/api/roomcategory/',
        headers: {
            'content-type': 'application/json'
        },
        adapter
    })
        .then((response) => {
            expect(response.data).toBeDefined();
            expect(response.data.length).toBeGreaterThan(0);
            expect(response.data.length).toBe(8);
            expect(response.data[0]).toHaveProperty("id");
            expect(response.data[0]).toHaveProperty("value");
            expect(response.data).toEqual([
                {
                    "id": 1,
                    "value": "興趣"
                },
                {
                    "id": 2,
                    "value": "科技"
                },
                {
                    "id": 3,
                    "value": "寵物"
                },
                {
                    "id": 4,
                    "value": "運動"
                },
                {
                    "id": 5,
                    "value": "旅遊"
                },
                {
                    "id": 6,
                    "value": "學習"
                },
                {
                    "id": 7,
                    "value": "娛樂"
                },
                {
                    "id": 8,
                    "value": "美食"
                }
            ]);
        });
});