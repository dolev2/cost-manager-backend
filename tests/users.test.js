const axios = require('axios');

jest.setTimeout(60000);

const USERS_URL = 'https://cost-manager-users-b8o6.onrender.com';

test('GET /api/users should return users list', async () => {
    const response = await axios.get(`${USERS_URL}/api/users`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
});

test('GET /api/users/123123 should return specific user details', async () => {
    const response = await axios.get(`${USERS_URL}/api/users/123123`);

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('first_name');
    expect(response.data).toHaveProperty('last_name');
    expect(response.data).toHaveProperty('id', 123123);
    expect(response.data).toHaveProperty('total');
});