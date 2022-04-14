const bgVideo = document.querySelector('.bg-video');
const backdrop = document.querySelector('.recipes-view__backdrop');
const flyingNavComponent = document.querySelector('.flying-nav');

const pageBody = document.querySelector('body');

// Views
const homeView = document.querySelector('.home-view');
const aboutusView = document.querySelector('.aboutus-view');
const recipesView = document.querySelector('.recipes-view');

//* Navigation
const navDesktopList = document.querySelector('.nav-desktop__list');
const navHighlightingBars = document.querySelectorAll(
  '.nav-desktop__item__bar'
);
const hamburgerIcon = document.querySelector('.nav__hamburger');
const mobileNavOverlay = document.querySelector('.nav__bg');
const mobileNav = document.querySelector('.nav-mobile');
const navMobileList = document.querySelector('.nav-mobile__list');
const mobileNavLinks = document.querySelectorAll('.nav-mobile-link');

//* Slider
const sliderItems = document.querySelectorAll('.slider__slide');
const sliderNav = document.querySelector('.slider__navigation');
const sliderNavItems = sliderNav.querySelectorAll('[data-slide]');

//* Buttons
const primaryButtons = document.querySelectorAll('.button-primary');
const addRecipeBtn = document.querySelector('.flying-nav__item--add');
const bookmarksBtn = document.querySelector('.flying-nav__item--bookmark');

//* Recipes View
let backToRecipesViewArr;
const recipesWrapper = document.querySelector('.recipes-wrapper');
const addRecipeIcon = document.querySelector("[alt='Add recipe']");

// Recipe View Containers
const recipeDetailsContainer = document.querySelector('.recipe__view');
const recipesListContainer = document.querySelector('.recipes-list');
const recipesPagination = document.querySelector('.recipes-pagination');

// Recipes Navigation
const recipesNavTop = document.querySelector('.recipes-nav__top-row');
const recipesNavBottom = document.querySelector('.recipes-nav__bottom-row');
const recipeCategories = document.querySelectorAll('.recipes-nav__item--top');
const recipesSearchBar = document.querySelector('.recipes-nav__search');

// How to cook meal container
const recipeDetails = document.querySelector('.recipe__how-cook');

const recentlyViewedMealsContainer = document.querySelector(
  '.recipes-list__recently'
);
//* Form
const formWrapper = document.querySelector('.form-wrapper');
const inputInvalidInfo = formWrapper.querySelectorAll('.input-invalid-info');
const mealNameF = formWrapper.querySelector('#name');
const mealImgF = formWrapper.querySelector('#img');
const mealDescriptionF = formWrapper.querySelector('#recipe-desc');
const ingredientsF = Array.from(
  formWrapper.querySelectorAll('.form__input--ingredient')
);
const formInputsGroup = formWrapper.querySelector('.form__data');

// Bookmarks
const bookmarksWrapper = document.querySelector('.bookmarked-recipes');
const bookmarksList = document.querySelector('.bookmarked-recipes__list');

class EventHandler {
  static _bookmarksVisible = false;
  static _formVisible = false;

  constructor() {
    this._handleNavState();
    this._handleSliderView();
    this._handleMobileNavDisplay();
    this._handleViewDisplay();
    this._handleFlyingNavEvents();
  }

  _handleViewDisplay() {
    const controlCurPage = (view, bg = true) => {
      const views = [homeView, aboutusView, recipesView];
      views.forEach(view => {
        view.style.opacity = '0';
        view.style.visibility = 'hidden';
      });
      view.style.display = 'block';
      if (view == homeView) view.style.display = 'flex';
      view.style.opacity = '1';
      view.style.visibility = 'visible';
      bgVideo.style.opacity = '0';
      if (bg) bgVideo.style.opacity = '1';
    };

    // Handle primary buttons event
    primaryButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        controlCurPage(recipesView, false);
        navHighlightingBars.forEach(bar =>
          bar.classList.remove('nav-desktop__item__bar--active')
        );
        navHighlightingBars[1].classList.add('nav-desktop__item__bar--active');
      });
    });

    // Display seletected view
    [navDesktopList, navMobileList].forEach(navList => {
      navList.addEventListener('click', e => {
        const target = e.target;
        if (
          !(
            (!target.classList.contains('nav-desktop__item') &&
              target.classList.contains('nav-mobile__item')) ||
            (target.classList.contains('nav-desktop__item') &&
              !target.classList.contains('nav-mobile__item'))
          )
        )
          return;
        const navigateTo = target.textContent.trim();
        const DELAY = target.classList.contains('nav-desktop__item')
          ? 400
          : 1200;
        setTimeout(() => {
          if (navigateTo === 'Home') controlCurPage(homeView);
          if (navigateTo === 'Recipes') controlCurPage(recipesView, false);
          if (navigateTo === 'About us') controlCurPage(aboutusView);
        }, DELAY);
      });
    });
  }

  // Handle flying nav events
  _handleFlyingNavEvents = () => {
    const handleBackdropEvent = () => {
      if (this._bookmarksVisible) {
        this._bookmarksVisible = false;
        bookmarksWrapper.classList.toggle('bookmarked-recipes--hidden');
      } else {
        this._formVisible = false;
        formWrapper.classList.toggle('display-form');
        addRecipeIcon.classList.toggle('rotate-btn');
      }
      backdrop.classList.toggle('recipes-view__backdrop--hidden');
    };

    const controlBookmarksDisplay = () => {
      this._bookmarksVisible = !this._bookmarksVisible;
      bookmarksWrapper.classList.toggle('bookmarked-recipes--hidden');
      backdrop.classList.toggle('recipes-view__backdrop--hidden');
    };

    const controlFormDisplay = () => {
      this._formVisible = !this._formVisible;
      formWrapper.classList.toggle('display-form');
      addRecipeIcon.classList.toggle('rotate-btn');
      backdrop.classList.toggle('recipes-view__backdrop--hidden');
    };
    backdrop.addEventListener('click', handleBackdropEvent);
    addRecipeBtn.addEventListener('click', controlFormDisplay);
    bookmarksBtn.addEventListener('click', controlBookmarksDisplay);
  };

  // Highlight desktop current view
  _handleNavState = () => {
    navDesktopList.addEventListener('click', e => {
      const target = e.target;
      if (!target.classList.contains('nav-desktop__item')) return;

      const bar = target.querySelector('.nav-desktop__item__bar');
      navHighlightingBars.forEach(bar =>
        bar.classList.remove('nav-desktop__item__bar--active')
      );
      bar.classList.add('nav-desktop__item__bar--active');
    });
  };

  // Handle mobile nav display
  _handleMobileNavDisplay = () => {
    const controlDisplay = () => {
      mobileNavOverlay.classList.toggle('nav-mobile--hidden');
      mobileNavOverlay.classList.toggle('nav-mobile--visible');
      setTimeout(() => {
        homeView.classList.toggle('index-setter');
        aboutusView.classList.toggle('index-setter');
        recipesView.classList.toggle('index-setter');
      }, 800);
      navMobileList.classList.toggle('nav-mobile__list--visible');
      navMobileList.classList.toggle('nav-mobile__list--disabled');
    };

    hamburgerIcon.addEventListener('click', controlDisplay);
    mobileNav.addEventListener('click', e => {
      const target = e.target;
      if (target.classList.contains('nav-mobile__item')) {
        controlDisplay(target);
      }
    });
  };

  // Handle cur slide view
  _handleSliderView = () => {
    sliderNav.addEventListener('click', e => {
      let target = e.target;
      if (
        !target.dataset.slide &&
        !target.classList.contains('slider__navigation__item')
      )
        return;
      if (target.classList.contains('slider__navigation__item'))
        target = target.children[0];

      sliderNavItems.forEach(item => {
        if (item.classList.contains('slider__navigation__item--active')) {
          item.classList.remove('slider__navigation__item--active');
          item.classList.add('slider__navigation__item--disabled');
        }
      });
      target.classList.add('slider__navigation__item--active');
      const curSlideIndex = target.dataset.slide;
      const curSlide = document.querySelector(
        `.slider__slide--${curSlideIndex}`
      );

      sliderItems.forEach(item => {
        if (item !== curSlideIndex) {
          item.classList.remove('slider__slide--active');
          item.classList.add('slider__slide--disabled');
        }
      });
      curSlide.classList.remove('slider__slide--disabled');
      curSlide.classList.add('slider__slide--active');
      curSlide.animate([{ opacity: '0' }, { opacity: '1' }], {
        duration: 250,
        fill: 'forwards',
      });
    });
  };
}

// create Meal
class MealRecipe {
  _name;
  _id;
  _category;
  _howCook;
  _ingredients;
  _measures;
  _img;

  constructor(name, id, category, howCook, img, ingredients, measures) {
    this._name = name;
    this._id = id;
    this._category = category;
    this._howCook = howCook;
    this._img = img;
    this._ingredients = ingredients;
    this._measures = measures;
  }
}

// App functionality
class App extends EventHandler {
  #mealDetails;
  #mealsData;
  #subCategories;
  #selectedCategory;
  #actualMealSubCat;
  #actualMealSubCatNode;

  #isViewRandom = false;

  #yourMeals = [];
  #yourMealsDetails = [];
  #yourMealOb;
  #bookmarkedMeals = [];
  #recentlyViewedMeals = [];
  #curPage = 1;
  #numberOfPages;
  #pagesList;

  #errMessage = 'Something went wrong. Please reaload the page!';

  constructor() {
    super();
    this._fetchMealsDataByType();
    this._handleRecipesCategoryChange();
    this._displayRecipesListByType();
    this._displayRecipesByKey();
    this._controlRecipeThumbnailEvents();
    this._handleBookmarksListChange();
    this._handleRecipeAdd();
    this._handleRecentlyViewedMealsEvent();
    this._handleCurPageChange();
    setTimeout(() => {
      this._rerenderContainer(
        recipesPagination,
        this._renderPaginationMarkup()
      );
      this.#pagesList = Array.from(
        document.querySelectorAll('.recipes-pagination__page')
      );
      this._getLocalStorage();
    }, 1000);
  }

  //* ( Set local storage )
  _setLocalStorage = (name, items) =>
    localStorage.setItem(name, JSON.stringify(items));

  //* ( Get local storage items )
  _getLocalStorage = () => {
    const checkIfBookmarked = mealsArray => {
      for (const bookmark of this.#bookmarkedMeals) {
        mealsArray.forEach(meal => {
          if (meal.mealId === bookmark.mealId && bookmark.isBookmarked) {
            meal.isBookmarked = true;
          }
        });
      }
    };
    const yourMealsStorage = JSON.parse(localStorage.getItem('yourMeals'));
    const yourMealsDetailsStorage = JSON.parse(
      localStorage.getItem('yourMealsDetails')
    );
    if (yourMealsStorage?.length > 0) {
      this.#yourMeals = yourMealsStorage;
      this.#yourMealsDetails = yourMealsDetailsStorage;
    }
    const bookmarksStorage = JSON.parse(localStorage.getItem('bookmarks'));
    if (bookmarksStorage?.length > 0) {
      this.#bookmarkedMeals = bookmarksStorage;
      checkIfBookmarked(this.#mealsData);
      checkIfBookmarked(this.#yourMeals);
      this._renderRecipesThumbnails(true);
      this._renderRecipesThumbnails();
    }
  };

  //* ( Rerender container )
  _rerenderContainer = (container, markup) => {
    container.innerHTML = '';
    container.insertAdjacentHTML('afterbegin', markup);
  };

  //* ( Clear container )
  _clearContainer = container => (container.innerHTML = '');

  //* ( Fetch meal details )
  _fetchMealDetails = async id => {
    const ingredients = [];
    const measures = [];
    const { meals: meal } = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    )
      .then(res => res.json())
      .catch(err => {
        throw err;
      });
    const [mealDetails] = meal;
    for (const detail in mealDetails) {
      if (
        detail.startsWith('strIngredient') &&
        mealDetails[detail] !== '' &&
        mealDetails[detail] !== null
      )
        ingredients.push(mealDetails[detail]);
      if (
        detail.startsWith('strMeasure') &&
        mealDetails[detail] !== '' &&
        mealDetails[detail] !== null
      )
        measures.push(mealDetails[detail]);
    }
    return new MealRecipe(
      mealDetails.strMeal,
      mealDetails.idMeal,
      mealDetails.strCategory,
      mealDetails.strInstructions,
      mealDetails.strMealThumb,
      ingredients,
      measures
    );
  };

  //* ( Fetch Data )
  _fetchData = async (cat = 'category', subCat = 'Beef', key) => {
    try {
      let data;
      if (key) {
        data = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${key}`
        ).then(res => res.json());
      } else if (!key) {
        recipesSearchBar.value = '';
        this.#actualMealSubCat = subCat;
        const filteredCat = cat === 'category' ? 'c' : 'a';
        data = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?${filteredCat}=${subCat}`
        ).then(data => {
          return data.json();
        });
      }
      const { meals } = data;
      if (!meals) return;
      this.#mealsData = meals.map(meal => ({
        mealName: meal.strMeal,
        mealId: meal.idMeal,
        mealImg: meal.strMealThumb,
        isBookmarked: false,
      }));

      if (this.#bookmarkedMeals.length > 0) {
        this.#bookmarkedMeals.forEach(bookmark =>
          this.#mealsData.forEach(meal => {
            if (bookmark.mealId === meal.mealId) meal.isBookmarked = true;
          })
        );
      }
    } catch (err) {
      throw err;
    }
  };

  //* ( fetch meals data based on selected type )
  _fetchMealsDataByType = async (subCat, cat) => {
    try {
      this._renderSpinner(recipesListContainer);
      await this._fetchData(cat, subCat);
      this._renderRecipesThumbnails();
    } catch (e) {
      this._renderErrorMessage();
    }
  };

  //* -------------------------------------------------------------------------------

  //* ( render bottom navigation recipes subcategories )
  _renderBottomRecipesNav = async type => {
    const filteredType = type === 'category' ? 'c' : 'a';
    return await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?${filteredType}=list`
    ).then(res => res.json());
  };

  //* ( render recipes thumbnails )
  _renderRecipesThumbnails = (
    bookmark = false,
    ownRecipe = false,
    recentlyViewed = false
  ) => {
    let deleteRecipeBtn = '';
    let mealsArray = bookmark
      ? this.#bookmarkedMeals // przypisujemy listę z bookmarkami
      : ownRecipe // sprawdzamy czy jest to przepis użytkownika
      ? this.#yourMeals // przypisujemy liste z przepisami użytkownika
      : recentlyViewed // sprawdzamy czy jest to widok ostatnio przeglądanych
      ? this.#recentlyViewedMeals // przypisujemy liste z ostatnio przegladanymi
      : this._renderMainViewThumbnailsArray(); // renderujemy glowny widok
    if (ownRecipe && this.#yourMeals.length < 1) {
      this._rerenderContainer(
        recipesListContainer,
        '<h2 class="yourmeals-empty">You don\'t have any meals yet!</h2>'
      );
      this._clearContainer(recipesPagination);
      return;
    }

    if (ownRecipe) {
      deleteRecipeBtn = `
      <span class="delete-own-recipe">
        <svg data-delete-recipe width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 6H20L18.42 20.22C18.3658 20.7094 18.1331 21.1616 17.7663 21.49C17.3994 21.8184 16.9244 22 16.432 22H7.568C7.07564 22 6.60056 21.8184 6.23375 21.49C5.86693 21.1616 5.63416 20.7094 5.58 20.22L4 6Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7.345 3.147C7.50675 2.80397 7.76271 2.514 8.083 2.31091C8.4033 2.10782 8.77474 2 9.154 2H14.846C15.2254 1.99981 15.5971 2.10755 15.9176 2.31064C16.2381 2.51374 16.4942 2.80381 16.656 3.147L18 6H6L7.345 3.147Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2 6H22" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M10 11V16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M14 11V16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg> 
      </span>`;
    }
    const thumbnailMarkup = `
    ${mealsArray
      .map(
        meal =>
          `
          <li class="recipe ${recentlyViewed ? 'recipe--recently' : ''}">
          <span class="recipe__name ${
            recentlyViewed ? 'recipe__name--recently' : ''
          }">${meal.mealName}</span>
          <img
            src="${meal.mealImg ? meal.mealImg : './src/images/food-img.jpg'}"
            alt="recipe img"
            class="recipe__img ${recentlyViewed ? 'recipe__img--recently' : ''}"
          />
          <div class="recipe__nav">
            <div class="recipe__details" data-id="${
              meal.mealId
            }">Details &rarr;</div>
            ${deleteRecipeBtn}
            <div class="recipe__bookmark" data-id="${meal.mealId}">
              ${
                meal.isBookmarked || bookmark
                  ? '<img class="recipe__bookmark-icon" src="./src/images/bookmark-fill.svg" alt="bookmarked">'
                  : '<img class="recipe__bookmark-icon" src="./src/images/bookmark_recipe.svg" alt="not-bookmarked"/>'
              }
            </div>
          </div>
        </li>
      `
      )
      .join('')}
    `;

    if (recentlyViewed) {
      this._rerenderContainer(recentlyViewedMealsContainer, thumbnailMarkup);
      return;
    }
    if (!bookmark)
      this._rerenderContainer(recipesListContainer, thumbnailMarkup);
    if (bookmark) this._rerenderContainer(bookmarksList, thumbnailMarkup);
  };

  //* ( render single recipe view )
  _renderSingleRecipeView = recipe => {
    const markup = `
      <span class="return-arrow">
        <img src="./src/images/return.svg" alt="return arr" >
      </span>
      <span class="recipe__name recipe__name--cook"
      >${recipe._name}</span>
      <img
        src="${recipe._img ? recipe._img : './src/images/food-img.jpg'}"
        alt="${recipe._name} img"
        class="recipe__img--cook"
      />
      <div class="meal">
        <div class="ingredients-wrapper">
          <h3 class="meal__header">Ingredients</h3>
          <ul class="meal__ingredients">
            ${recipe._ingredients
              .map((ingredient, i) =>
                ingredient
                  ? `<li class="meal__ingredient">${
                      recipe._measures
                        ? recipe._measures[i] + ' ' + ingredient
                        : ingredient
                    }</li>`
                  : ''
              )
              .join('')}
          </ul>
        </div>
        <div class="cook-wrapper">
          <h3 class="meal__header">How to cook it</h3>
          <p class="meal__recipe">
            ${recipe._howCook}
          </p>
        </div>
      </div>
    </div>
      `;

    this._rerenderContainer(recipeDetails, markup);
    [recipesWrapper, recipesPagination].forEach(
      el => (el.style.display = 'none')
    );
    recipeDetailsContainer.classList.remove('el-gone');
    setTimeout(() => {
      recipesWrapper.classList.add('hide-recipe');
      recipesPagination.classList.add('hide-recipe');
      recipeDetailsContainer.classList.remove('hide-recipe');
    }, 200);
    backToRecipesViewArr = document.querySelector('.return-arrow');
    this._backToThumbnailView();
  };

  //* ( render subcategories markup )
  _renderSubCategoriesMarkup = subCategories => {
    const type = subCategories[0].strArea ? 'strArea' : 'strCategory';
    return subCategories.map(subCat => {
      if (subCat[type] == this.#actualMealSubCat)
        return `<li class="recipes-nav__item recipes-nav__item--bottom recipes-nav__item--active">${subCat[type]}</li>`;
      else
        return `<li class="recipes-nav__item recipes-nav__item--bottom">${subCat[type]}</li>`;
    });
  };

  //* (rerender bottom recipes nav based on main type)
  _handleRecipesCategoryChange = () => {
    recipesNavTop.addEventListener('click', async e => {
      const target = e.target;
      if (!target.classList.contains('recipes-nav__item')) return;
      this._clearContainer(recipesListContainer);
      this._clearContainer(recipesPagination);

      recipeCategories.forEach(category =>
        category.classList.remove('recipes-nav__item--active')
      );
      target.classList.add('recipes-nav__item--active');
      const { type } = target.dataset;
      this.#selectedCategory = type;

      if (type === 'your-meals') {
        this._clearContainer(recipesListContainer);
        this._renderRecipesThumbnails(false, true);
        this.#actualMealSubCat = null;
        this.#mealsData = this.#yourMeals;
        this._clearContainer(recipesNavBottom);
        return;
      }
      if (type === 'random') {
        this.#isViewRandom = true;
        const getMealData = async () => {
          try {
            const mealRes = await fetch(
              'https://www.themealdb.com/api/json/v1/1/random.php'
            );
            const mealData = await mealRes.json();
            this.#mealDetails = await this._fetchMealDetails(
              mealData.meals[0].idMeal
            );
            this._renderSingleRecipeView(this.#mealDetails);
          } catch (err) {
            this._renderErrorMessage();
          }
        };

        this._clearContainer(recipesNavBottom);
        getMealData();
      } else {
        const { meals: data } = await this._renderBottomRecipesNav(
          this.#selectedCategory
        );
        this.#subCategories = data.splice(0, 11);
        const markup = this._renderSubCategoriesMarkup(this.#subCategories);
        this._rerenderContainer(recipesNavBottom, markup);
      }
    });
  };

  //* ( highlight actual subcategory )
  _handleSubCatHighlight = subCat => {
    if (subCat === undefined) return;
    const subCategoriesClass = subCat.classList[1];
    const subCategoriesList = document.querySelectorAll(
      `.${subCategoriesClass}`
    );
    subCategoriesList.forEach(category =>
      category.classList.remove('recipes-nav__item--active')
    );
    subCat.classList.add('recipes-nav__item--active');
    this._clearContainer(recipesPagination);
  };

  _displayRecipesListByType = () => {
    recipesNavBottom.addEventListener('click', e => {
      const target = e.target;
      if (target === recipesNavBottom) return;
      const selectedSubCat = target.textContent;
      this._fetchMealsDataByType(selectedSubCat, this.#selectedCategory);
      this._handleSubCatHighlight(target);
      this.#curPage = 1;
      setTimeout(() => {
        this.#curPage = 1;
        const paginationMarkup = this._renderPaginationMarkup();
        this._rerenderContainer(recipesPagination, paginationMarkup);
        this.#pagesList = Array.from(
          document.querySelectorAll('.recipes-pagination__page')
        );
      }, 500);
    });
  };

  //* ( display meals thumbnails based on entered key )
  _displayRecipesByKey = () => {
    recipesSearchBar.addEventListener('keydown', async e => {
      const { value } = e.target;
      if (value.length < 2) return;
      const recipesOptions = Array.from(
        document.querySelectorAll('.recipes-nav__item')
      );
      if (
        recipesOptions.some(recipe =>
          recipe.classList.contains('recipes-nav__item--active')
        )
      )
        recipesOptions.forEach(option =>
          option.classList.remove('recipes-nav__item--active')
        );
      await this._fetchData(null, null, value);
      this._renderRecipesThumbnails();
    });
  };

  //* ( handling meal details display )
  _handleMealDetailsBtn = async target => {
    try {
      if (!target.classList.contains('recipe__details')) return;
      const recipeId = target.dataset.id;
      if (this.#actualMealSubCat !== null) {
        this.#mealDetails = await this._fetchMealDetails(recipeId);
        this._renderSingleRecipeView(this.#mealDetails);
      }
      if (this.#actualMealSubCat === null) {
        const selectedThumbnail = this.#yourMealsDetails.find(
          meal => meal._id === target.dataset.id
        );
        this._renderSingleRecipeView(selectedThumbnail);
      }
      const selectedThumbnail = this.#mealsData.find(
        meal => meal.mealId === recipeId
      );
      this._handleRecentlyMealsChange(selectedThumbnail);
    } catch (e) {
      this._renderErrorMessage();
    }
  };

  //* (display text in bookmarks when container is empty)
  _isSomethingBookmarked = () => {
    if (this.#bookmarkedMeals.length === 0)
      this._rerenderContainer(
        bookmarksList,
        '<h2 class="bookmarked-recipes__empty">You don\'t have any bookmarks yet!</h2>'
      );
  };

  //* ( handle bookmark status change by cliking on a thumbnail bookmark icon )
  _handleBookmarksChange = target => {
    if (!target.classList.contains('recipe__bookmark-icon')) return;
    let bookmarkIconMarkup;
    const imgContainer = target.closest('.recipe__bookmark');
    const img = imgContainer.querySelector('.recipe__bookmark-icon');
    img.getAttribute('alt') === 'not-bookmarked'
      ? (bookmarkIconMarkup =
          '<img class="recipe__bookmark-icon" src="./src/images/bookmark-fill.svg" alt="bookmarked">')
      : (bookmarkIconMarkup =
          '<img class="recipe__bookmark-icon" src="./src/images/bookmark_recipe.svg" alt="not-bookmarked">');
    this._rerenderContainer(imgContainer, bookmarkIconMarkup);
    const bookmarkedRecipeId = imgContainer.dataset.id;
    const bookmarkedRecipe = this.#mealsData.find(
      meal => meal.mealId === bookmarkedRecipeId
    );
    const isElementBookmarked = this.#bookmarkedMeals.some(
      bookmark => bookmark.mealId === bookmarkedRecipe.mealId
    );
    const mealIndex = this.#mealsData.findIndex(
      meal => meal.mealId === bookmarkedRecipeId
    );

    //* Mark as bookmark on recently viewed list
    const indexOnRecList = this.#recentlyViewedMeals.findIndex(
      meal => meal.mealId === bookmarkedRecipeId
    );
    if (indexOnRecList !== -1) {
      this.#recentlyViewedMeals[indexOnRecList].isBookmarked =
        !this.#recentlyViewedMeals[indexOnRecList].isBookmarked;
      this._renderRecentlyMealsView();
    }

    if (isElementBookmarked) {
      this.#mealsData[mealIndex].isBookmarked = false;
      const bookmarkIndex = this.#bookmarkedMeals.findIndex(
        bookmark => bookmark === bookmarkedRecipe
      );
      this.#bookmarkedMeals.splice(bookmarkIndex, 1);
    }
    if (!isElementBookmarked) {
      this.#mealsData[mealIndex].isBookmarked = true;
      bookmarkedRecipe.subCat = this.#actualMealSubCat;
      this.#bookmarkedMeals.push(bookmarkedRecipe);
    }
    this._setLocalStorage('bookmarks', this.#bookmarkedMeals);
    this._renderRecipesThumbnails(true);
    this._isSomethingBookmarked();
  };

  _deleteRecipe = target => {
    if (target.dataset.deleteRecipe === undefined) return;
    const thumbnailId = target
      .closest('.delete-own-recipe')
      .parentNode.querySelector('.recipe__details').dataset.id;
    this.#yourMeals = this.#yourMeals.filter(
      meal => meal.mealId !== thumbnailId
    );
    this.#yourMealsDetails = this.#yourMealsDetails.filter(
      meal => meal._id !== thumbnailId
    );
    this.#bookmarkedMeals = this.#bookmarkedMeals.filter(
      meal => meal.mealId !== thumbnailId
    );
    this.#recentlyViewedMeals = this.#recentlyViewedMeals.filter(
      meal => meal.mealId != thumbnailId
    );
    this._renderRecipesThumbnails(false, true);
    this._renderRecipesThumbnails(true);
    this._renderRecentlyMealsView();
    this._setLocalStorage('yourMealsDetails', this.#yourMealsDetails);
    this._setLocalStorage('yourMeals', this.#yourMeals);
    this._setLocalStorage('bookmarks', this.#bookmarkedMeals);
  };

  //* ( display recipe details from bookmarks and recently viewed recipes View )
  _displayRecipe = async target => {
    try {
      if (!target.classList.contains('recipe__details')) return;
      const recipeId = target.dataset.id;
      bookmarksWrapper.classList.add('bookmarked-recipes--hidden');
      backdrop.classList.add('recipes-view__backdrop--hidden');
      this._bookmarksVisible = false;
      if (recipeId.length !== 7)
        this.#mealDetails = await this._fetchMealDetails(recipeId);
      if (recipeId.length === 7)
        this.#mealDetails = this.#yourMealsDetails.find(
          meal => meal._id === recipeId
        );

      this._renderSingleRecipeView(this.#mealDetails);
      for (const li of recipesNavBottom.querySelectorAll('li'))
        if (li.textContent.includes(this.#mealDetails._category))
          this.#actualMealSubCatNode = li;

      this._handleSubCatHighlight(this.#actualMealSubCatNode);
    } catch (e) {
      this._renderErrorMessage();
    }
  };

  //* (handle bookmarks list events)
  _handleBookmarksListChange = () => {
    const deleteBookmark = target => {
      if (!target.classList.contains('recipe__bookmark-icon')) return;
      const imgContainer = target.closest('.recipe__bookmark');
      const bookmarkedRecipeId = imgContainer.dataset.id;
      const bookmarkIndex = this.#bookmarkedMeals.findIndex(
        bookmark => bookmark.mealId === bookmarkedRecipeId
      );

      if (
        this.#actualMealSubCat === this.#bookmarkedMeals[bookmarkIndex].subCat
      ) {
        const mealIndex = this.#mealsData.findIndex(
          meal => meal.mealId === bookmarkedRecipeId
        );
        this.#mealsData[mealIndex].isBookmarked = false;
      }

      this.#bookmarkedMeals.splice(bookmarkIndex, 1);
      this._setLocalStorage('bookmarks', this.#bookmarkedMeals);
      this._renderRecipesThumbnails(true);
      this._renderRecipesThumbnails();
      this._isSomethingBookmarked();
    };

    bookmarksList.addEventListener('click', e => {
      deleteBookmark(e.target);
      this._displayRecipe(e.target);
    });
  };

  //* ( handling events by clicking on a thumbnail )
  _controlRecipeThumbnailEvents = () => {
    recipesListContainer.addEventListener('click', e => {
      this._handleBookmarksChange(e.target);
      this._handleMealDetailsBtn(e.target);
      this._deleteRecipe(e.target);
    });
  };

  //* (back to the recipes view)
  _backToThumbnailView = () => {
    backToRecipesViewArr.addEventListener('click', async () => {
      [recipesWrapper, recipesPagination].forEach(
        el => (el.style.display = 'flex')
      );
      recipeDetailsContainer.classList.add('el-gone');
      setTimeout(() => {
        recipesWrapper.classList.remove('hide-recipe');
        recipesPagination.classList.remove('hide-recipe');
        recipeDetailsContainer.classList.add('hide-recipe');
      }, 200);
      if (this.#isViewRandom) {
        this._fetchMealsDataByType();
        recipeCategories[0].classList.add('recipes-nav__item--active');
        recipeCategories[2].classList.remove('recipes-nav__item--active');
        const { meals: data } = await this._renderBottomRecipesNav('category');
        this.#subCategories = data.slice(0, 11);

        const markup = this._renderSubCategoriesMarkup(this.#subCategories);
        this._rerenderContainer(recipesNavBottom, markup);
      }
      if (this.#actualMealSubCatNode !== undefined) {
        this._fetchMealsDataByType(
          this.#actualMealSubCatNode.textContent,
          'category'
        );
      }
      this._renderRecentlyMealsView();
    });
  };

  //* (add your own recipe)
  _handleRecipeAdd = () => {
    const validateForm = (mealNameVal, descriptionVal, ingredientsVal) => {
      descriptionVal = descriptionVal.split(' ');
      let isFormValid = true;
      let ingredientsNumber = 0;
      if (mealNameVal.length < 3) {
        mealNameF.classList.add('input-invalid');
        inputInvalidInfo[0].classList.remove('input-invalid-info--hidden');
        isFormValid = false;
      }

      if (descriptionVal.length < 20 || descriptionVal.length > 200) {
        mealDescriptionF.classList.add('input-invalid');
        inputInvalidInfo[1].classList.remove('input-invalid-info--hidden');
        isFormValid = false;
      }
      for (const ingredient of ingredientsVal)
        ingredient === undefined ? ingredientsNumber : ingredientsNumber++;
      if (ingredientsNumber < 4) {
        for (let i = 0; i < ingredientsF.length; i++) {
          if (ingredientsVal[i] === undefined)
            ingredientsF[i].classList.add('input-invalid');
        }
        inputInvalidInfo[2].classList.remove('input-invalid-info--hidden');
        isFormValid = false;
      }
      return isFormValid;
    };

    formInputsGroup.addEventListener('click', e => {
      if (!e.target.classList.contains('form__input')) return;
      if (e.target.classList.contains('form__input--ingredient'))
        ingredientsF.forEach(ing => ing.classList.remove('input-invalid'));
      e.target.classList.remove('input-invalid');
      e.target.nextElementSibling.nextElementSibling?.classList.add(
        'input-invalid-info--hidden'
      );
    });

    formWrapper.addEventListener('submit', e => {
      e.preventDefault();
      const mealNameVal = mealNameF.value;
      const mealImgVal = mealImgF.value;
      const mealDecriptionVal = mealDescriptionF.value;
      const ingredientsVal = ingredientsF.map(ingredient => {
        if (ingredient.value.trim() !== '') return ingredient.value;
      });
      if (!validateForm(mealNameVal, mealDecriptionVal, ingredientsVal)) return;
      let mealId = Date.now().toString().slice(-7);
      const recipe = {
        mealName: mealNameVal,
        mealId,
        mealImg: mealImgVal,
        isBookmarked: false,
      };
      this.#yourMeals.push(recipe);
      this._setLocalStorage('yourMeals', this.#yourMeals);

      this.#yourMealOb = new MealRecipe(
        mealNameVal,
        mealId,
        null,
        mealDecriptionVal,
        mealImgVal,
        ingredientsVal,
        null
      );
      this.#yourMealsDetails.push(this.#yourMealOb);
      this._setLocalStorage('yourMealsDetails', this.#yourMealsDetails);
      if (this.#actualMealSubCat === null) {
        this.#mealsData = this.#yourMeals;
        this._renderRecipesThumbnails(false, true);
      }
      this._formVisible = false;
      formWrapper.classList.toggle('display-form');
      addRecipeIcon.classList.toggle('rotate-btn');
      backdrop.classList.toggle('recipes-view__backdrop--hidden');
      document.querySelector('form').reset();
    });
  };

  //* ( handle recently viewed meals change )
  _handleRecentlyMealsChange = meal => {
    const isElementOnList = this.#recentlyViewedMeals.some(
      recipe => recipe.mealId === meal.mealId
    );
    if (isElementOnList) return;
    if (this.#recentlyViewedMeals.length > 2) {
      this.#recentlyViewedMeals.splice(-1, 1);
    }
    this.#recentlyViewedMeals.unshift(meal);
    for (const recMeal of this.#recentlyViewedMeals) {
      const searchedEl = this.#mealsData.find(
        meal => meal.mealId === recMeal.mealId
      );
      if (searchedEl?.isBookmarked) recMeal.isBookmarked = true;
    }
  };

  _renderRecentlyMealsView = () =>
    this._renderRecipesThumbnails(false, false, true);

  //* ( display meal by clicking on details button )
  _handleRecentlyViewedMealsEvent = () => {
    recentlyViewedMealsContainer.addEventListener('click', e => {
      this._displayRecipe(e.target);
    });
  };

  //* ( render number of pages )
  _renderPaginationMarkup = () => {
    const renderPageNumberIcon = numberOfPages => {
      let markup = '';
      for (let i = 0; i < numberOfPages; i++) {
        markup += `<span class="recipes-pagination__page ${
          i === 0 ? 'recipes-pagination__page--active' : ''
        }">${i + 1}</span>`;
      }
      return markup;
    };
    this.#numberOfPages = Math.ceil(this.#mealsData.length / 18);
    return `
    <span
    ><img class="page-down" src="src/images/arr_backward.svg" /></span>
    ${renderPageNumberIcon(this.#numberOfPages)}
    <span><img class="page-up" src="src/images/arr_forward.svg" /></span>
    `;
  };

  //* ( render certain number of meals thumbnails on a page )
  _renderMainViewThumbnailsArray = () =>
    this.#mealsData.slice((this.#curPage - 1) * 18, this.#curPage * 18);

  //* ( handle page change )
  _handleCurPageChange = () => {
    const pageUpDown = pageUp => {
      let prevPageIndex;
      let condition;
      condition = pageUp
        ? this.#curPage + 1 > this.#numberOfPages
        : this.#curPage === 1;
      if (condition) return;
      for (const page of this.#pagesList)
        if (page.textContent == this.#curPage.toString())
          prevPageIndex = this.#pagesList.findIndex(
            prevPage => prevPage === page
          );

      pageUp ? this.#curPage++ : this.#curPage--;
      this.#pagesList[prevPageIndex].classList.remove(
        'recipes-pagination__page--active'
      );
      this.#pagesList[this.#curPage - 1].classList.add(
        'recipes-pagination__page--active'
      );
      this._renderRecipesThumbnails();
    };
    recipesPagination.addEventListener('click', e => {
      const target = e.target;
      if (target.classList.contains('recipes-pagination__page')) {
        this.#curPage = parseInt(target.textContent, 10);
        this.#pagesList.forEach(page =>
          page.classList.remove('recipes-pagination__page--active')
        );
        target.classList.add('recipes-pagination__page--active');
        this._renderRecipesThumbnails();
      }
      if (target.classList.contains('page-up')) pageUpDown(true);
      if (target.classList.contains('page-down')) pageUpDown(false);
    });
  };

  //* ( render spinner )
  _renderSpinner = container => {
    const markup =
      '<div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
    this._rerenderContainer(container, markup);
  };

  //* ( render error message )
  _renderErrorMessage = () => {
    const errorNode = document.createElement('div');
    errorNode.className = 'error-msg';
    errorNode.textContent = this.#errMessage;
    this._clearContainer(pageBody);
    pageBody.appendChild(errorNode);
  };
}

new App();
