import i18next from 'i18next';
import { watchStateForForm, watchStateForFeedsAndPosts, watchUiState } from './view.js';
import formValidator from './validator.js';
import resources from './local/index.js';
import parser from './parser.js';
import timingUpdate from './postupdate.js';
import initState from './init.js';

const i18nInstance = i18next.createInstance();
i18nInstance.init({
  lng: 'ru',
  debug: false,
  resources,
});

export default function app() {
  const state = initState();
  const { formState } = state;
  const watchedStateForm = watchStateForForm(formState);
  const wacthedStateFeedsAndPosts = watchStateForFeedsAndPosts(state);
  const watchedUiState = watchUiState(state.uiState);
  const form = document.querySelector('form');
  const postsContainer = document.querySelector('.posts');

  const modalContainer = document.querySelector('.modal');
  const closeButtonMain = modalContainer.querySelector('.modal-footer').querySelector('button');
  const closeButton = modalContainer.querySelector('.modal-header').querySelector('button');

  closeButtonMain.addEventListener('click', () => {
    watchedUiState.modal.status = 'hidden';
  });

  closeButton.addEventListener('click', () => {
    watchedUiState.modal.status = 'hidden';
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url').trim();

    formState.data.currentUrl = url;
    watchedStateForm.sending = 'on';

    formValidator(formState.data)
      .then((validUrl) => parser(validUrl))
      .then(({ feed, posts }) => {
        formState.data.addedUrls.push(url);
        wacthedStateFeedsAndPosts.feeds = [feed, ...state.feeds];
        wacthedStateFeedsAndPosts.posts = [...posts, ...state.posts];
        watchedStateForm.sending = 'off';
        watchedStateForm.isValid = true;
        watchedStateForm.feedbackMessage = i18nInstance.t('validRss');
      }).catch((err) => {
        watchedStateForm.sending = 'off';
        watchedStateForm.isValid = false;
        watchedStateForm.feedbackMessage = i18nInstance.t(err);
      });
    form.reset();
  });

  timingUpdate(state);

  postsContainer.addEventListener('click', (event) => {
    if (event.target.hasAttribute('data-id')) {
      const { id } = event.target.dataset;
      watchedUiState.readedPosts.push(id);

      if (event.target.tagName === 'BUTTON') {
        const valueForModal = state.posts.find((post) => post.id === id);
        watchedUiState.modal.values = valueForModal;
        watchedUiState.modal.status = 'shown';
      }
    }
  });
}
