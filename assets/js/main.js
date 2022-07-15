const slides = document.querySelectorAll(".slide");
const indicators = document.querySelectorAll(".indicator");
const pausePlayButton = document.querySelector('#pause_play-btn');
const prevButton = document.querySelector('#prev-btn');
const nextButton = document.querySelector('#next-btn');
const SLIDES_LENGTH = slides.length;
let currentSlide = 0;
let interval = setInterval(nextSlide, 1000);
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
  pausePlayButton.innerHTML = 'Play';
  isPlay = false;
}

function play() {
  interval = setInterval(nextSlide, 1000);
  pausePlayButton.innerHTML = 'Pause';
  isPlay = true;
}

function pausePlay() {
  if (isPlay) {
    pause();
  } else {
    play();
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

prevButton.addEventListener('click', prevHandler);
nextButton.addEventListener('click', nextHandler);
pausePlayButton.addEventListener('click', pausePlay);