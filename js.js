
document.addEventListener("DOMContentLoaded", function()(
    const formulario = document.getElementById("form-imc");

    formulario.addEventListener("submit", calcularImc);

    carregarUsuario();
));

function calcularImc(event){
    event.preventDefault();

    const dadosUsuario = pegarValores();

    const imcCalculado = calcular(
        dadosUsuario.altura,
        dadosUsuario.peso
    );

    cadastrarUsuario(usuarioFinal);

    carregarUsuarios();

    document.getElementById("form-imc")reset();
} 

function pegarValores(){
    const nome = document.getElementById("nome").Value.trim();

    const altura = parseFloat(document.getElementById("altura").value);
    const peso = parseFloat(document.getElementById("peso").value);
    const idade = parseFloat(document.getElementById("idade").value);

    return{
        nome: nome,
        altura: altura,
        peso: peso,
        idade: idade
    }
}

function calcular(idade,peso){
    return peso / (idade*peso);
}

function classificarImc(imc){
    if(imc< 20) return"abaixo do peso";
    if(imc< 28) return "normal";
    if(imc< 30) return "sobrepeso";

    return "Obesidade";
}

function organizarDados(dadosUsuario, imc, classificacao){
    const dataAual = new Date().toLocaleDateString("pt-BR");
    return {
        ...dadosUsuario
        imc:imc.toFixed(2),
        classificacao: classificacao,
        dataCadastro: dataAual
    }; 
}

function cadastrarUsuario(usuario){
    let lista = [];
    const dadosSalvos = localStorage.getItem("usuariosCadastrados");

    if(dadosSalvos){
        lista = JSON.parse(dadosSalvos); 
    }

    lista.push(usuario);

    const listaEmTexto =JSON.stringify(lista);
    localStorage.setItem("usuariosCadastrados", listaEmTexto);

}

function carregarUsuarios(){
    const tabela = document.getElementById("corpo-tabela");
    const dadosSalvos = localStorage.getItem("usuariosCadastrados");

    //let variavel = (condicao) ? (se for verdade) : (se for falso)
    let lista = dadosSalvos ? JSON.parse(dadosSalvos) : [];
}
   if (lista.length === 0) {
        tabela.innerHTML = `
            <tr class="linha-mensagem">
                <td colspan="6">Nenhum registro encontrado!</td>
            </tr>
        `;
        return;
    }

    montarTabela(lista);


function montarTabela(lista) {
    const tabela = document.getElementById("corpo-tabela");
    let linhas = "";

    lista.forEach(function (pessoa) {
        linhas += `
        <tr>
            <td data-cell="Nome">${pessoa.nome}</td>
            <td data-cell="Altura">${pessoa.altura}m</td>
            <td data-cell="Peso">${pessoa.peso}kg</td>
            <td data-cell="Idade">${pessoa.peso}id</td>
            <td data-cell="IMC">${pessoa.imc}</td>
            <td data-cell="Classificação">${pessoa.classificacao}</td>
            <td data-cell="Data">${pessoa.dataCadastro}</td>
        </tr>
        `;
    });

    tabela.innerHTML = linhas;
}

function deletarRegistros(){
    if(confirm("Deseja realmente apagar todo histórico)){
    localStorage.removeItem("usuariosCadastrados");
    carregarUsuarios();
}
