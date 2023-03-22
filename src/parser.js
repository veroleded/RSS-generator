import axios from 'axios';
import { uniqueId } from 'lodash';
// https://allorigins.hexlet.app/raw?url=https://example.org/
const proxy = 'https://allorigins.hexlet.app/raw?url=';

// 'https://allorigins.hexlet.app/get?disableCache=true&url='

export default function parser(url) {
  return axios.get(`${proxy}${url}`)
    .then((response) => response.data)
    .then((data) => {
      const DomParser = new DOMParser();
      const parsedRss = DomParser.parseFromString(data, 'application/xhtml+xml');
      if (parsedRss.querySelector('parsererror')) {
        const parserError = new Error('parserError');
        parserError.status = 'invalidRss';
        throw parserError;
      } else {
        const feedTitle = parsedRss.querySelector('title').textContent;
        const feedDescription = parsedRss.querySelector('description').textContent;
        const feed = { feedTitle, feedDescription };
        const items = parsedRss.querySelectorAll('item');
        const posts = [];

        items.forEach((item) => {
          const title = item.querySelector('title').textContent;
          const link = item.querySelector('link').textContent;
          const guid = item.querySelector('guid').textContent;
          const pubDate = item.querySelector('pubDate').textContent;
          const id = uniqueId();
          const post = {
            title,
            link,
            guid,
            pubDate,
            id,
          };

          posts.push(post);
        });
        const postsCounter = posts.length;
        feed.postsCounter = postsCounter;
        return { feed, posts };
      }
    }).catch((err) => {
      throw err.status;
    });
}
