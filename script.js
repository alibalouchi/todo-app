let todos = []

const addTodo = () => {
	let value = document.getElementsByTagName("input")[0].value;
	if (value != ""){
		todos.push({
			id: idMaker(todos),
			todoTitle: value,
			complete: false,
			edit : false
		});
	}
	showTodos(todos)
}

const showTodos = (todoArray) => {
	let removeButton = "<button onclick='removeTodo(event)' class='button'>remove</button>";
	let editButton = "<button onclick='editItem(event)' class='button'>edit</button>";
	let table = document.getElementById("addedTodos");
	table.innerHTML = ""
	todoArray.map(item => {
		table.innerHTML += `<tr ${item.edit ? 'class= edit' : ''} ${item.complete ? 'class = complete' : ''} id=${item.id}>
			<td>${removeButton}</td>
			<td>${item.todoTitle}</td>
			<td>${editButton}</td>
			<td><input ${item.complete ? 'checked' : ''} onclick='clickCheckbox(event)' type='checkbox' /></td>
			</tr>`
	})
}

const editItem = (event) => {
	let edits = todos.filter(item => item.edit == true);
	if (edits.length > 0) return;
	let id = event.path[2].id
	document.getElementById("addButton").setAttribute("disabled", true);
	document.getElementById("editButton").removeAttribute("disabled");
	let editItem = todos.filter(item => item.id == id)[0]
	editItem.edit = true
	showTodos(todos)
}

const editTodo = () => {
	document.getElementById("editButton").setAttribute("disabled", true);
	document.getElementById("addButton").removeAttribute("disabled");
	let value = document.getElementsByTagName("input")[0].value;
	let currentItem = todos.filter(item => item.edit == true)[0].id;
	todos.map(item => {if(item.id == currentItem) item.todoTitle = value , item.edit = false})
	showTodos(todos);
}

const idMaker = (arrayOfObjects) => {
	let ids = []
	arrayOfObjects.map(item => ids.push(item.id))
	if (arrayOfObjects.length == 0) return 1;
	return (ids.sort((a, b) => a - b)[ids.length - 1] + 1);
}

const removeTodo = (event) => {
	let id = event.path[2].id;
	let deletedItem = todos.filter(item => item.id == id)[0]
	todos.splice(todos.indexOf(deletedItem), 1)
	showTodos(todos)
}

const clickCheckbox = (event) => {
	let id = event.path[2].id;
	let checkedItem = todos.filter(item => item.id == id)[0]
	checkedItem.complete = !checkedItem.complete
	showTodos(todos)
}

const handleShow = () => {
	let showObj = {
		complete: document.getElementById("complete").checked,
		active: document.getElementById("active").checked,
		all: document.getElementById("all").checked
	};
	if (showObj.complete){
		let showTodo = todos.filter(item => item.complete == true);
		showTodos(showTodo);
	}else if (showObj.active){
		let showTodo = todos.filter(item => item.complete == false);
		showTodos(showTodo);
	}else if (showObj.all){
		showTodos(todos);
	}
}