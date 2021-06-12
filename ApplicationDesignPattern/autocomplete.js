const createAutoComplete = ({
  root,
  renderOptions,
  onOptionSelect,
  inputValue,
  fetchData,
}) => {
  root.innerHTML = `
<input id='searchtxt' class='input' />
    <div class = 'dropdown'>
        <div class='dropdown-menu'>
            <div class="dropdown-content results"></div>
        </div>
    </div>
`;

  const searchInpt = root.querySelector('#searchtxt');
  const dropdown = root.querySelector('.dropdown');
  const resultWrapper = root.querySelector('.results');

  const onInput = async (e) => {
    const items = await fetchData(e.target.value);
    dropdown.classList.add('is-active');
    //   console.log(items);
    resultWrapper.innerHTML = '';
    for (let item of items) {
      const option = document.createElement('a');

      option.classList.add('dropdown-item');

      option.innerHTML = renderOptions(item);

      option.addEventListener('click', () => {
        dropdown.classList.remove('is-active');
        searchInpt.value = inputValue(item);

        onOptionSelect(item);
      });
      resultWrapper.appendChild(option);
    }
  };
  searchInpt.addEventListener('input', debounce(onInput, 500));

  document.addEventListener('click', (e) => {
    if (!root.contains(e.target)) {
      dropdown.classList.remove('is-active');
    }
  });
};
