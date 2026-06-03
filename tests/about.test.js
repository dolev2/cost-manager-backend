const axios = require('axios');

jest.setTimeout(60000);

const ABOUT_URL = 'https://cost-manager-about-b0va.onrender.com';

test('GET /api/about should return developers team', async () => {
    const response = await axios.get(`${ABOUT_URL}/api/about`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThan(0);
    expect(response.data[0]).toHaveProperty('first_name');
    expect(response.data[0]).toHaveProperty('last_name');
});