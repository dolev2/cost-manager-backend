const axios = require('axios');

jest.setTimeout(60000);

const LOGS_URL = 'https://cost-manager-logs-wq2t.onrender.com';

test('GET /api/logs should return logs list', async () => {
    const response = await axios.get(`${LOGS_URL}/api/logs`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
});