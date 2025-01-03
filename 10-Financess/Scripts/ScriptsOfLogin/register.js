firebase.auth().onAuthStateChanged(function(user){
    if (user) {
        window.location.href="/Pages/home.html";
    }
})


function onChangeEmail() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none":"block"; 

    form.emailInvalidError().style.display = validateEmail(email)  ? "none":"block";

    toogleRegisterButtonDisable()
}

function onChangePassword() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none":"block";

    form.passwordMinLengthMatchError().style.display = password.length >= 6 ? "none":"block";

    validatePasswordMatch();

    toogleRegisterButtonDisable()
}

function onChangeConfirmPassword() {
    validatePasswordMatch();

    toogleRegisterButtonDisable()
}

function validatePasswordMatch() {
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;

    form.passwordDoesntMatchError().style.display = password == confirmPassword ? "none":"block";
}

function isFormValid() {
    const email = form.email().value;
    if (!email || !validateEmail(email)) {
        return false;
    }
    const password = form.password().value;
    if (!password || !password.length < 6) {    
        return false;
    }
    const confirmPassword = form.confirmPassword().value;
    if (password != confirmPassword) {
        return false;
    }

    return true;
}

function toogleRegisterButtonDisable() {
    form.registerButton().disabled = isFormValid()
}

function register() {
    showLoading();
    const password = form.password().value;
    const email = form.email().value;

    firebase.auth().createUserWithEmailAndPassword(email,password).then(() =>{
        hideLoading();
        window.location.href = "/Pages/home.html"
    }).catch(error =>{
        hideLoading();
        alert(getErrorMessage(error));
    });
}

function getErrorMessage(error) {
    if (error.code = "auth/email-already-in-use") {
        return "este email já esta cadrastado!";
    }
    return error.message;
}

const form = {
    confirmPassword: () => document.getElementById("confirmPassword"),
    passwordDoesntMatchError: () => document.getElementById("password-doesnt-match-error"),
    email: () => document.getElementById("email"),
    emailInvalidError: () => document.getElementById("email-invalid-error"),
    emailRequiredError: () => document.getElementById("email-required-error"),
    password: () => document.getElementById("password"),
    passwordRequiredError:  () => document.getElementById("password-required-error"),
    passwordMinLengthMatchError: () => document.getElementById("password-min-length-error"),
    registerButton: () => document.getElementById("register-button")
}