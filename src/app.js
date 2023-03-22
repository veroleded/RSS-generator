import i18next from 'i18next';
import { watchStateForForm, watchStateForFeedsAndPosts } from './view.js';
import formValidator from './validator.js';
import resources from './local/index.js';
import parser from './parser.js';

const i18nInstance = i18next.createInstance();
i18nInstance.init({
  lng: 'ru',
  debug: false,
  resources,
});

export default function app(state) {
  const { formState } = state;
  const watchedStateForm = watchStateForForm(formState);
  const wacthedStateFeedsAndPosts = watchStateForFeedsAndPosts(state);
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url').trim();
    formState.data.currentUrl = url;
    formValidator(formState.data)
      .then((validUrl) => {
        watchedStateForm.sending = 'on';
        return parser(validUrl);
      })
      .then(({ feed, posts }) => {
        formState.data.addedUrls.push(url);
        wacthedStateFeedsAndPosts.feeds = [feed, ...state.feeds];
        wacthedStateFeedsAndPosts.posts = [...posts, ...state.posts];
        // state.feeds.push(feed);
        // state.posts.push(...posts);
        watchedStateForm.sending = 'off';
        watchedStateForm.isValid = true;
        watchedStateForm.feedbackMessage = i18nInstance.t('validRss');
        // feedsRender(state);
        // postsRender(state);
      }).catch((err) => {
        watchedStateForm.sending = 'off';
        watchedStateForm.isValid = false;
        watchedStateForm.feedbackMessage = i18nInstance.t(err);
      });
    form.reset();
  });
}
