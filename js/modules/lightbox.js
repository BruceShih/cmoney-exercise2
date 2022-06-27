const lightboxToggler = document.getElementById('OpenVideo');

if (lightboxToggler) {
  lightboxToggler.addEventListener('click', (e) => {
    e.stopPropagation();
    const lightbox = document.querySelector('.lightbox');
    if (lightbox) {
      lightbox.classList.toggle('show');
      lightbox.innerHTML =
        '<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
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
