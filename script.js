const bannerSlides = document.querySelectorAll('.main__banner__carousel__img')
const moviesContainer = document.querySelector('.main__movies');
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

const getMovies = async () => {
  const moviesInJson = await fetch("./movies.json");
  const { movies } = await moviesInJson.json();

  console.log(movies);

  renderMoviesIntoDOM(movies);
}

const renderMoviesIntoDOM = moviesArray => {
  const movies = moviesArray.map(({name, img, year}) => {
    return `
      <div class="main__movies__movie">
        <img class="main__movies__movie__img" src="${img}" alt="${name} movie">
      </div>
    `
  }).join('');

  moviesContainer.innerHTML += movies;
}

autoChangeSlide()
getMovies()

nextSlideBtn.addEventListener('click', nextSlide)
prevSlideBtn.addEventListener('click', prevSlide)