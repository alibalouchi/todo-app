const addTodo = () => {
    var inputValue = document.getElementsByClassName("input")[0].value
    var todoPlace = document.getElementsByClassName("todos")[0]
    var paragraph = document.createElement("li")
    var todo = document.createTextNode(inputValue)
    paragraph.appendChild(todo)
    todoPlace.appendChild(paragraph)
}