const bannerSlides = document.querySelectorAll('.main__banner__carousel__img')
const nextSlideBtn = document.querySelector('#main__banner__carousel__next')
const prevSlideBtn = document.querySelector('#main__banner__carousel__prev')
const lastSlideIndex = bannerSlides.length - 1

let currentSlideIndex = 0;

const changeSlideVisibility = currentSlideIndex => {
  bannerSlides.forEach(banner => 
    banner.classList
    .remove('main__banner__carousel__img--visible'))
  bannerSlides[currentSlideIndex].classList
    .add('main__banner__carousel__img--visible')
}

const nextSlide = () => {
  const isLastSlide = currentSlideIndex == lastSlideIndex 
  ? currentSlideIndex = 0 
  : ++currentSlideIndex

  changeSlideVisibility(currentSlideIndex);
}

const prevSlide = () => {
  const isFirstSlide = currentSlideIndex == 0 
  ? currentSlideIndex = lastSlideIndex 
  : --currentSlideIndex

  changeSlideVisibility(currentSlideIndex);
}

const autoChangeSlide = () => {
  setInterval(nextSlide, 3000)
}

autoChangeSlide();

nextSlideBtn.addEventListener('click', nextSlide)
prevSlideBtn.addEventListener('click', prevSlide)
