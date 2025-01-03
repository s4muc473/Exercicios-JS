firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        window.location.href = "/Pages/home.html";
    }
});


function onchangeEmail() {
    toggleButtonsDisabled();
    toggleEmailErrors();
}

function onchangePassword() {
    toggleButtonsDisabled();
    togglePasswordError();
}

function login() {
    showLoading();

    firebase.auth().signInWithEmailAndPassword(form.email().value,form.password().value).then(response => {
        hideLoading();
        window.location.href = "home.html";
    }).catch ( error => {
        hideLoading();
        console.log("error",error.code)
    });
}

function getErrorMessage() {
    if (error.code == "auth/invalid-credential") {
        return "Usuario não encontrado ou senha invalida";
    } 
    return error.code;
}

function register() {
    window.location.href = "register.html";
}

function recoverPassword() {
    showLoading();
    firebase.auth().sendPasswordResetEmail(form.email().value).then(()=>{
        hideLoading();
    }).catch(error => {
        hideLoading();
    })
}
    
function isEmailValid() {
    const email = form.email().value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}

function isPasswordValid() {
    const password = form.password().value;
    if (!password) {
        return false;
    }
    return true;
}

function toggleEmailErrors() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";

    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";

}

function togglePasswordError() {
    const password = form.password().value; 
    form.passwordRequiredError().style.display = password ? "none" : "block";
}

function toggleButtonsDisabled() {
    const emailValid = isEmailValid();
    form.recoverPassword().disabled = !emailValid; 
    
    const passwordValid = isPasswordValid();
    form.loginButton().disabled = !emailValid || !passwordValid;
}

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

const form = {
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    loginButton: () => document.getElementById('login-button'),
    password: () => document.getElementById('password'),
    recoverPassword: () => document.getElementById('recover-password-button'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
}
