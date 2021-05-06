const PH_APP_REDIRECT_URI = 'https://localhost:5500/callback';

// Send link to Product Hunt auth api
function handleAuthorize(req, res) {
    res.json(
        `https://api.producthunt.com/v2/oauth/authorize?client_id=gt32jIkD7Zre3cx3cPQj5E8Pb_VeU_ztD8Yc8XYeLuQ&redirect_uri=${PH_APP_REDIRECT_URI}&response_type=code&scope=public+private`
    );
};

module.exports = handleAuthorize;