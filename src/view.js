import onChange from 'on-change';

const mapping = {
  isValid: (value) => {
    const inputClassList = document.querySelector('#url-input').classList;
    if (value) {
      inputClassList.remove('is-invalid');
    } else {
      inputClassList.add('is-invalid');
    }
  },
  error: (value) => {
    const feedback = document.querySelector('.feedback');
    feedback.textContent = value;
  },
};

const watchStateForForm = (state) => onChange(state, (path, value) => {
  mapping[path](value);
});

export default watchStateForForm;
