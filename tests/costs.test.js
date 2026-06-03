const axios = require('axios');

// Increase Jest timeout because cloud services may respond slowly
jest.setTimeout(60000);

// Base URL of the Costs service
const COSTS_URL = 'https://cost-manager-costs-9sxp.onrender.com';

/*
 * Test that verifies the report endpoint
 * returns a valid monthly report structure.
 */
test('GET /api/report should return monthly report', async () => {
    // Send request for a monthly report
    const response = await axios.get(
        `${COSTS_URL}/api/report?id=123123&year=2026&month=5`
    );

    // Verify successful response status
    expect(response.status).toBe(200);

    // Verify required report properties exist
    expect(response.data).toHaveProperty('userid');
    expect(response.data).toHaveProperty('year');
    expect(response.data).toHaveProperty('month');
    expect(response.data).toHaveProperty('costs');
});

/*
 * Test that verifies a new cost item
 * can be successfully added to the system.
 */
test('POST /api/add should add new cost', async () => {
    // Send request to create a new cost item
    const response = await axios.post(
        `${COSTS_URL}/api/add`,
        {
            userid: 123123,
            description: `jest-test-${Date.now()}`,
            category: 'food',
            sum: 10
        }
    );

    // Verify cost was created successfully
    expect(response.status).toBe(201);

    // Verify returned cost data
    expect(response.data).toHaveProperty('userid', 123123);
    expect(response.data).toHaveProperty('description');
    expect(response.data).toHaveProperty('category', 'food');
    expect(response.data).toHaveProperty('sum', 10);
});