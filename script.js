let todos = [];

function AgregarTodo() {
    const todoInput = document.getElementById("todoInput");
    const todoText = todoInput.value.trim();
    
    if (todoText !== "") {
        todos.forEach((todo) => {
            if(todoText == todo.text){
                mostrarError('Tarea ya existente')
                exit; 
            }
        })
        const todo = {
            text: todoText,
            completed: false,
            timestamp: new Date(),
            timeend: null,
        };
        todos.push(todo);
        todoInput.value = "";
        mostrarTodos();
    }
}

function mostrarError(mensaje) {
    var mensajeErrorElemento = document.createElement('div');
    mensajeErrorElemento.id = 'error-message';
    mensajeErrorElemento.textContent = mensaje;
    document.body.insertBefore(mensajeErrorElemento, document.body.firstChild);
    setTimeout(function() {
        mensajeErrorElemento.remove();
    }, 2000);
}

function MostrarCompletos(index) {
    todos[index].completed = !todos[index].completed;
    mostrarTodos();
}

function Borrar(index) {
    todos.splice(index, 1);
    mostrarTodos();
}

function mostrarTodos() {
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = "";
    todos.forEach((todo, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = todo.text;
        if (todo.completed) {
            listItem.classList.add("Completo");
            fechaActual = new Date()
            todo.timeend = fechaActual
            listItem.innerHTML += `(Hecho a las ${fechaActual.getHours()}hs ${fechaActual.getMinutes()}mins ${fechaActual.getSeconds()}segs del ${fechaActual.getDate()}/${fechaActual.getMonth()})`;
        } else {
            const completeButton = document.createElement("button");
            completeButton.textContent = "Completar";
            completeButton.onclick = () => MostrarCompletos(index);
            listItem.appendChild(completeButton);
        }
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Borrar";
        deleteButton.onclick = () => Borrar(index);
        listItem.appendChild(deleteButton);
        
        todoList.appendChild(listItem);
    });
}

function TareaMasRapida() {
    var masRapido = todos[0].timeend;
    var nMasRapido = todos[0].text;
    todos.forEach((todo) => {
        if(todo.timeend - todo.timestamp < masRapido){
            masRapido = todo.timeend
            nMasRapido = todo.text
        }
    })
    alert(`TODO mas rapido: ${nMasRapido} (Hecho a las ${masRapido.getHours()}hs ${masRapido.getMinutes()}mins ${masRapido.getSeconds()}segs del ${masRapido.getDate()}/${masRapido.getMonth()})`);
}
