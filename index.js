document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    
    const firstNameInput = document.querySelector('[name="firstName"]');
    const lastNameInput = document.querySelector('[name="lastName"]');
    const emailInput = document.querySelector('[name="email"]');
    const contactNumberInput = document.querySelector('[name="contactNumber"]');
    
    const getField = (name) => ({ 
        element: document.querySelector(`[name="${name}"]`), 
        value: document.querySelector(`[name="${name}"]`).value.trim() 
    }); 

    if (firstNameInput) {
        firstNameInput.addEventListener('keyup', () => validateField('firstName', isValidName, 'Invalid Name.'));
    }
    if (lastNameInput) {
        lastNameInput.addEventListener('keyup', () => validateField('lastName', isValidName, 'Invalid Name.'));
    }
    if (emailInput) {
        emailInput.addEventListener('keyup', () => validateField('email', isValidEmail, 'Invalid Email Address'));
    }
    if (contactNumberInput) {
        contactNumberInput.addEventListener('keyup', () => validateField('contactNumber', isValidPhone, 'Invalid Phone Number.'));
    }

    function validateField(name, validationFunction, errorMessage) {
        const field = getField(name);
        
        clearErrorsForElement(field.element);

        if (field.value === "") {
            if (field.element.value.length > 0) {
                 displayError(field.element, `${field.element.placeholder.split(' ')[0]} is required.`);
            }
            return false;
        } 
        
        else if (!validationFunction(field.value)) {
            displayError(field.element, errorMessage);
            return false;
        }
        
        return true;
    }

    form.addEventListener('submit', function(event) {
        const allValid = validateAllFieldsOnSubmit();

        if (!allValid) {
            event.preventDefault(); 
        } else {
            event.preventDefault(); 
            alert('Thank you! Your message has been prepared for sending. Please check through your email inbox.');
            form.reset(); 
        }
    });

    function validateAllFieldsOnSubmit() {
        let isValid = true;
        
        isValid = validateField('firstName', isValidName, 'Invalid Name.') && isValid;
        isValid = validateField('lastName', isValidName, 'Invalid Name.') && isValid;
        isValid = validateField('email', isValidEmail, 'Invalid Email Address.') && isValid;
        isValid = validateField('contactNumber', isValidPhone, 'Invalid Phone') && isValid;
        
        return isValid;
    }
    
    function isValidName(name) {
        const re = /^[a-zA-Z\s]{2,60}$/;
        return re.test(name);
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function isValidPhone(phone) {
        const re = /^09[0-9]{9}$/;
        return re.test(String(phone));
    }
    
    function displayError(inputElement, message) {
        if (!inputElement.parentNode.querySelector('.error-message')) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message'; 
            errorDiv.textContent = message;
            
            inputElement.parentNode.insertBefore(errorDiv, inputElement.nextSibling);
        }
        inputElement.classList.add('input-error'); 
    }

    function clearErrorsForElement(inputElement) {
        const errorDiv = inputElement.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
        inputElement.classList.remove('input-error');
    }

    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
    }
});

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("carousel-slide")[0].getElementsByTagName("img");
    
    if (n > slides.length) {
        slideIndex = 1
    } 
    if (n < 1) {
        slideIndex = slides.length
    }
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    
    slides[slideIndex - 1].style.display = "block";  
}