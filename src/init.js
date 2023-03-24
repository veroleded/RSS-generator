export default function initState() {
  const state = {
    formState: {
      sending: 'off',
      isValid: '',
      data: {
        currentUrl: '',
        addedUrls: [],
      },
      feedbackMessage: '',
    },
    uiState: {
      readedPosts: [],
      modal: {
        values: {},
        status: 'hidden',
      },
    },
    feeds: [],
    posts: [],
  };

  return state;
}
