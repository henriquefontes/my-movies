const bannerSlides = document.querySelectorAll('.main__banner__carousel__img')
const moviesContainer = document.querySelector('.main__movies');
const nextSlideBtn = document.querySelector('#main__banner__carousel__next')
const prevSlideBtn = document.querySelector('#main__banner__carousel__prev')
const _apiURL = `https://imdb-api.com/en/API/MostPopularMovies/k_4y95r9qk`
const lastSlideIndex = bannerSlides.length - 1
const amountOfElementsInPage = 8;

let currentSlideIndex = 0;
let moviesPageIndex = 1;

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

const splitMoviesArrayToPages = moviesArray => {
  const myArray = [];

  for (let i = 0; i < moviesArray.length; i++) {
    const arrItem = moviesArray.splice(0, amountOfElementsInPage)

    myArray.push(arrItem);
  }

  return myArray
}

const getMoviesArray = async () => {
  const moviesInJson = await fetch(_apiURL);
  const { items: movies, errorMessage } = await moviesInJson.json();

  if (errorMessage) {
    throw new Error(errorMessage)
  }

  const splittedMoviesArray = splitMoviesArrayToPages(movies)

  return splittedMoviesArray
}


const setMoviesOfCurrentPage = allMoviesArray => {
  const moviesFromCurrentPage = allMoviesArray[moviesPageIndex];
  
  renderMoviesIntoDOM(moviesFromCurrentPage)
}

const renderMoviesIntoDOM = moviesArray => {
   const movies = moviesArray.map(({title, image, year}) => {
     return `
         <div class="main__movies__movie">
           <a href="/${title}">
             <div class="main__movies__movie__content" 
             style="background-image: url('${image}')">
             </div>
           </a>
         </div>
     `
   }).join('');

  moviesContainer.innerHTML += movies;
}

const loadMoviesOnPageLoad = async () => {
  const movies = await getMoviesArray()

  setMoviesOfCurrentPage(movies)
}

const loadNextMovies = async () => {
  const movies = await getMoviesArray()

  moviesPageIndex++

  setMoviesOfCurrentPage(movies)
}

autoChangeSlide()
loadMoviesOnPageLoad()

nextSlideBtn.addEventListener('click', nextSlide)
prevSlideBtn.addEventListener('click', prevSlide)