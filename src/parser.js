import axios from 'axios';
import { uniqueId } from 'lodash';

const constructUrl = (link) => {
  const newUrl = new URL('https://allorigins.hexlet.app/get');
  newUrl.searchParams.set('disableCache', 'true');
  newUrl.searchParams.set('url', link);
  return newUrl;
};

export default function parser(url) {
  return axios.get(constructUrl(url))
    .then((response) => response.data)
    .then((data) => {
      const DomParser = new DOMParser();
      const parsedRss = DomParser.parseFromString(data.contents, 'application/xml');
      if (parsedRss.querySelector('parsererror')) {
        throw new Error('invalidRss');
      } else {
        const feedTitle = parsedRss.querySelector('title').textContent;
        const feedDescription = parsedRss.querySelector('description').textContent;
        const feed = { feedTitle, feedDescription };
        const items = parsedRss.querySelectorAll('item');
        const posts = [];

        items.forEach((item) => {
          const title = item.querySelector('title').textContent;
          const link = item.querySelector('link').textContent;
          const description = item.querySelector('description').textContent;
          const pubDate = item.querySelector('pubDate').textContent;
          const id = uniqueId();
          const post = {
            title,
            link,
            description,
            pubDate,
            id,
          };

          posts.push(post);
        });
        return { feed, posts };
      }
    }).catch((err) => {
      const error = err.message === 'invalidRss' ? new Error('invalidRss') : new Error('networkError');
      throw error.message;
    });
}
