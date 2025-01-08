import { contatos } from "./bancoContatos.js";

let contato = {
    getTodosContatos:function(){
        return contatos;
    },

    getContato:function(i_contato){
        return contatos[i_contato]
    },

    getAddContato:function(novoContato,destinoDOM){
        const div = document.createElement('div');
        div.setAttribute('class','contato');

        const p_nome = document.createElement('p');
        p_nome.innerHTML = novoContato.nome;

        const p_telefone = document.createElement('p');
        p_telefone.innerHTML = novoContato.telefone;

        const p_cod = document.createElement('p');
        p_cod.innerHTML = novoContato.cod;

        destinoDOM.appendChild(div);
        div.appendChild(p_nome);
        div.appendChild(p_telefone);
        div.appendChild(p_cod)
    }
}

export default contato;