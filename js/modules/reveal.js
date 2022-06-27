function scrollTrigger(selector, options = {}) {
  let elements = document.querySelectorAll(selector);
  elements = Array.from(elements);
  elements.forEach((element) => {
    addObserver(element, options);
  });
}

function addObserver(element, options) {
  if (!('IntersectionObserver' in window)) {
    if (options.cb) {
      options.cb(element);
    } else {
      entry.target.classList.add('active');
    }
    return;
  }

  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (options.cb) {
          options.cb(element);
        } else {
          const countingElement = entry.target.querySelector('.counting');
          if (countingElement) {
            if (countingElement.classList.contains('animating') === false) {
              animate(countingElement, 0, countingElement.innerText, 1000);
            }
          }
          entry.target.classList.add('active');
        }
        observer.unobserve(entry.target);
      }
    });
  }, options);
  observer.observe(element);
}

function animate(element, initValue, finalValue, duration) {
  let startTime = null;
  let currentTime = Date.now();
  element.classList.add('animating');
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

scrollTrigger('.reveal');
