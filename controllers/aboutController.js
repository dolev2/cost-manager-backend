const getAbout = (req, res) => {
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

module.exports = {
    getAbout
};