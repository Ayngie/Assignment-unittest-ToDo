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

    createNewTodo(todoText, todos); //anropar funktionen för att skapa ny todo från inputvärdet, samt skicakr med detta värde och todos [].
  }
);

function createNewTodo(todoText: string, todos: Todo[]) {
  if (todoText.length > 2) {
    //om texten i input är minst 3 tecken, kör denna kod.
    displayError("", false);
    let newTodo = new Todo(todoText, false); //skapar nytt objekt från vår importerade klass Todo.
    todos.push(newTodo); //pushar in den nya todon på listan todos [].

    createHtml(todos); //anropar funktionen för att skapa html av detta, och skickar med listan todos [].
  } else {
    //om texten i input är max 2 tecken, kör denna kod.
    displayError("Du måste skriva in minst tre tecken som uppgift", true);
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
  //toggla boolean.
  todo.done = !todo.done;
  createHtml(todos); //anropa funktion och skicka med listan.
}

function displayError(error: string, show: boolean) {
  //funktion för att visa felmeddelande.
  let errorContainer: HTMLDivElement = document.getElementById(
    "error"
  ) as HTMLDivElement; //hämta container för felmedd.

  errorContainer.innerHTML = error; //lägg in felmeddelande - FRÅGA: VAR FINNS VARIABEL ERROR?

  if (show) {
    //FÖRKLARING??? Om show är true. VAR BESTÄMS DETTA?
    errorContainer.classList.add("show"); //klass för styling: display:block,
  } else {
    //
    errorContainer.classList.remove("show");
  }
}

function clearTodos(todos: Todo[]) {
  //funktion för att rensa listan.
  todos.splice(0, todos.length); //ta bort alla positioner från hela listan.
  createHtml(todos); //skicka todos [] till funktionen för att skicka listan till local storage, samt skapa html.
}

createHtml(todos); //anropa funktionen för att skicka listan till local storage, samt skapa html.
//FRÅGA: VARFÖR ANROPAS ENBART DENNA I ROTEN?
