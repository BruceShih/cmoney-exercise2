const slides = document.querySelectorAll('.slide');

let activeSlide = 0;

document.addEventListener('DOMContentLoaded', (e) => {
  setInterval(() => {
    setActiveSlide();
  }, 5000);
});

function setActiveSlide() {
  const activeSlideElement = document.querySelector('.slide.active');
  const nextSlideElement =
    activeSlide < 3
      ? document.querySelector(`[data-slide="${activeSlide + 1}"]`)
      : document.querySelector(`[data-slide="0"]`);
  activeSlideElement.classList.remove('active');
  nextSlideElement.classList.add('active');
  if (activeSlide < 3) activeSlide++;
  else activeSlide = 0;
}
