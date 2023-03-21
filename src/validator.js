import * as yup from 'yup';
import { string } from 'yup';
import i18next from 'i18next';
import watchStateForForm from './view.js';
import resources from './local/index.js';

const i18nInstance = i18next.createInstance();
i18nInstance.init({
  lng: 'ru',
  debug: false,
  resources,
});

const validator = (fields) => {
  yup.setLocale({
    mixed: {
      notOneOf: () => 'alreadyExist',
    },
    string: {
      url: () => 'invalid',
    },
  });
  const schema = yup.object().shape({
    currentUrl: string().url().notOneOf(fields.addedUrls),
  });
  return schema.validate(fields, { abortEarly: false })
    .then((data) => data.currentUrl)
    .catch((error) => {
      throw error;
    });
};
// console.log(await validator({ currentUrl: 'aasd', addedUrls: [''] }));

export default function validatorForForm(state) {
  const { formState } = state;
  const watchedState = watchStateForForm(formState);
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url').trim();
    formState.data.currentUrl = url;
    validator(formState.data)
      .then((validUrl) => {
        watchedState.isValid = true;
        formState.data.addedUrls.push(validUrl);
        watchedState.error = '';
      }).catch((err) => {
        watchedState.isValid = false;
        watchedState.error = i18nInstance.t(err.message);
      });
    form.reset();
  });
}
