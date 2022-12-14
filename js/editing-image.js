const Filters = {
  NONE: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
    format: {
      to: function (value) {
        return value;
      },
      from: function (value) {
        return parseFloat(value);
      }
    }
  },
  CHROME: {
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1,
    format: {
      to: function (value) {
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      }
    }
  },
  SEPIA: {
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1,
    format: {
      to: function (value) {
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      }
    }
  },
  MARVIN: {
    range: {
      min: 0,
      max: 100
    },
    start: 100,
    step: 1,
    format: {
      to: function (value) {
        return `${value}%`;
      },
      from: function (value) {
        return parseFloat(value);
      }
    }
  },
  PHOBOS: {
    range: {
      min: 0,
      max: 3
    },
    start: 3,
    step: 0.1,
    format: {
      to: function (value) {
        return `${value.toFixed(1)}px`;
      },
      from: function (value) {
        return parseFloat(value);
      }
    }
  },
  HEAT: {
    range: {
      min: 1,
      max: 3
    },
    start: 3,
    step: 0.1,
    format: {
      to: function (value) {
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      }
    }
  }
};

const MIN_SCALE = 25;
const MAX_SCALE = 100;
const STEP_SCALE = 25;

let filterType = 'none';

const form = document.querySelector('.img-upload__form');

const zoomOutButtonElement = form.querySelector('.scale__control--smaller');
const zoomButtonElement = form.querySelector('.scale__control--bigger');
const scaleValueElement = form.querySelector('.scale__control--value');
const imageElement = form.querySelector('.img-upload__preview img');

const filterButtonsContainerElement = form.querySelector('.effects__list');
const sliderElement = form.querySelector('.effect-level__slider');
const filterValueElement = form.querySelector('.effect-level__value');

const imageZoomOutHandler = () => {
  let scaleValue = parseInt(scaleValueElement.value, 10);
  if (scaleValue > MIN_SCALE) {
    scaleValue -= STEP_SCALE;
    scaleValueElement.value = `${scaleValue}%`;
    imageElement.style.transform = `scale(0.${scaleValue})`;
  }
};

const imageZoomInHandler = () => {
  let scaleValue = parseInt(scaleValueElement.value, 10);
  if (scaleValue < MAX_SCALE) {
    scaleValue += STEP_SCALE;
    scaleValueElement.value = `${scaleValue}%`;
    imageElement.style.transform = (scaleValue === MAX_SCALE) ? 'scale(1)' : `scale(0.${scaleValue})`;
  }
};

const addEventListenerImage = () => {
  zoomOutButtonElement.addEventListener('click', imageZoomOutHandler);
  zoomButtonElement.addEventListener('click', imageZoomInHandler);
};

const removeEventListenerImage = () => {
  zoomOutButtonElement.removeEventListener('click', imageZoomOutHandler);
  zoomButtonElement.removeEventListener('click', imageZoomInHandler);
};

const customiseFilter = (filterID) => {
  let filterClass;
  let options;
  switch (filterID) {
    case 'effect-none':
      filterClass = 'effects__preview--none';
      filterType = 'none';
      sliderElement.setAttribute('hidden', true);
      options = Filters.NONE;
      break;
    case 'effect-chrome':
      filterClass = 'effects__preview--chrome';
      filterType = 'grayscale';
      sliderElement.removeAttribute('hidden', true);
      options = Filters.CHROME;
      break;
    case 'effect-sepia':
      filterClass = 'effects__preview--sepia';
      filterType = 'sepia';
      sliderElement.removeAttribute('hidden', true);
      options = Filters.SEPIA;
      break;
    case 'effect-marvin':
      filterClass = 'effects__preview--marvin';
      filterType = 'invert';
      sliderElement.removeAttribute('hidden', true);
      options = Filters.MARVIN;
      break;
    case 'effect-phobos':
      filterClass = 'effects__preview--phobos';
      filterType = 'blur';
      sliderElement.removeAttribute('hidden', true);
      options = Filters.PHOBOS;
      break;
    case 'effect-heat':
      filterClass= 'effects__preview--heat';
      filterType = 'brightness';
      sliderElement.removeAttribute('hidden', true);
      options = Filters.HEAT;
      break;
  }
  imageElement.className = '';
  imageElement.classList.add(filterClass);
  sliderElement.noUiSlider.updateOptions(options);
};

const filterChangeHandler = (evt) => {
  if (evt.target.closest('.effects__item')) {
    customiseFilter(evt.target.id);
  }
};

const addFilter = () => {
  filterValueElement.value = 1;
  filterType = 'none';
  noUiSlider.create(sliderElement, Filters.NONE);
  sliderElement.setAttribute('hidden', true);
  filterButtonsContainerElement.addEventListener('change', filterChangeHandler);

  sliderElement.noUiSlider.on('update', () => {
    filterValueElement.value = parseFloat(sliderElement.noUiSlider.get());
    imageElement.style.filter = (filterType !== 'none') ? `${filterType}(${sliderElement.noUiSlider.get()})` : '';
  });
};

const removeFilters = () => {
  filterButtonsContainerElement.removeEventListener('change', filterChangeHandler);
  imageElement.className = '';
  imageElement.style.transform = 'scale(1)';
  document.querySelector('#effect-none').checked = true;
  sliderElement.noUiSlider.destroy();
};

export {form, addEventListenerImage, removeEventListenerImage, addFilter, removeFilters, scaleValueElement};
