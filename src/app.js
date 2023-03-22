import i18next from 'i18next';
import { watchStateForForm, feedsRender, postsRender } from './view.js';
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
  const watchedState = watchStateForForm(formState);
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url').trim();
    formState.data.currentUrl = url;
    formValidator(formState.data)
      .then((validUrl) => {
        watchedState.sending = 'on';
        return parser(validUrl);
      })
      .then(({ feed, posts }) => {
        state.feeds.push(feed);
        state.posts.push(...posts);
        watchedState.sending = 'off';
        watchedState.isValid = true;
        formState.data.addedUrls.push(url);
        watchedState.feedbackMessage = i18nInstance.t('validRss');
        feedsRender(state);
        postsRender(state);
        console.log(state);
      }).catch((err) => {
        watchedState.sending = 'off';
        watchedState.isValid = false;
        watchedState.feedbackMessage = i18nInstance.t(err);
      });
    form.reset();
  });
}
