import parser from './parser.js';
import { watchStateForFeedsAndPosts } from './view.js';

function update(state) {
  const watchedState = watchStateForFeedsAndPosts(state);
  const links = state.formState.data.addedUrls;
  const oldPosts = state.posts;
  const oldPostsTitles = oldPosts.map((post) => post.title);
  const updatedPosts = links.map((link) => parser(link)
    .then(({ posts }) => posts));
  Promise.all(updatedPosts)
    .then((posts) => {
      const newPosts = posts.flat();
      const newPostsTitles = newPosts.map((post) => post.title);
      const uniqNewPostTitles = newPostsTitles
        .filter((title) => !oldPostsTitles.includes(title));
      const uniqNewPosts = newPosts.filter((post) => uniqNewPostTitles.includes(post.title));
      console.log(uniqNewPosts);
      if (uniqNewPosts.length !== 0) {
        watchedState.posts = [...uniqNewPosts, ...state.posts];
        console.log(state.posts);
      }
    }).catch((err) => console.error(err));
}
const delay = 5000;

export default function timingUpdate(state) {
  console.log(1);
  setTimeout(() => {
    update(state);
    timingUpdate(state);
  }, delay);
}
