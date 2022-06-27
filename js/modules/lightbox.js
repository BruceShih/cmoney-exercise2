const lightboxToggler = document.getElementById('OpenVideo');

if (lightboxToggler) {
  lightboxToggler.addEventListener('click', (e) => {
    e.stopPropagation();
    const lightbox = document.querySelector('.lightbox');
    if (lightbox) {
      lightbox.classList.toggle('show');
      const body = document.getElementsByTagName('body');
      body[0].classList.toggle('overflow-hidden');
    }
  });

  document.addEventListener('click', (e) => {
    const lightbox = document.querySelector('.lightbox');
    if (lightbox.classList.contains('show')) {
      lightbox.classList.remove('show');
    }
    const body = document.getElementsByTagName('body');
    body[0].classList.remove('overflow-hidden');
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
      const lightbox = document.querySelector('.lightbox');
      if (lightbox.classList.contains('show')) {
        lightbox.classList.remove('show');
      }
      const body = document.getElementsByTagName('body');
      body[0].classList.remove('overflow-hidden');
    }
  });
}
