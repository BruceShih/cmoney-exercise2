const header = document.getElementById('Header');

// detect current scroll position, if the position is greater than 70px, apply 'dynamic' class to header
window.addEventListener('scroll', () => {
  if (window.scrollY > 70) {
    header.classList.add('dynamic');
    header.classList.remove('static');
  } else {
    header.classList.remove('dynamic');
    header.classList.add('static');
  }
});

// add domcontentloader event listener
document.addEventListener('DOMContentLoaded', () => {
  if (window.scrollY > 70) {
    header.classList.add('dynamic');
    header.classList.remove('static');
  } else {
    header.classList.remove('dynamic');
    header.classList.add('static');
  }
})

const headerNav = document.querySelectorAll('#Header header__nav .button-link');

headerNav.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    // scroll to the element with id
    const id = e.target.getAttribute('href');
    const element = document.querySelector(id);
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
})
