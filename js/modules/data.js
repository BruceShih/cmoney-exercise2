fetch('http://localhost:3000/activity')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const activityList = data.list.sort((a, b) => {
      return a.level - b.level;
    });
    const personNum = data.personNum;
    const endTime = new Date(data.endTime);
    const lastList = activityList[activityList.length - 1];
    const isFull = personNum >= lastList.level;
    const isOverflow = personNum > lastList.level;
    const isEnd = endTime < new Date();
    const isActivityEnd = isEnd || isFull || isOverflow;
    if (isActivityEnd) {
      if (isEnd) {
        setBlockOneText('優惠活動結束', '請再關注我們的優惠時間');
      }
      if (isOverflow) {
        setBlockOneText('贈送完畢', '我們提早結束優惠');
      }
    } else {
      if (!isEnd) {
        // make a countdown timer
        const timerInterval = setInterval(() => {
          const remainingTime = new Date(
            endTime.getTime() - new Date().getTime()
          );
          const day = remainingTime.getDate().toString().padStart(2, '0');
          const hour = remainingTime.getHours().toString().padStart(2, '0');
          const minute = remainingTime.getMinutes().toString().padStart(2, '0');
          const second = remainingTime.getSeconds().toString().padStart(2, '0');
          const html = `<strong class="font-size-larger">${day}</strong>天
            <strong class="font-size-larger">${hour}</strong>時
            <strong class="font-size-larger">${minute}</strong>分
            <strong class="font-size-larger">${second}</strong>秒`;
          setBlockOneText('優惠倒數', html);

          if (timerInterval < 0) {
            clearInterval(timerInterval);
            setBlockOneText('優惠活動結束', '請再關注我們的優惠時間');
          }
        }, 1000);
      }
    }
    const percentage = (personNum / lastList.level) * 100;
    const percentageList = [];
    percentageList.push(0);
    activityList.forEach((list) => {
      percentageList.push((list.level / lastList.level) * 100);
    });
    const upperTextList = [];
    upperTextList.push('');
    activityList.forEach((list) => {
      upperTextList.push(`達${list.level}人`);
    });
    const lowerTextList = [];
    lowerTextList.push('預購開始');
    activityList.forEach((list) => {
      lowerTextList.push(`送${list.productName}`);
    });
    setBlockTwoText(percentage, percentageList, upperTextList, lowerTextList);
    setBlockThreeText(personNum, isFull, isOverflow, isEnd);
  })
  .catch((error) => {
    console.error(error);
  });

function setBlockOneText(text1, text2) {
  const firstBlock = document.getElementById('BlockOne');
  if (firstBlock) {
    firstBlock.innerHTML = '';
    const span1 = document.createElement('span');
    span1.classList.add('font-size-larger');
    span1.innerText = text1;
    firstBlock.appendChild(span1);
    const span2 = document.createElement('span');
    span2.innerHTML = text2;
    firstBlock.appendChild(span2);
  } else {
    console.error('cant find element');
  }
}

function setBlockTwoText(
  progress,
  percentageList,
  upperTextList,
  lowerTextList
) {
  if (
    percentageList.length !== upperTextList.length ||
    percentageList.length !== lowerTextList.length
  )
    console.error('argument length not match');
  const secondBlock = document.getElementById('BlockTwo');
  if (secondBlock) {
    secondBlock.innerHTML = '';
    const upperText = document.createElement('div');
    upperText.classList.add('stepper-upper-text');
    for (let index = 0; index < percentageList.length; index++) {
      const node = document.createElement('div');
      node.classList.add('font-size-small');
      node.classList.add(`left-${percentageList[index]}`);
      node.innerText = upperTextList[index];
      upperText.appendChild(node);
    }
    secondBlock.appendChild(upperText);
    const stepper = document.createElement('div');
    stepper.classList.add('stepper');
    const stepperBar = document.createElement('div');
    stepperBar.classList.add('stepper-bar');
    stepperBar.setAttribute('role', 'progressbar');
    stepperBar.style.width = progress + '%';
    stepper.appendChild(stepperBar);
    secondBlock.appendChild(stepper);
    const stepperProgress = document.createElement('div');
    stepperProgress.classList.add('stepper-progress');
    for (let index = 0; index < percentageList.length; index++) {
      const node = document.createElement('div');
      node.classList.add('stepper-progress-step');
      if (progress >= percentageList[index]) node.classList.add('active');
      node.classList.add(`left-${percentageList[index]}`);
      stepperProgress.appendChild(node);
    }
    secondBlock.appendChild(stepperProgress);
    const lowerText = document.createElement('div');
    lowerText.classList.add('stepper-lower-text');
    for (let index = 0; index < percentageList.length; index++) {
      const node = document.createElement('div');
      node.classList.add('font-size-small');
      node.classList.add(`left-${percentageList[index]}`);
      node.innerText = lowerTextList[index];
      lowerText.appendChild(node);
    }
    secondBlock.appendChild(lowerText);
  } else {
    console.error('cant find element');
  }
}

function setBlockThreeText(count, isFull, isOverflow, isEnd) {
  const thirdBlock = document.getElementById('BlockThree');
  if (thirdBlock) {
    if (isFull) {
      thirdBlock.innerHTML = '';
      const strong = document.createElement('strong');
      strong.classList.add('font-size-larger');
      strong.innerText = '已額滿！';
      thirdBlock.appendChild(strong);
      return;
    }
    if (isOverflow) {
      thirdBlock.innerHTML = '';
      const strong = document.createElement('strong');
      strong.classList.add('font-size-larger');
      strong.innerText = '已爆滿！';
      thirdBlock.appendChild(strong);
      return;
    }
    if (isEnd) {
      thirdBlock.innerHTML = '';
      const span = document.createElement('span');
      const strong = document.createElement('strong');
      const button = document.createElement('button');
      span.classList.add('font-size-large');
      strong.classList.add('font-size-largest');
      strong.innerText = count.toString();
      button.className = 'button bg-white color-purple mt-1 px-4';
      button.setAttribute('type', 'button');
      button.innerText = '我要報名≫';
      span.appendChild(document.createTextNode('已有'));
      span.appendChild(strong);
      span.appendChild(document.createTextNode('人報名'));
      thirdBlock.appendChild(span);
      thirdBlock.appendChild(button);
      return;
    } else {
      thirdBlock.innerHTML = '';
      const span = document.createElement('span');
      const strong = document.createElement('strong');
      const button = document.createElement('button');
      span.classList.add('font-size-large');
      strong.classList.add('font-size-largest');
      strong.innerText = count.toString();
      button.className = 'button bg-white color-purple mt-1 px-4';
      button.setAttribute('type', 'button');
      button.innerText = '搶先報名≫';
      span.appendChild(document.createTextNode('已有'));
      span.appendChild(strong);
      span.appendChild(document.createTextNode('人報名'));
      thirdBlock.appendChild(span);
      thirdBlock.appendChild(button);
      return;
    }
  } else {
    console.error('cant find element');
  }
}
