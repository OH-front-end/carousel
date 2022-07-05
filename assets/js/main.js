const slides = document.querySelectorAll(".slide");
const SLIDES_LENGTH = slides.length;
let currentSlide = 0;
let interval = setInterval(goToNth, 1000);

function goToNth() {
  slides[currentSlide].classList.toggle('active');
  currentSlide = (currentSlide + 1) % SLIDES_LENGTH;
  slides[currentSlide].classList.toggle('active');
}

