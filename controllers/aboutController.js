/*
 * Returns information about the development team members.
 */
const getAbout = (req, res) => {
    // Send team members details as JSON response
    res.json([
        {
            first_name: 'Dolev',
            last_name: 'Revivo'
        },
        {
            first_name: 'omri',
            last_name: 'paz'
        }
    ]);
};

// Export controller function
module.exports = {
    getAbout
};