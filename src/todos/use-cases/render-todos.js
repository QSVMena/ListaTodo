import { Todo } from '../models/todo.model';
import { createTodoHTML } from  './create-todo-html';

let element;

/**
 * 
 * @param {string} elemmentId 
 * @param {Todo} todos 
 */

export const renderTodos = (elemmentId, todos = [] ) => {
    if (!element)
        element = document.querySelector(elemmentId);

    if (!element ) throw new Error("Not founddd");

    element.innerHTML = ''
    
    todos.forEach( todo => {
        element.append(createTodoHTML(todo))
    });
}