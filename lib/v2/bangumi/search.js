const got = require('@/utils/got');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {
    const rootUrl = 'https://bangumi.moe';
    const { keyword } = ctx.params;

    let response;

    const apiUrl = `${rootUrl}/rss/search/${keyword}`;

    response = await got({
        method: 'get',
        url: apiUrl,
    });
    console.log(response.data);

    const items = $('item')
    .toArray()
    .map((item) => {
        item = $(item);
        return {
            title: item.find('title').text(),
            link: item.find('link').text(),
            description: item.find('description').text(),
            enclosure_url: item.find('enclosure').attr('url'),
            enclosure_type: 'application/x-bittorrent',
            pubDate: parseDate(item.find('pubDate').text())
        };
    });

    ctx.state.data = {
        title: $('channel').find('title').first().text(),
        link: $('channel').find('link').first().text(),
        item: items,
    };
};
