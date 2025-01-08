import contato from "./contatos.js";

const listaContatos = document.getElementById("listaContatos");
const btnGravar = document.getElementById("btn_gravar");


btnGravar.addEventListener("click",function(){
    const cont = {
        nome: document.getElementById('f_nome').value,
        telefone: document.getElementById('f_telefone').value,
        cod: document.getElementById('f_cod').value
    }


    contato.getAddContato(cont,listaContatos)
})