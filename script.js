let todos = []

const addTodo = () => {
	let value = document.getElementsByTagName("input")[0].value;
	if (value != ""){
		todos.push({
			id: idMaker(todos),
			todoTitle: value,
			complete: false
		});
	}
	showTodos(todos)
}

const showTodos = (todoArray) => {
	let removeButton = "<button onclick='removeTodo(event)' class='button'>remove</button>";
	let editButton = "<button onclick='editTodo(event)' class='button'>edit</button>";
	let table = document.getElementById("addedTodos");
	table.innerHTML = ""
	todoArray.map(item => {
		table.innerHTML += `<tr ${item.complete ? 'class = complete' : ''} id=${item.id}>
			<td>${removeButton}</td>
			<td>${item.todoTitle}</td>
			<td>${editButton}</td>
			<td><input ${item.complete ? 'checked' : ''} onclick='clickCheckbox(event)' type='checkbox' /></td>
			</tr>`
	})
}

const editTodo = (event) => {
	let id = event.path[2].id

}

const idMaker = (arrayOfObjects) => {
	let ids = []
	arrayOfObjects.map(item => ids.push(item.id))
	if (arrayOfObjects.length == 0) return 1;
	return (ids.sort()[ids.length - 1] + 1)
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