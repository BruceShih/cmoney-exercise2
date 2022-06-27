const reveals = document.querySelectorAll('.reveal');
const countingElements = document.querySelectorAll('.counting');
let currentActive = 0;

window.addEventListener('scroll', (e) => {
  const current =
    reveals.length -
    [...reveals]
      .reverse()
      .findIndex(
        (reveal) => reveal.getBoundingClientRect().top < window.innerHeight - 50
      ) -
    1;

  const counting =
    countingElements.length -
    [...reveals]
      .reverse()
      .findIndex(
        (count) => count.getBoundingClientRect().top < window.innerHeight - 50
      ) -
    1;

  if (current !== currentActive) {
    currentActive = current;
    makeActive(current);
  }

  if (counting >= 0) {
    if (countingElements[counting].classList.contains('animating') === false) {
      animate(
        countingElements[counting],
        0,
        countingElements[counting].innerText,
        1000
      );
    }
  }
});

function makeActive(index) {
  if (index < reveals.length) {
    reveals[index].classList.add('active');
  }
}

function removeActive(index) {
  if (index < reveals.length) {
    reveals[index].classList.remove('active');
  }
}

function removeAllActive() {
  [...Array(reveals.length).keys()].forEach((index) => removeActive(index));
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
