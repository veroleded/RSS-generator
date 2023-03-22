import onChange from 'on-change';

export const watchStateForForm = (state) => onChange(state, (path, value) => {
  const inputClassList = document.querySelector('#url-input').classList;
  const feedback = document.querySelector('.feedback');
  const submitButton = document.querySelector('[type="submit"');
  switch (path) {
    case 'isValid':
      if (value) {
        console.log(123);
        inputClassList.remove('is-invalid');
        feedback.classList.remove('text-danger');
        feedback.classList.add('text-success');
      } else {
        console.log('321');
        inputClassList.add('is-invalid');
        feedback.classList.replace('text-success', 'text-danger');
      }
      break;

    case 'feedbackMessage':
      feedback.textContent = value;
      break;

    case 'sending':
      if (value === 'on') {
        submitButton.disabled = true;
      } else {
        submitButton.disabled = false;
      }
      break;

    default:
      throw new Error();
  }
});

export const feedsRender = (state) => {
  const feedsContainer = document.querySelector('.feeds');
  feedsContainer.childNodes.forEach((el) => el.remove());

  const allDiv = document.createElement('div');
  allDiv.classList.add('card', 'border-0');

  const divForTitle = document.createElement('div');
  divForTitle.classList.add('card-body');

  const titleForFeeds = document.createElement('h2');
  titleForFeeds.classList.add('card-title', 'h3');
  titleForFeeds.textContent = 'Фиды';

  const ol = document.createElement('ol');
  ol.classList.add('list-group');

  state.feeds.forEach((feed) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'shadow');

    const div = document.createElement('div');
    div.classList.add('ms-2', 'me-auto');

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('fw-bold');
    titleDiv.textContent = feed.feedTitle;

    const description = document.createTextNode(feed.feedDescription);

    const span = document.createElement('span');
    span.classList.add('badge', 'bg-primary', 'rounded-pill');
    span.textContent = `отслеживаеся: ${feed.postsCounter}`;

    div.append(titleDiv, description);
    li.append(div, span);
    ol.append(li);
  });

  divForTitle.append(titleForFeeds);
  allDiv.append(divForTitle, ol);
  feedsContainer.append(allDiv);
};

export const postsRender = (state) => {
  const postContainer = document.querySelector('.posts');
  postContainer.childNodes.forEach((el) => el.remove());

  const allDiv = document.createElement('div');
  allDiv.classList.add('card', 'border-0');

  const divForTitle = document.createElement('div');
  divForTitle.classList.add('card-body');

  const titleForPosts = document.createElement('h2');
  titleForPosts.classList.add('card-title', 'h3');
  titleForPosts.textContent = 'Посты';

  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');

  state.posts.forEach((post) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'justify-content-between', 'd-flex', 'shadow'); // ,'d-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0'

    const a = document.createElement('a');
    a.setAttribute('href', post.link);
    a.setAttribute('data-id', post.id);
    a.setAttribute('target', '_blank');
    a.className = 'fw-bold';
    a.textContent = post.title;

    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('data-id', post.id);
    button.setAttribute('data-bs-target', '#modal');
    button.setAttribute('data-bs-toggle', 'modal');
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.textContent = 'Просмотр';

    li.append(a, button);
    ul.append(li);
  });

  divForTitle.append(titleForPosts);
  allDiv.append(divForTitle, ul);
  postContainer.append(allDiv);
};
// const watchStateForFeedsAndPosts = (state) => onChange(state, (path, value) => {

// });
