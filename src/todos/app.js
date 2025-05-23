import html from "./app.html?raw";
import todoStore from '../store/todo.store'
import { renderTodos,renderPending } from "./use-cases";

const ElementIDs = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    ClearCompleted : '.clear-completed',
    TodoFilters : '.filtro',
    PendingCountLabel: '#pending-count',
}

/**
 * 
 * @param {string} elementId 
 */

export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodo( todoStore.getCurrentFilter() );
        renderTodos( ElementIDs.TodoList, todos);
        updatedPendingCount();
    }

    const  updatedPendingCount = () => {
        renderPending(ElementIDs.PendingCountLabel);
    }

   // funcion anonima autoinvocada, cuando la funcion app se llama
    (()=>{
        const app = document.createElement ('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app)
        displayTodos();
    })();

    const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
    const todoListUL = document.querySelector(ElementIDs.TodoList);
    const clearCompletedButton = document.querySelector(ElementIDs.ClearCompleted);
    const filtersList = document.querySelectorAll(ElementIDs.TodoFilters);

    newDescriptionInput.addEventListener('keyup', (event) => {
       if (event.keyCode !== 13 ) return;
       if (event.target.value.trim().length === 0) return;

       todoStore.addTodo( event.target.value );
       displayTodos();
       event.target.value = '';
    });

    todoListUL.addEventListener ('click', (event) =>{
        const element = event.target.closest('[data-id]')
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    todoListUL.addEventListener ('click', (event) =>{
        const isDestroyElement = event.target.className ==='destroy';
        const element = event.target.closest('[data-id]');
        if (!element || !isDestroyElement) return;

        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    clearCompletedButton.addEventListener ('click', () =>{
        todoStore.deleteComplete();
        displayTodos();
    });

    filtersList.forEach (element => {
        element.addEventListener('click', (element) => {
            filtersList.forEach(el => { el.classList.remove('selected')})
            element.target.classList.add ('selected');
        })

        switch (element.target.text){
            case 'Todo' : 
                todoStore.setFilter (Filters.All)
            break;
            case 'Pendientes' : 
                todoStore.setFilter (Filters.Pending)
            break;
            case 'Completados' : 
                todoStore.setFilter (Filters.completed)
            break;


        }
    })



}