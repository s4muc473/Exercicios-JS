function logout() {
    firebase.auth().signOut().then(()=>{
        window.location.href="login.html";
    }).catch(()=>{
        alert("erro ao fazer logout");
    })
}

firebase.auth().onAuthStateChanged( user => {
    if (user) {
        user.getIdToken().then(token => console.log(token));
        findTransations(user);
    }
})


function newTransation() {
    window.location.href = "/Pages/transation.html";
}

function findTransations(user) {
    showLoading();
    firebase.firestore()
        .collection('transations')
        .where('user.uid','==',user.uid)
        .orderBy('date','desc')
        .get()
        .then(snapshot => {
            hideLoading();
            const transations = snapshot.docs.map(doc => ({
                ...doc.data(),
                uid: doc.id
        }));
            addTransationsToScreen(transations);
        })
        .cacth( error => {
            hideLoading();
            console.log(error)
            alert('erro ao carregar transações')
        })
}

function addTransationsToScreen(transations) {
    const orderedList = document.getElementById('transations');

    transations.forEach(transations => {
        const li = document.createElement('li');
        li.classList.add(transations.type);
        li.id = transations.uid;
        li.addEventListener("click",() => {
            window.location.href = "/Pages/transation.html?uid=" + transations.uid;
        });

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Remover";
        deleteButton.setAttribute('class','outline danger');

        deleteButton.addEventListener('click', event =>{
            event.stopPropagation();
            askRemoveTransation(transations);
        });

        li.appendChild(deleteButton);

        const date = document.createElement('p');
        date.innerHTML = formatDate(transations.date);
        li.appendChild(date);

        const money = document.createElement('p');
        money.innerHTML = formatMoney(transations.money);
        li.appendChild(money);

        const type = document.createElement('p');
        type.innerHTML = transations.transationType;
        li.appendChild(type);

        if (transations.description) {
            const description = document.createElement('p');
            description.innerHTML = transations.description;
            li.appendChild(description);
        }

        orderedList.appendChild(li);

    });
}

function askRemoveTransation(transations) {
    const shouldRemove = confirm('deseja remover?');

    if (shouldRemove) {
        removeTransation(transations);
    }
}

function removeTransation(transation) {
    showLoading()
    
    firebase.firestore()
        .collection('transations')
        .doc(transation.id)
        .delete()
        .then(()=>{
            hideLoading()
            document.getElementById(transation.uid).remove();
        })
        .cacth(error => {
            hideLoading();
            console.log(error);
            alert('erro ao deletar transação')
        })
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-br');
}

function formatMoney(money) {
    return `${money.currency} ${money.value.toFixed(2)}`;
}
