/**
 *
 * Form
 *
 */

window.addEventListener('DOMContentLoaded', (event) => {

  const formsList = document.querySelectorAll(".js_form"); // Какие формы будем валидировать
  const inputComponentsClassName = '.js_form-control';


  // Тут же и устанавливается обработчик
  function initForms(formsList) {
    formsList.forEach((form) => {
      if (form.classList.contains('js_form--inited')) return;

      form.classList.add('js_form--inited');
      form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const inputsToValidate = [
          ...form.querySelectorAll(inputComponentsClassName)
        ];

        inputsToValidate.forEach((input) => {
          validateInput(input);
        });

       // Ссылка на обработчик берется из action атрибута формы из formsList
        console.log('Форма валидная')
    /*    const formBody = new FormData(form);
        let response = await fetch(form.action, {
          method: "POST",
          body: formBody,
        });
        try {
          let result = await response.json();
          console.log("form_sent");
        } catch {

        }
    */  });
    })
  }
  initForms(formsList);
  window.initForms = () => {
    initForms(document.querySelectorAll(".js_form"));
  }

  const inputs = document.querySelectorAll(".js_form .js_form-control");
  const inputsStates = {
    invalid: "is-invalid",
    inited: "input--inited",
    active: "input--active",
  };

  initInputs(inputs);
  window.initInputs = () => {
    initInputs(document.querySelectorAll(".js_form .js_form-control"));
  }

  function initInputs(inputs) {
    inputs.forEach((input) => {
      if (input.classList.contains(inputsStates.inited)) return;
      input.classList.add(inputsStates.inited);

      const field = input.querySelector("[required]");

      if (!field) return;

      field.addEventListener("blur", () => {
        if (field.value != "") {
          validateInput(input);
        }
      });

      field.addEventListener('input', () => {
        setInputValid(input);
      });
      field.addEventListener('change', () => {
        setInputValid(input);
      })

      if (field.type != "email" && field.type != "tel") {
        field.addEventListener("input", (e) => {
          validateInput(input);
        });
      }

      if (field.value !== "") {
        input.classList.add(inputsStates.active);
      }
    });
  }

  disableDefaultInvalid();
  function disableDefaultInvalid() {
    // Выключает стандартные подсказки валидации
    document.addEventListener(
      "invalid",
      (function (e) {
        return function (e) {
          e.preventDefault();
          const input = e.target.closest(inputComponentsClassName);
          setInputInvalid(input);

          if (e.target.form.querySelector(`.${inputsStates.invalid}`) == undefined) return
          e.target.form.querySelector(`.${inputsStates.invalid}`).focus();
        };
      })(),
      true
    );
  }

  function setInputInvalid(input) {
    input = input.classList.contains('iti') ? input.parentElement : input;

    input.classList.add(inputsStates.invalid);
    const field = input.querySelector('[required]');

    let isValid;

    if (field.validity != null) {
      isValid = field.validity.valid;
    } else if (field.checked) {
      isValid = field.checked;
    }

    if (field.validationMessage) {
      changeErrorText(input);
    }

    return isValid;
  }

  function setInputValid(input) {
    input.classList.remove(inputsStates.invalid);
    const field = input.querySelector("[required]");

    let isValid;
    if (field.validity != null) {
      isValid = field.validity.valid;
    } else if (field.checked) {
      isValid = field.checked;
    }

    if (field.validationMessage) {
      changeErrorText(input);
    }
    return isValid;
  }

  function changeErrorText(input) {
    return
    const field = input.querySelector("[required]");
    const error = input.querySelector(".input__message");
    if (error) {
      error.innerText = field.validationMessage;
    }
  }

  function validateInput(input) {
    const field = input.querySelector("[required]");
    if (field == null) return;

    if (field.type == "tel") {
      return validatePhone(input);
    } else if (field.type == "email") {
      return validateEmail(input);
    } else {
      return validateInputLength(input);
    }
  }

  function validateInputLength(input) {
    const field = input.querySelector("[required]");
    if (!field) return;
    const MAX_VALUE_LENGTH = {
      input: 200,
      textarea: 1000,
    }
    let lengthToCheck = MAX_VALUE_LENGTH.input
    if (field.tagName.toLowerCase() === 'textarea') {
      lengthToCheck = MAX_VALUE_LENGTH.textarea
    }

    if (field.value.length == 0) {
      return setInputInvalid(input);
    } else if (field.value.length > lengthToCheck) {
      return setInputInvalid(input);
    } else {
      return setInputValid(input);
    }
  }

  function validatePhone(input) {
    const field = input.querySelector("[required]");
    let regex = /^(\+7|8)?[\-\s]?\(?\d{3}\)?[\-\s]?\d{3}[\-\s]?\d{2}[\-\s]?\d{2}$/;
    if (regex.test(field.value)) {
      return setInputValid(input);
    } else {
      return setInputInvalid(input);
    }
  }

  function validateEmail(input) {
    const field = input.querySelector("[required]");
    let regex =
      // eslint-disable-next-line no-control-regex
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (!regex.test(field.value)) {
      return setInputInvalid(input);
    } else {
      return setInputValid(input);
    }
  }
  
});
