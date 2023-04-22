const got = require('@/utils/got'); // 自订的 got
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

const baseUrl = 'https://share.acgnx.se';

module.exports = async (ctx) => {
    const { keyword } = ctx.params;
    const response = await got(`${baseUrl}/rss.xml?keyword=${keyword}`);

    const $ = cheerio.load(response.data, {
        xmlMode: true
    });

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