import * as yup from 'yup';
import { string } from 'yup';
import _ from 'lodash';
import watchStateForForm from './view.js';

const validator = (fields) => {
  const schema = yup.object().shape({
    currentUrl: string().url().notOneOf(fields.addedUrls),
  });
  return schema.validate(fields, { abortEarly: false })
    .then((data) => data.currentUrl)
    .catch((error) => {
      throw error;
    });
};

function errorHandlers(errMessage) {
  if (_.includes(errMessage, 'currentUrl must be a valid URL')) {
    return 'Ссылка должна быть валидным URL';
  }
  return 'RSS уже существует';
}

export default function validatorForForm(state) {
  const { formState } = state;
  const watchState = watchStateForForm(formState);
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url').trim();
    formState.data.currentUrl = url;
    validator(formState.data)
      .then((validUrl) => {
        watchState.isValid = true;
        formState.data.addedUrls.push(validUrl);
        watchState.error = '';
      }).catch((err) => {
        watchState.isValid = false;
        watchState.error = errorHandlers(err.message);
      });
    form.reset();
  });
}
