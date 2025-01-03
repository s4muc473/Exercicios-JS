const teclasNum = [...document.querySelectorAll(".num")];
const teclasOp = [...document.querySelectorAll(".op")];
const teclaRes = document.querySelector(".res");
const display = document.querySelector("#display");
const teclaCopy = document.querySelector("#t-copy");
const teclaLimpar = document.querySelector("#t-limpar");
const teclaIgual = document.getElementById("t-igual");
const calc = document.querySelector("#calc");
const aba = document.querySelector("#calc-aba");

let sinal = false;
let decimal = false;

teclasNum.forEach((el)=>{
    el.addEventListener("click",(evt)=>{
        sinal = false;
        if (evt.target.innerHTML==",") {
            if (!decimal) {
                decimal=true;
                if (display.innerHTML=="0") {
                    display.innerHTML="0,"
                } else {
                    display.innerHTML += evt.target.textContent;
                }
            }
        } else {
            if (display.innerHTML == "0") {
                display.innerHTML = "";
            }
            display.innerHTML += evt.target.textContent;
        }
    })
});

teclasOp.forEach((el)=>{
    el.addEventListener("click",(evt)=>{
        if (!sinal) {
            sinal = true;
            if (display.innerHTML == "0") {
                display.innerHTML = "";
            }
            if (evt.target.innerHTML=="x") {
                display.innerHTML += "*";
            } else {
                display.innerHTML += evt.target.textContent;
            }
        }
    })
});

teclaLimpar.addEventListener("click",(evt)=>{
    display.innerHTML="0";
    sinal = false;
    decimal = false;
})

teclaIgual.addEventListener("click",(evt)=>{
    const res = eval(display.innerHTML);
    display.innerHTML = res;
    sinal = false;
    decimal = false;
})

teclaCopy.addEventListener("click",(evt)=>{
    navigator.clipboard.writeText(display.innerHTML);
    // com read pode-se ler da area de transtefrencia e, inputs vc pode usar o el.select()
})

aba.addEventListener("click",(evt)=>{
    calc.classList.toggle("calc-exibir");
});