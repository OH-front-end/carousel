(function () {
  const container = document.querySelector(".carousel");
  const slides = document.querySelectorAll(".slide");
  const indicatorContainer = document.querySelector("#indicators");
  const indicators = document.querySelectorAll(".indicator");
  const pausePlayButton = document.querySelector('#pause_play-btn');
  const prevButton = document.querySelector('#prev-btn');
  const nextButton = document.querySelector('#next-btn');

  const SLIDES_LENGTH = slides.length;
  const ARROW_RIGHT = 'ArrowRight';
  const ARROW_LEFT = 'ArrowLeft';
  const ARROW_SPACE = 'Space';
  const PAUSE_ICON = '<i class="fa-solid fa-circle-pause">';
  const PLAY_ICON = '<i class="fa-solid fa-circle-play">';

  let swipeStartX = null;
  let swipeEndX = null;
  let currentSlide = 0;
  let interval = null;
  let isPlay = true;

  function goToNth(n) {
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
    currentSlide = (n + SLIDES_LENGTH) % SLIDES_LENGTH;
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
  }

  function prevSlide() {
    goToNth(currentSlide - 1);
  }

  function nextSlide() {
    goToNth(currentSlide + 1);
  }


  function pause() {
    clearInterval(interval);
    pausePlayButton.innerHTML = PLAY_ICON;
    isPlay = false;
  }

  function play() {
    interval = setInterval(nextSlide, 1000);
    pausePlayButton.innerHTML = PAUSE_ICON;
    isPlay = true;
  }

  function pausePlay() {
    if (isPlay) {
      pause();
    } else {
      play();
    }
  }

  function indicate(e) {
    const target = e.target;
    if (target.classList.contains('indicator')) {
      pause();
      goToNth(+target.dataset.slideTo);
    }
  }

  function prevHandler() {
    pause();
    prevSlide();
  }
  function nextHandler() {
    pause();
    nextSlide();
  }

  function pressKey(e) {
    if (e.code === ARROW_LEFT) prevHandler();
    if (e.code === ARROW_RIGHT) nextHandler();
    if (e.code === ARROW_SPACE) pausePlay();
  }

  function swipeStart(e) {
    swipeStartX = e.changedTouches[0].pageX;
  }

  function swipeEnd(e) {
    swipeEndX = e.changedTouches[0].pageX;
    if (swipeStartX - swipeEndX > 100) nextHandler();
    if (swipeStartX - swipeEndX < -100) prevHandler();
  }

  function initListeners() {
    prevButton.addEventListener('click', prevHandler);
    nextButton.addEventListener('click', nextHandler);
    pausePlayButton.addEventListener('click', pausePlay);
    indicatorContainer.addEventListener('click', indicate);
    document.addEventListener('keydown', pressKey);
    container.addEventListener('touchstart', swipeStart);
    container.addEventListener('touchend', swipeEnd);
  }

  function init() {
    initListeners();
    interval = setInterval(nextSlide, 1000);
  }
  init();
}());