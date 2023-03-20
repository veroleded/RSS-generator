export default function init() {
  const state = {
    formState: {
      isValid: true,
      data: {
        currentUrl: '',
        addedUrls: [],
      },
      error: '',
    },
  };

  return state;
}
