var list = [
	{"desc":"pão", "quantidade":"1", "valor":"3.40"},
	{"desc":"cerveja", "quantidade":"12", "valor":"2.40"},
	{"desc":"cupim", "quantidade":"1", "valor":"25.40"}
];
function getTotal(list){
	var total = 0;
	for (var key in list) {
		total +=  list[key].valor * list[key].quantidade;
	}
	document.getElementById("totalValue").innerHTML = formatValor(total);
	return total;
}
function setList(list){
	var table = '<thead><tr><td>Descrição</td><td>Quantidade</td><td>Valor</td><td>Ação</td></tr></thead><tbody>';
	for(var key in list){
		table += '<tr><td>'+ formatDesc(list[key].desc) +'</td><td>'+ formatQuantidade(list[key].quantidade) +'</td><td>'+ formatValor(list[key].valor) +'</td><td> <button class="btn btn-default" onclick="setUpdate('+key+')">Editar</button> | <button class="btn btn-default" onclick="deleteData('+key+')">Deletar</button></td></tr>';
	}
	table += '</tbody>';
	document.getElementById("listTable").innerHTML =  table;
	getTotal(list);
	saveListStorage(list);
}
function formatDesc(desc){
	var str = desc.toLowerCase();
	str = str.charAt(0).toUpperCase() + str.slice(1);
	return str;
}
function formatQuantidade(quantidade){
 	return  parseInt(quantidade);
}
function formatValor(valor){
	var str = parseFloat(valor).toFixed(2) + "";
	str = str.replace(".", ",");
	str = "R$ "+ str;
	return str;
}
function addData(){
	if(!validacao()){
		return;
	}
	var desc = document.getElementById("desc").value;
	var quantidade = document.getElementById("quantidade").value;
	var valor = document.getElementById("valor").value;

	list.unshift({"desc": desc, "quantidade": quantidade, "valor": valor});
	setList(list);
}
function setUpdate(id){
	var obj = list[id];
	document.getElementById("desc").value = obj.desc;
	document.getElementById("quantidade").value = obj.quantidade;
	document.getElementById("valor").value = obj.valor;
	document.getElementById("btnUpdate").style.display = "inline-block";
	document.getElementById("btnAdd").style.display = "none";

	document.getElementById("inputIDUpdate").innerHTML = '<input id="idUpdate" type="hidden" value="'+id+'">';
}
function resetForm(){
	document.getElementById("desc").value = "";
	document.getElementById("quantidade").value = "";
	document.getElementById("valor").value = "";
	document.getElementById("btnUpdate").style.display = "none";
	document.getElementById("btnAdd").style.display = "inline-block";

	document.getElementById("inputIDUpdate").innerHTML = "";
}
function updateData(){
	if(!validacao()){
		return;
	}
	var id = document.getElementById("idUpdate").value;
	var desc = document.getElementById("desc").value;
	var quantidade = document.getElementById("quantidade").value;
	var valor = document.getElementById("valor").value;

	list[id] = {"desc":desc, "quantidade":quantidade, "valor":valor};
	resetForm();
	setList(list);
}

function deleteData(id){
	if(confirm("Deletar este item?")) {
		if(id === list.length - 1){
			list.pop();
		} else if(id === 0){
			list.shift();
		}else {
			var arraAuxIni = list.slice(0, id);
			var arraAuxEnd = list.slice(id + 1);
			list = arraAuxIni.concat(arraAuxEnd);
		}
		setList(list);
	}
}
function validacao(){
	var desc = document.getElementById("desc").value;
    var quantidade = document.getElementById("quantidade").value;
    var valor = document.getElementById("valor").value;
    var error = "";
    document.getElementById("error").style.display = "none";
    if(desc === ""){
        error += '<p>Insira uma descrição</p>';
    }
    if(quantidade === ""){
        error += '<p>Insira um quantidade</p>';
    }else if(quantidade != parseInt(quantidade)){
        error += '<p>Insira um quantidade válida</p>';
    }
    if(valor === ""){
        error += '<p>Insira um valor</p>';
    }else if(valor != parseFloat(valor)){
        error += '<p>Insira um valor válido</p>';
    }

    if(error != ""){
        document.getElementById("error").style.display = "block";
        document.getElementById("error").style.backgroundColor = "rgba(85, 85, 85, 0.3)";
        document.getElementById("error").style.color = "white";
        document.getElementById("error").style.padding = "10px";
        document.getElementById("error").style.margin = "10px";
        document.getElementById("error").style.borderRadius = "13px";

        document.getElementById("error").innerHTML = "<h3>Erro:</h3>" + error;
        return 0;
    }else{
        return 1;
    }

}
function deleteList(){
	if (confirm("Deletar esta lista?")) {
		list = [];
		setList(list);
	}
}
function saveListStorage(list){
	var jsonStr =  JSON.stringify(list);
	localStorage.setItem("list", jsonStr);
}
function initListStorage(){
	var testList = localStorage.getItem("list");
	if(testList){
		list = JSON.parse(testList);
	}
	setList(list);

}
initListStorage();