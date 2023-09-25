const closeModalBtn = document.querySelector('.modal__close');
const modal = document.querySelector('.modal');
const modalImage = document.querySelector('.modal__image');
const modalTitle = document.querySelector('.modal__info-title > h1');
const modalDescription = document.querySelector('.modal__info-description > p');
const modalLink = document.querySelector('.modal__info-button');
const container = document.querySelector('.container__marker');
const btnSearch = document.querySelector('.search__btn');
const search = document.querySelector('.search');
const select = document.querySelector('.custom-select');
const regionIds = {
  1: 'Кировский',
  2: 'Кличевский',
  3: 'Осиповичский',
  4: 'Бобруйский',
  5: 'Паричский',
  6: 'Глусский',
  7: 'Октябрьский',
  8: 'Стародорожский',
  9: 'Любанский',
  10: 'Старобинский',
  11: 'Краснослободский',
  12: 'Слуцкий',
  13: 'Гресский',
  14: 'Копыльский',
};

createOptionsSelect(regionIds);

createMarker(villages);

modal.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal') || e.target.classList.contains('modal__close')) {
    if (modal.classList.contains('show')) {
      modal.classList.remove('show');
      modal.classList.add('hide');
    }
    modal.classList.add('hide');
  }
});

window.addEventListener('keydown', (e) => {
  if (e.keyCode === 27) {
    e.preventDefault();
    modal.classList.add('hide');
  }
});

document.addEventListener('click', (e) => {
  if (e.target.tagName === 'DIV') {
    const targetId = e.target.getAttribute('data-id');
    const item = villages.filter((village) => village.id === +targetId);
    modalImage.style.backgroundImage = `url(${item[0].img})`;
    modalImage.style.backgroundSize = 'cover';
    modalImage.style.backgroundRepeat = 'no-repeat';
    modalImage.style.backgroundPosition = 'center center';
    modalTitle.innerHTML = item[0].title;
    modalDescription.innerHTML = item[0].desc;
    item[0].link ? (modalLink.href = item[0].link) : modalLink.remove();
    if (modal.classList.contains('hide')) {
      modal.classList.remove('hide');
      modal.classList.add('show');
    }
    modal.classList.add('show');
  }
});

btnSearch.addEventListener('click', () => {
  let searchValue = search.value;
  if (searchValue) {
    filterVillages(searchValue);
  }
});

function createMarker(data) {
  if (!data) {
    return null;
  }
  container.innerHTML = '';
  data.forEach((item) => {
    let classArray = item.class.split(' ');
    let circle = document.createElement('div');
    circle.classList.add(...classArray);
    circle.setAttribute('data-id', item.dataId);
    circle.setAttribute('data-tooltip', item.dataTooltip);
    container.append(circle);
  });
}

window.toggleMobileMenu = function (e) {
  e.preventDefault();
  document.querySelector('header').classList.toggle('is-mobile-menu-open');
  document.querySelector('body').classList.toggle('is-fixed');
};

search.addEventListener('keypress', function (event) {
  const charCode = event.charCode;
  let searchValue = search.value;
  if (charCode == 13) {
    filterVillages(searchValue);
  }
});

select.addEventListener('change', () => {
  let regionId = select.options[select.selectedIndex].value;
  let filterData = villages.filter((item) => item.regionId == regionId);
  createMarker(filterData);
});

function filterVillages(searchValue) {
  let filterData = villages.filter(
    (item) =>
      item.title.toLowerCase().includes(searchValue) ||
      item.title.includes(searchValue) ||
      item.title.toUpperCase().includes(searchValue),
  );
  createMarker(filterData);
}

function createOptionsSelect(data) {
  if (!data) {
    return null;
  }

  for (let key in data) {
    let option = document.createElement('option');
    option.setAttribute('value', key);
    option.innerHTML = data[key];
    select.append(option);
  }
}
