const axios = require('axios');

// Increase Jest timeout because cloud services may respond slowly
jest.setTimeout(60000);

// Base URL of the Users service
const USERS_URL = 'https://cost-manager-users-b8o6.onrender.com';

/*
 * Test that verifies the users endpoint
 * returns a list of users.
 */
test('GET /api/users should return users list', async () => {
    // Send GET request to retrieve all users
    const response = await axios.get(`${USERS_URL}/api/users`);

    // Verify successful response status
    expect(response.status).toBe(200);

    // Verify response is an array
    expect(Array.isArray(response.data)).toBe(true);
});

/*
 * Test that verifies a specific user
 * can be retrieved by ID.
 */
test('GET /api/users/123123 should return specific user details', async () => {
    // Send GET request for a specific user
    const response = await axios.get(`${USERS_URL}/api/users/123123`);

    // Verify successful response status
    expect(response.status).toBe(200);

    // Verify required user properties exist
    expect(response.data).toHaveProperty('first_name');
    expect(response.data).toHaveProperty('last_name');
    expect(response.data).toHaveProperty('id', 123123);
    expect(response.data).toHaveProperty('total');
});