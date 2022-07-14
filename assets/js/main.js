const slides = document.querySelectorAll(".slide");
const pausePlayButton = document.querySelector('#pause_play-btn');
const prevButton = document.querySelector('#prev-btn');
const nextButton = document.querySelector('#next-btn');
const SLIDES_LENGTH = slides.length;
let currentSlide = 0;
let interval = setInterval(goToNth, 1000);
let isPlay = true;

function goToNth() {
  slides[currentSlide].classList.toggle('active');
  currentSlide = (currentSlide + 1) % SLIDES_LENGTH;
  slides[currentSlide].classList.toggle('active');
}

function pause() {
  clearInterval(interval);
  pausePlayButton.innerHTML = 'Play';
  isPlay = false;
}

function play() {
  interval = setInterval(goToNth, 1000);
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


pausePlayButton.addEventListener('click', pausePlay);