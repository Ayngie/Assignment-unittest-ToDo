import { addTodo, changeTodo, removeAllTodos } from "./functions"; //import av dessa tre functions.
import { Todo } from "./models/Todo"; //import av klassen Todo.

let todos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");
//listan av todos hämtas från localStorage.

document.getElementById("clearTodos")?.addEventListener("click", () => {
  clearTodos(todos);
}); //hämtar knappen för att rensa listan.
//FRÅGA: VARFÖR FRÅGETECKNET?

(document.getElementById("newTodoForm") as HTMLFormElement)?.addEventListener(
  // FRÅGA: VARFÖR FRÅGETECKNET?
  //det räcker med att lyssna på fomuläret, det är buttonklicket som "vandrar uppåt" och triggar vår submit som vi lyssnar på på vår form (det sker precis efter klicket).
  "submit",
  (e: SubmitEvent) => {
    e.preventDefault(); //prevent default
    /* normalt vid skicka formulär - skickar tillbaka till vår sida o allt töms. NU vill vi själva bestämma vad som ska hända istället! 
    Vi vill preventDefault! Skriver därför in även e.preventDefault(); */

    /* När vi anropar den anonyma funktionen av addEventListener får vi med annan info vi inte har pratat om ännu. 
    Vi brukar kalla det för e eller event, denna parameter är ett objekt som är själva händelsen som precis inträffade. 
    Objektet e har funktionalitet kopplat till sig, iom bygger på en klass (iom det är ett objekt i typescript). 
    Vilken klass? Vi måste skriva datatypen. 
    Detta är en inbyggd parameter som baseras på den händelse vi lyssnar efter. 
    Just nu lyssnar vi på en submithändelse. Detta är i detta fall därför ngt som heter ett submitEvent!
    Vi behöver skriva inom () på anonyma funktionen efter addEventListener (e: SubmitEvent) */

    let todoText: string = (
      document.getElementById("newTodoText") as HTMLInputElement
    ).value; //hämtar vår inputtag och skapar en variabel av dess värde.
    console.log("Todos when creating", todos);

    createNewTodo(todoText, todos); //anropar funktionen för att skapa ny todo samt skickar med inputvärdet todoText samt listan todos [].
  }
);

function createNewTodo(todoText: string, todos: Todo[]) {
  let result = addTodo(todoText, todos); //ny variabel result fångar in resultatet av anrop av funktion addTodo - till vilken vi skickar med inputvärdet todoText samt listan todos []).

  if (result.success) {
    //om resultaet var att det blev en ny todo skapad - kör denna kod:
    createHtml(todos);
  } else {
    //om det EJ blev en ny todo skapad - kör denna kod:
    displayError(result.error, true); //anropa funktion för att display errormeddelande och skicka med att den är true.
  }
}

function createHtml(todos: Todo[]) {
  //funktion för att skicka listan till local storage, samt skapa html.
  localStorage.setItem("todos", JSON.stringify(todos)); //gör om todos [] till string och lägg in i localStorage.

  let todosContainer: HTMLUListElement = document.getElementById(
    "todos"
  ) as HTMLUListElement; //hämta ul för todos att läggas in i.

  todosContainer.innerHTML = ""; //rensa ul

  for (let i = 0; i < todos.length; i++) {
    let li: HTMLLIElement = document.createElement("li"); //skapa variabel för li:s.

    if (todos[i].done) {
      //if true, kör denna kod.
      li.classList.add("todo__text--done");
    } //slut på if.

    li.classList.add("todo__text"); //lägg på klass för styling.
    li.innerHTML = todos[i].text; // lägg in värden i innerHTML.
    li.addEventListener("click", () => {
      //lyssna på klick för att toggla boolean.
      toggleTodo(todos[i]); //anropa funktion vid klick, samt skicka med värdet av den todo användaren klickade på.
    });

    todosContainer.appendChild(li); //lägg in li i ul så de syns i vår HTML.
  }
}

function toggleTodo(todo: Todo) {
  //anropar funktioner för att toggla boolean på todo, samt anropar direkt efter createHtml för att uppdatera listan.
  changeTodo(todo); //anropar denna funktion som kommer att toggla boolean.
  createHtml(todos); //anropa funktion och skicka med listan.
}

function displayError(error: string, show: boolean) {
  //funktion för att visa felmeddelande.
  let errorContainer: HTMLDivElement = document.getElementById(
    "error"
  ) as HTMLDivElement; //hämta container för felmedd.

  errorContainer.innerHTML = error; //lägg in felmeddelande (error kommer från vår importerade funktion addTodo
  //(FRÅGA: right??))

  if (show) {
    //om boolean för error (show) är true (error är true, errormeddelande ska visas), kör denna kod:
    errorContainer.classList.add("show"); //klass för styling: display:block,
  } else {
    //om boolean för error (show) är false (error är false, errormeddelande ska EJ visas), kör denna kod:
    errorContainer.classList.remove("show");
  }
}

function clearTodos(todos: Todo[]) {
  removeAllTodos(todos); //anropar funktion removeAllTodos och skickar med listan todos []. //(removeAllTodos kommer i sin tur rensa listan).
  createHtml(todos); //anropar funktion createHtml och skickar med listan todos []. //(createHtml kommer i sin tur skicka listan till local storage, samt skapa html).
}

createHtml(todos); //anropa funktionen för att skicka listan till local storage, samt skapa html.
//FRÅGA: VARFÖR ANROPAS ENBART DENNA I ROTEN? Är det för att listan (från ) ska skapas upp vid uppstart av sidan?
