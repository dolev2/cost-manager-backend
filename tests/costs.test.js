const axios = require('axios');

jest.setTimeout(60000);

const COSTS_URL = 'https://cost-manager-costs-9sxp.onrender.com';

test('GET /api/report should return monthly report', async () => {
    const response = await axios.get(
        `${COSTS_URL}/api/report?id=123123&year=2026&month=5`
    );

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('userid');
    expect(response.data).toHaveProperty('year');
    expect(response.data).toHaveProperty('month');
    expect(response.data).toHaveProperty('costs');
});

test('POST /api/add should add new cost', async () => {
    const response = await axios.post(
        `${COSTS_URL}/api/add`,
        {
            userid: 123123,
            description: `jest-test-${Date.now()}`,
            category: 'food',
            sum: 10
        }
    );

    expect(response.status).toBe(201);

    expect(response.data).toHaveProperty('userid', 123123);
    expect(response.data).toHaveProperty('description');
    expect(response.data).toHaveProperty('category', 'food');
    expect(response.data).toHaveProperty('sum', 10);
});