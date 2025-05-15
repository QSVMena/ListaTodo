import {Todo} from '../models/todo.model'
/**
 * 
 * @param {Todo} todo 
 */

export const createTodoHTML = ( todo ) => {

    if (!todo) throw new Error ('TODO is required');

    const {done, description, id} = todo;

    const html = 
            `<div class="view">
                    <input class="toggle" type="checkbox"  ${ done ? 'checked': ''}>
                    <label>${description}</label>
                    <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
    `;


    const LiElement = document.createElement( 'li' );
    LiElement.innerHTML = html;
    LiElement.setAttribute('data-id', id);

    if( todo.done )
    LiElement.classList.add('completed')

    return LiElement;
}