const header = document.getElementById('Header');

if (header) {
  // detect current scroll position, if the position is greater than 70px, apply 'dynamic' class to header
  window.addEventListener('scroll', () => {
    if (window.scrollY >= 70) {
      header.classList.add('dynamic');
      header.classList.remove('static');
    } else {
      header.classList.remove('dynamic');
      header.classList.add('static');
    }
  });

  // add DOMContentLoaded event listener to apply 'dynamic' class to header if page is already scrolled
  document.addEventListener('DOMContentLoaded', () => {
    if (window.scrollY >= 70) {
      header.classList.add('dynamic');
      header.classList.remove('static');
    } else {
      header.classList.remove('dynamic');
      header.classList.add('static');
    }
  });
}

const toggler = document.querySelector('.header__toggler');
const headerCollapse = document.querySelector('#Header .header-collapse');

if (toggler && headerCollapse) {
  toggler.addEventListener('click', (e) => {
    e.stopPropagation();
    if (headerCollapse.classList.contains('show')) {
      headerCollapse.classList.remove('show');
    } else {
      headerCollapse.classList.add('show');
    }
  });

  document.addEventListener('click', (e) => {
    if (headerCollapse.classList.contains('show')) {
      headerCollapse.classList.remove('show');
    }
  });
}

const headerNav = document.querySelector('#Header .header__nav');

if (headerNav) {
  // add navigation event listener
  headerNav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      // scroll to the element with id
      const id = e.target.getAttribute('href');
      const element = document.querySelector(id);
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
}

const headerLogo = document.querySelector('.header__logo');

if (headerLogo) {
  // add logo event listener
  headerLogo.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' || e.target.tagName === 'IMG') {
      // scroll to the element with id
      const id = e.target.getAttribute('href');
      const element = document.querySelector(id);
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
}
