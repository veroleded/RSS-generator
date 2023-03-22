export default function init() {
  const state = {
    formState: {
      sending: 'on',
      isValid: '',
      data: {
        currentUrl: '',
        addedUrls: [],
      },
      feedbackMessage: '',
    },
    feeds: [],
    posts: [],
  };

  return state;
}
