const texto = document.querySelector("input");
const btnInsert = document.querySelector(".divInsert button");
const btnDeleteAll = document.querySelector(".header button");
const ul = document.querySelector("ul");
const divToDo = document.querySelector(".to-do");

let itensDB = [];

texto.addEventListener("keyup", (e) => {
	if (texto.value.length > 0) {
		SearchInList(e.target.value);
	} else {
		loadItens();
	}
});

function SearchInList(textoBusca) {
	let itensFiltrados = itensDB.filter((item) =>
		item.item.toLowerCase().includes(textoBusca.toLowerCase())
	);
	preencherLista(itensFiltrados);
}

btnDeleteAll.onclick = () => {
	itensDB = [];
	updateDB();
};

texto.addEventListener("keypress", (e) => {
	if (e.key === "Enter" && texto.value !== "") {
		setItemDB();
		texto.value = "";
	}
});

btnInsert.onclick = () => {
	if (texto.value !== "") {
		setItemDB();
		texto.value = "";
	}
};

function setItemDB() {
	if (itensDB.length >= 20) {
		alert("Limite de itens atingido!");
		return;
	}

	itensDB.push({ item: texto.value, status: "" });
	updateDB();
}

function updateDB() {
	localStorage.setItem("toDoList", JSON.stringify(itensDB));
	loadItens();
}

function loadItens() {
	itensDB = JSON.parse(localStorage.getItem("toDoList")) ?? [];
	preencherLista(itensDB);
}

function preencherLista(itens) {
	ul.innerHTML = "";
	itens.forEach((item, i) => {
		insertItemTela(item.item, item.status, i);
	});
}

function insertItemTela(text, status, i) {
	const li = document.createElement("li");

	li.innerHTML = `
    <div class="divLi">
      <input type="checkbox" class="checkbox" ${status} data-i=${i} onchange="done(this, ${i});" />
      <span data-si=${i}>${text}</span>
      <button onclick="removeItem(${i})" data-i=${i}><i class='bx bx-trash'></i></button>
    </div>
    `;
	ul.appendChild(li);

	if (status) {
		document
			.querySelector(`[data-si="${i}"]`)
			.classList.add("line-through");
	} else {
		document
			.querySelector(`[data-si="${i}"]`)
			.classList.remove("line-through");
	}
}

function done(chk, i) {
	if (chk.checked) {
		itensDB[i].status = "checked";
	} else {
		itensDB[i].status = "";
	}

	updateDB();
}

function removeItem(i) {
	itensDB.splice(i, 1);
	updateDB();
}

loadItens();
