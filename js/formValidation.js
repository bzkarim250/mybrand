const contactMeForm = document.querySelector(".contact-me__form");
const email = document.querySelector(".email");
const message = document.querySelector(".message");
const emailError = document.querySelector(".email-error");
const messageError = document.querySelector(".message-error");
const confirmationMessage = document.querySelector(".confirmation__message");
const successIcon = document.querySelector('.success-icon');

contactMeForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const isValidEmailValue = isValidEmail(email.value);
    const isValidMessageValue = validateInput(message, messageError, "Message can not be empty!");

    if (!isValidEmailValue) {
        showError(emailError, "Enter a valid email");
    } else {
        hideError(emailError);
    }

    if (isValidEmailValue && isValidMessageValue) {
        showMessage(confirmationMessage, "Message Sent");
        showElement(successIcon);
        hideForm(contactMeForm);
        resetFormAfterDelay(contactMeForm, confirmationMessage, successIcon);
    }
});


const validateInput = (input, errorElement, errorMessage) => {
    const isValid = input.value.trim() !== '';
    if (!isValid) {
        showError(errorElement, errorMessage);
    } else {
        hideError(errorElement);
    }
    return isValid;
}

const showMessage = (element, message) => {
    element.textContent = message;
    showElement(element);
}

const showError = (element, message) => {
    element.textContent = message;
    showElement(element);
}

const hideError = (element) => {
    element.textContent = '';
    hideElement(element);
}

const showElement = (element) => {
    element.classList.remove("d-none");
}

const hideElement = (element) => {
    element.classList.add("d-none");
}

const hideForm = (form) => {
    hideElement(form);
}

const resetFormAfterDelay = (form, confirmationMessage, successIcon) => {
    setTimeout(() => {
        form.reset();
        hideElement(confirmationMessage);
        hideElement(successIcon);
        showElement(form);
    }, 2000);
}

const isValidEmail = (email) => {
    const regex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}
