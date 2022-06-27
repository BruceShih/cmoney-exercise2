window.addEventListener('scroll', (e) => {
  const reveals = document.querySelectorAll('.reveal');

  for (let index = 0; index < reveals.length; index++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[index].getBoundingClientRect().top;
    const elementVisible = 50;

    if (elementTop < windowHeight - elementVisible) {
      reveals[index].classList.add('active');
      const elements = document.querySelectorAll('.counting');
      elements.forEach((element) => {
        animate(element, 0, element.innerText, 1000);
      })
    } else {
      reveals[index].classList.remove('active');
    }
  }
});

function animate(element, initValue, finalValue, duration) {
  let startTime = null;
  let currentTime = Date.now();
  const step = (currentTime) => {
    if (!startTime) {
      startTime = currentTime;
    }

    const progress = Math.min((currentTime - startTime) / duration, 1);
    element.innerHTML = Math.floor(
      progress * (finalValue - initValue) + initValue
    );
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      window.cancelAnimationFrame(window.requestAnimationFrame(step));
    }
  };

  window.requestAnimationFrame(step);
}
