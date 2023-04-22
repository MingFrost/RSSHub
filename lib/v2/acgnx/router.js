module.exports = function (router) {
    // share.acgnx.se
    router.get('/search/:keyword', require('./search'));
};
