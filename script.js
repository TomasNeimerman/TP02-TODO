let todos = [];

function AgregarTodo() {
    const todoInput = document.getElementById("todoInput");
    const todoText = todoInput.value.trim();

    if (todoText !== "") {
        
        const existeTarea = todos.some(todo => todo.text === todoText);
        
        if (existeTarea) {
            mostrarError('Tarea ya existente');
            return; 
        }

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
    let tareaMasRapida = null;
    let tiempoMasRapido = Infinity; 

    todos.forEach(todo => {
        if (todo.completed && todo.timeend) {
            const tiempoTranscurrido = todo.timeend - todo.timestamp;

            if (tiempoTranscurrido < tiempoMasRapido) {
                tiempoMasRapido = tiempoTranscurrido;
                tareaMasRapida = todo;
            }
        }
    });

    if (tareaMasRapida) {
        const { text, timeend } = tareaMasRapida;
        const fecha = new Date(timeend);
        alert(`Tarea más rápida: ${text} (Hecho a las ${fecha.getHours()}hs ${fecha.getMinutes()}mins ${fecha.getSeconds()}segs del ${fecha.getDate()}/${fecha.getMonth() + 1})`);
    } else {
        alert('No hay tareas completadas para mostrar la más rápida.');
    }
}
