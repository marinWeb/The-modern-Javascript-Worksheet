const bookmarkNameElem = document.querySelector('#bookmarkName');
const bookmarkUrlElem = document.querySelector('#bookmarkURL');
const submitBtn = document.querySelector('#submtBtn');

submitBtn.addEventListener('click', onSubmitClick);

function onSubmitClick(e) {
  const bookmarkName = bookmarkNameElem.value;
  const bookmarkUrl = bookmarkUrlElem.value;
  const bookmarkId = storeBookmark(bookmarkName, bookmarkUrl);
  createBookmark(bookmarkName, bookmarkUrl, bookmarkId);
}

function createBookmark(name, url, id) {
  const bookmarkTemplate = `
        <label> ${name}</label>
        <a href = '${url}' target = '_blank'>Visit</a>
        <button class='btn btn-danger'>Delete</button>
    `;
  const bookmarkDiv = document.createElement('div');
  bookmarkDiv.classList.add('bookmarkItm');
  const bookmarkId = 'bmDiv' + id;
  bookmarkDiv.setAttribute('id', bookmarkId);
  bookmarkDiv.innerHTML = bookmarkTemplate;

  document.querySelector('#bookmarks').appendChild(bookmarkDiv);

  document
    .querySelector('#' + bookmarkId + ' >button')
    .addEventListener('click', onDeleteClick);
}

function checkValidations() {
  var errorMsg;
  if (!bookmarkNameElem.value) {
    errorMsg = 'Please provide valid bookmark name.';
  }

  if (!bookmarkUrlElem.value) {
    errorMsg = 'Please provide valid bookmark URL.';
  }
}

function storeBookmark(urlName, url) {
  var localStorageLength = localStorage.length;
  var urlObj = JSON.stringify({
    name: urlName,
    url: url,
    isBookmark: true,
  });
  localStorage.setItem(++localStorageLength, urlObj);
  return localStorageLength;
}
function getBookmarks() {
  const localStorageLength = localStorage.length;
  let storageItm;
  for (let i = 0; i <= localStorageLength; i++) {
    storageItm = localStorage.getItem(i);
    if (storageItm) {
      storageItm = JSON.parse(storageItm);
      if (storageItm.isBookmark) {
        createBookmark(storageItm.name, storageItm.url, i);
      }
    }
  }
}

function onDeleteClick(e) {
  console.log('in delete click');
  const nodeToRemove = e.currentTarget.parentElement;
  console.log(nodeToRemove.id.slice(5));
  localStorage.removeItem(nodeToRemove.id.slice(5));
  document.querySelector('#bookmarks').removeChild(nodeToRemove);
}

getBookmarks();
