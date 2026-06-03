const axios = require('axios');

// Increase Jest timeout because cloud services may respond slowly
jest.setTimeout(60000);

// Base URL of the Logs service
const LOGS_URL = 'https://cost-manager-logs-wq2t.onrender.com';

/*
 * Test that verifies the logs endpoint
 * returns a list of log entries.
 */
test('GET /api/logs should return logs list', async () => {
    // Send GET request to the logs endpoint
    const response = await axios.get(`${LOGS_URL}/api/logs`);

    // Verify successful response status
    expect(response.status).toBe(200);

    // Verify response is an array of logs
    expect(Array.isArray(response.data)).toBe(true);
});