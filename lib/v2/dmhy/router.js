module.exports = function (router) {
    // share.dmhy.org
    router.get('/search/:keyword', require('./search'));
};
