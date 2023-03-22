import * as yup from 'yup';
import { string } from 'yup';

export default function formValidator(fields) {
  yup.setLocale({
    mixed: {
      notOneOf: () => 'alreadyExist',
    },
    string: {
      url: () => 'invalidUrl',
    },
  });
  const schema = yup.object().shape({
    currentUrl: string().url().notOneOf(fields.addedUrls),
  });
  return schema.validate(fields, { abortEarly: false })
    .then((data) => data.currentUrl)
    .catch((error) => {
      // console.log(error.errors);
      throw error.message;
    });
}
