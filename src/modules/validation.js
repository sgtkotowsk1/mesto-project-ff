const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  inputErrorClass
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, inputErrorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);

  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, settings) => {
  const { inputErrorClass } = settings;
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass
    );
  } else {
    hideInputError(formElement, inputElement, inputErrorClass);
  }
};

const hasInvalidInput = (inputList) =>
  inputList.some((inputElement) => !inputElement.validity.valid);

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const setEventListeners = (formElement, settings) => {
  const { inputSelector, submitButtonSelector, inactiveButtonClass } = settings;
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

const clearValidation = (formElement, settings) => {
  const { inputSelector, inputErrorClass, submitButtonSelector, inactiveButtonClass } = settings;

  const inputList = Array.from(formElement.querySelectorAll(inputSelector));

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, inputErrorClass);
  });

  const buttonElement = formElement.querySelector(submitButtonSelector);
  if (buttonElement) {
    buttonElement.classList.add(inactiveButtonClass); // Добавляем класс неактивности
    buttonElement.disabled = true; // Делаем кнопку неактивной
  }
};

const enableValidation = (settings) => {
  const { formSelector } = settings;

  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, settings);
  });
};

export { clearValidation, enableValidation };
