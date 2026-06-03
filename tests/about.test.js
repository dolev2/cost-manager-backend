const axios = require('axios');

// Increase Jest timeout because Render services may take time to respond
jest.setTimeout(60000);

// Base URL of the About service
const ABOUT_URL = 'https://cost-manager-about-b0va.onrender.com';

/*
 * Test that verifies the About endpoint
 * returns information about the development team.
 */
test('GET /api/about should return developers team', async () => {
    // Send GET request to About endpoint
    const response = await axios.get(`${ABOUT_URL}/api/about`);

    // Verify successful response status
    expect(response.status).toBe(200);

    // Verify response is an array
    expect(Array.isArray(response.data)).toBe(true);

    // Verify array contains at least one team member
    expect(response.data.length).toBeGreaterThan(0);

    // Verify required fields exist
    expect(response.data[0]).toHaveProperty('first_name');
    expect(response.data[0]).toHaveProperty('last_name');
});