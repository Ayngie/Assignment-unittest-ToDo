import { IAddResponse } from "./models/IAddResult"; //interface (med egenskaperna success samt error) som importeras för att användas i vår funktion addTodo.
import { Todo } from "./models/Todo";

export function addTodo(todoText: string, todos: Todo[]): IAddResponse {
  if (todoText.length > 2) {
    //om texten i input är minst 3 tecken, kör denna kod.
    let newTodo = new Todo(todoText, false); //skapar nytt objekt från vår importerade klass Todo.
    todos.push(newTodo); //pushar in den nya todon på listan todos [].
    return { success: true, error: "Du måste ange minst två bokstäver" }; //IAddRespons interfacets egenskaper används här: return ändrar success till true. // om false/error = felmedd...
  } else {
    //om texten i input är max 2 tecken, kör denna kod.
    return { success: false, error: "Du måste ange minst två bokstäver" }; //IAddRespons interfacets egenskaper används här: sucess = false, samt error = felmedd...
  }
}

export function changeTodo(todo: Todo) {
  //toggla boolean.
  todo.done = !todo.done;
}

export function removeAllTodos(todos: Todo[]) {
  //funktion för att rensa listan.
  todos.splice(0, todos.length); //ta bort alla positioner från hela listan.
}
