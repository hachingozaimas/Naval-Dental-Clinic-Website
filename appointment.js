const fullName = document.getElementById("fullName");
const genders = document.getElementById("genders");
const address = document.getElementById("address")
const city = document.getElementById("city");
const province = document.getElementById("province");
const zip = document.getElementById("zip")
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const date = document.getElementById("date")
const time = document.getElementById("time");
const reason = document.getElementById("reason");
const submit = document.getElementById("submit")

const namePattern = /^[a-zA-Z\s.]{2,100}$/;
const addressPattern = /^[a-zA-Z0-9\s,.]{5,50}$/;
const locationPattern = /^[a-zA-Z\s]{2,50}$/;
const zipCodePattern = /^[0-9]{4}$/;
const numberPattern = /^09[0-9]{9}$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validateField = (field, regex) => {
    if (regex.test(field.value.trim())) {
        field.classList.remove("input-error");
        field.classList.add("input-success");
        return true;
    } else {
        field.classList.remove("input-success");
        field.classList.add("input-error");
        return false;
    }
};


const validateRequired = (field) => {
    if (field.value !== "") {
        field.classList.remove("input-error");
        field.classList.add("input-success");
        return true;
    } else {
        field.classList.remove("input-success");
        field.classList.add("input-error");
        return false;
    }
};


const validateGender = () => {
    const radios = document.getElementsByName("gender");
    let isChecked = false;
    for (let radio of radios) {
        if (radio.checked) isChecked = true;
    }
   
    if (isChecked) {
        genders.classList.remove("group-error-highlight");
        genders.classList.add("group-success-highlight");
        return true;
    } else {
        genders.classList.remove("group-success-highlight");
        genders.classList.add("group-error-highlight");
        return false;
    }
};


const validateReasons = () => {
    const checkboxes = document.querySelectorAll('input[name="reason"]:checked');
    if (checkboxes.length > 0) {
        reason.classList.remove("group-error-highlight");
        reason.classList.add("group-success-highlight");
        return true;
    } else {
        reason.classList.remove("group-success-highlight");
        reason.classList.add("group-error-highlight");
        return false;
    }
};

fullName.addEventListener("keyup", () => validateField(fullName, namePattern));
address.addEventListener("keyup", () => validateField(address, addressPattern));
city.addEventListener("keyup", () => validateField(city, locationPattern));
province.addEventListener("keyup", () => validateField(province, locationPattern));
zip.addEventListener("keyup", () => validateField(zip, zipCodePattern));
phone.addEventListener("keyup", () => validateField(phone, numberPattern));
email.addEventListener("keyup", () => validateField(email, emailPattern));
date.addEventListener("change", () => validateRequired(date));
time.addEventListener("change", () => validateRequired(time));
genders.addEventListener("change", validateGender);
reason.addEventListener("change", validateReasons);

const termsModal = document.getElementById("termsModal");
const closeModal = document.getElementById("closeModal");
const acceptTerms = document.getElementById("acceptTerms");


submit.addEventListener("click", (event) => {
    event.preventDefault();  


    const nameChecker = validateField(fullName, namePattern);
    const addressChecker = validateField(address, addressPattern);
    const cityChecker = validateField(city, locationPattern);
    const provinceChecker = validateField(province, locationPattern);
    const zipChecker = validateField(zip, zipCodePattern);
    const phoneChecker = validateField(phone, numberPattern);
    const emailChecker = validateField(email, emailPattern);
    const dateChecker = validateRequired(date);
    const timeChecker = validateRequired(time);
    const genderChecker = validateGender();
    const reasonChecker = validateReasons();


    if (
        nameChecker &&
        addressChecker &&
        cityChecker &&
        provinceChecker &&
        zipChecker &&
        phoneChecker &&
        emailChecker &&
        dateChecker &&
        timeChecker &&
        genderChecker &&
        reasonChecker
    ) {
        termsModal.style.display = "block";
    } else {
        alert("Please fill out all the fields highlighted in red");
        console.log("Submission Failed");
    }
});

closeModal.addEventListener("click", () => {
    termsModal.style.display = "none";
});


window.addEventListener("click", (event) => {
    if (event.target === termsModal) {
        termsModal.style.display = "none";
    }
});

acceptTerms.addEventListener("click", () => {
    termsModal.style.display = "none";
    alert("Form submitted successfully! Please check your email inbox for updates.");
    console.log("Submission Successful");

});
