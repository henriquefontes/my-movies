const bannerSlides = document.querySelectorAll('.main__banner__carousel__img')
const moviesContainer = document.querySelector('.main__movies');
const nextSlideBtn = document.querySelector('#main__banner__carousel__next')
const prevSlideBtn = document.querySelector('#main__banner__carousel__prev')
const _apiURL = `https://imdb-api.com/en/API/MostPopularMovies/k_4y95r9qk`
const lastSlideIndex = bannerSlides.length - 1
const amountOfElementsInPage = 8;

let currentSlideIndex = 0;
let moviesPageIndex = 0;

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

const getMoviesArray = async () => {
  const moviesInJson = await fetch(_apiURL);
  const { items: movies, errorMessage: haveError } = await moviesInJson.json();

  if (haveError) {
    throw new Error("Max of requests per day.")
  }

  return movies;
}

const splitMoviesArrayToPages = moviesArray => {
  const myArray = [];

  for (let i = 0; i < moviesArray.length; i++) {
    const arrItem = moviesArray.splice(0, amountOfElementsInPage)

    myArray.push(arrItem);
  }

  return myArray;
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

const loadMovies = async () => {
  const moviesArray = await getMoviesArray()
  const organizedMoviesArray = splitMoviesArrayToPages(moviesArray)

  setMoviesOfCurrentPage(organizedMoviesArray)
}

autoChangeSlide()
loadMovies()

nextSlideBtn.addEventListener('click', nextSlide)
prevSlideBtn.addEventListener('click', prevSlide)