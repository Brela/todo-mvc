// this function is triggered from home.js
module.exports = {
    getIndex: (req, res) => {
        // then serves up the index.html which contains the root for the react app
        res.sendFile(path.join(__dirname, 'client/public/index.html'));
    }
};
