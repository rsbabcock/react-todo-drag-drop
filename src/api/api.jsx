const url = 'http://localhost:3000/todos';

export function getTodos() {
    return fetch(url)
        .then(response => response.json())
        .then(todos => todos.map(todo => ({
            id: todo.id,
            title: todo.title,
            completed: todo.completed,
            progress: todo.progress,
        })))
}

export function getTodo(id) {
    return fetch(`${url}/${id}`)
        .then(response => response.json())
        .then(todo => {
            return {
                id: todo.id,
                title: todo.title,
                completed: todo.completed,
                progress: todo.progress,
            }
        })
}

export function saveToDo(todo) {
    return fetch( url, {
        method: 'POST',
        body: JSON.stringify(todo),
        cache: 'no-cache',
        headers: {
            'user-agent': 'Mozilla/4.0 MDN Example',
            'content-type': 'application/json'
        },
    })
        .then(res => res.json())
        .catch(error => console.error('Error:', error));
}
export function editTodo(todo) {
    return fetch(`${url}/${todo.id}`, {
        method: 'PUT',
        body: JSON.stringify(todo),
        cache: 'no-cache',
        headers: {
            'user-agent': 'Mozilla/4.0 MDN Example',
            'content-type': 'application/json'
        },
    })
        .then(res => res.json())
        .catch(error => console.error('Error:', error));
}
export function deleteToDo(todo) {
    return fetch(`${url}/${todo}`, {
        method: 'DELETE',
        cache: 'no-cache',
        headers: {
            'user-agent': 'Mozilla/4.0 MDN Example',
            'content-type': 'application/json'
        },
    })
        .then(res => res.json())
        .catch(error => console.error('Error:', error));
}

