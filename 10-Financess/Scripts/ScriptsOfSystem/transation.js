if (!isNewTransation()) {
    const uid = getTransationUid()
    findTransationByUid(uid);
}

function getTransationUid() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('uid');
}

function isNewTransation() {
    return getTransationUid() ? false : true;
}

function findTransationByUid(uid) {
    showLoading();

    firebase.firestore()
        .collection('transations')
        .doc(uid)
        .get()
        .then(doc => {
            hideLoading();
            toggleSaveButtonDisable()
            if (doc.exists) {
                fillTransactionsScreen(doc.data());
            } else {
                alert('Doc não encontrado');
                window.location.href = "/Pages/home.html";
            }
        })
        .catch(error =>{
            hideLoading();
            alert("erro ao recuperar doc")
            window.location.href = "/Pages/home.html";
        })
}

function update(transation) {
    showLoading();
    firebase.firestore()
        .collection('transations')
        .doc(getTransationUid())
        .update(transation)
        .then(() => {
            hideLoading()
            window.location.href = "/Pages/home.html";
        })
        .catch(error =>{
            hideLoading();
            alert("erro ao atualizar doc")
            window.location.href = "/Pages/home.html";
        })

}

function save(transation) {
    showLoading()

    firebase.firestore()
        .collection('transations')
        .add(transation)
        .then(() =>{
            hideLoading();
            window.location.href = "/Pages/home.html";
        })
        .catch(() =>{
            hideLoading()
            alert('erro ao salvar transação');
        })
}

function fillTransactionsScreen(transation) {
    if (transation.type == "expanse") {
        form.typeExpanse().checked = true;
    } else {
        form.typeIncome().checked = true;
    }

    form.date().value = transation.date;
    form.currency().value = transation.money.currency;
    form.value().value = transation.money.value;
    form.transationType().value = transation.transationType;

    if (transation.description) {
        form.description().value = transation.description;
    }
}

function saveTransation() {
    const transation = createTransation();

    if (isNewTransation()) {
        save(transation);
    } else {
        update(transation);
    }
}

function createTransation() {
    return {
        type: form.typeExpanse().checked ? "expanse" : "income",
        date: form.date().value,
        money: {
            currency: form.currency().value,
            value: parseFloat(form.value().value)
        },
        transationType: form.transationType().value,
        description: form.description().value,
        user: {
            uid: firebase.auth().currentUser.uid
        }
    }
}


function onChangeDate() {
    const date = form.date().value;
    form.dateRequiredError().style.display = !date ? "block" : "none";

    toggleSaveButtonDisable()
}

function onChangeValue() {
    const value = form.value().value;
    form.valueRequiredError().style.display = !value ? "block" : "none";
    form.valueLessOrEqualToZeroError().style.display = value <= 0 ? "block" : "none";

    toggleSaveButtonDisable()
}

function onChangeTransationType() {
    const transationType = form.transationType().value;
    form.transationRequiredError().style.display = !transationType ? "block" : "none";

    toggleSaveButtonDisable();
}

function toggleSaveButtonDisable() {
    form.saveButton().disabled = !isFormValid();
}

function isFormValid() {
    const date = form.date().value;
    if (!date) {
        return false;
    }

    const value = form.value().value;
    if (!value || value <= 0) {
        return false;
    }

    const transationType = form.transationType().value;
    if (!transationType) {
        return false;
    }

    return true;
}

const form = {
    date: () => document.getElementById('date'),
    currency: () => document.getElementById('currency'),
    dateRequiredError: () => document.getElementById('date-required-error'),
    value: () => document.getElementById('value'),
    valueRequiredError: () => document.getElementById('value-required-error'),
    valueLessOrEqualToZeroError: () => document.getElementById('value-less-or-equal-to-zero-error'),
    transationType: () => document.getElementById('transation-type'),
    typeExpanse: () => document.getElementById('expanse'),
    typeIncome: () => document.getElementById('income'),
    description: () => document.getElementById('description'),
    transationRequiredError: () => document.getElementById('transation-required-error'),
    saveButton: () => document.getElementById('save-button'),
};