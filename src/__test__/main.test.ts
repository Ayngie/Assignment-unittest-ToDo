/**
 * @jest-environment jsdom
 */

import * as mainFunctions from "./../ts/main";
import * as functions from "../ts/functions";
import { Todo } from "../ts/models/Todo";
import { test, expect, describe } from "@jest/globals"; //kan även lägga in describe här, om använder i test.
import { IAddResponse } from "../ts/models/IAddResult";

describe("createNewTodo", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  test("should call function addTodo and set result.success = true", () => {
    //test av första delen av denna funktion test av första delen av denna funktion där addTodo ska anropas.
    //arrange
    document.body.innerHTML = ` <ul id="todos" class="todo"></ul> `; //simulerar vår UL i html
    let testText: string = "Mjölk";
    let testList: Todo[] = [];
    let result: IAddResponse = functions.addTodo(testText, testList);
    let spy = jest.spyOn(functions, "addTodo").mockReturnValue(result); //vi vill inte testa funktionen som anropas här, bara se att anropet sker.

    //act
    mainFunctions.createNewTodo(testText, testList);

    //assert
    expect(result.success).toBe(true);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test("should call function createHtml", () => {
    //test av if-satsen
    //arrrange
    let testText: string = "Mjölk";
    let testList: Todo[] = [];
    let spy = jest.spyOn(mainFunctions, "createHtml").mockReturnValue();

    //act
    mainFunctions.createNewTodo(testText, testList);

    //assert
    expect(spy).toHaveBeenCalled();
  });

  test("should call function displayError", () => {
    //test av else-satsen
    //arrrange
    document.body.innerHTML = ` <div id="error" class="error"></div> `; //simulerar vår div i html där error meddelande ska skrivas ut.
    let testText: string = "Mj";
    let testList: Todo[] = [];
    let result: IAddResponse = functions.addTodo(testText, testList);
    let spy = jest.spyOn(mainFunctions, "displayError").mockReturnValue();

    //act
    mainFunctions.createNewTodo(testText, testList);

    //assert
    expect(result.success).toBe(false);
    expect(spy).toHaveBeenCalled();
  });
});

describe("displayError", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  test("should show error message", () => {
    //testar att errormeddelandet läggs in i diven för detta i html.
    //arrange
    document.body.innerHTML = ` <div id="error" class="error"></div> `; //simulerar vår div i html där error meddelande ska skrivas ut.
    let errorContainer: HTMLDivElement = document.getElementById(
      "error"
    ) as HTMLDivElement;
    let testText: string = "Mj";
    let testList: Todo[] = [];
    let result: IAddResponse = functions.addTodo(testText, testList);

    //act
    mainFunctions.displayError(result.error, true);

    //assert
    expect(errorContainer.innerHTML).toBe("Du måste ange minst tre bokstäver");
  });

  test("should add classlist 'show'", () => {
    //testar if-satsen
    //arrange
    document.body.innerHTML = ` <div id="error" class="error"></div> `; //simulerar vår div i html där error meddelande ska skrivas ut.
    let errorContainer: HTMLDivElement = document.getElementById(
      "error"
    ) as HTMLDivElement;
    let testText: string = "Mj";
    let testList: Todo[] = [];
    let result: IAddResponse = functions.addTodo(testText, testList);

    //act
    mainFunctions.displayError(result.error, true);

    //assert
    expect(errorContainer.classList.value).toContain("show");
  });

  test("should remove classlist 'show'", () => {
    //testar else-satsen
    //arrange
    document.body.innerHTML = ` <div id="error" class="error"></div> `; //simulerar vår div i html där error meddelande ska skrivas ut.
    let errorContainer: HTMLDivElement = document.getElementById(
      "error"
    ) as HTMLDivElement;
    let testText: string = "Mj";
    let testList: Todo[] = [];
    let result: IAddResponse = functions.addTodo(testText, testList);

    //act
    mainFunctions.displayError(result.error, false);

    //assert
    expect((errorContainer.classList.value = "show")).toBeFalsy;
  });
});

describe("IAddResponse", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });
  test("should have properties of interface", () => {
    //test av interfacet IAddResponse
    //arrange // act
    let testObject: IAddResponse = { success: true, error: "felmeddelande" };
    //assert
    expect(testObject.success).toBe(true);
    expect(testObject.error).toBe("felmeddelande");
  });
});

describe("toggleToDo", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  test("should call function changeTodo", () => {
    //testar första anropet inuti denna funktion
    //arrange
    document.body.innerHTML = ` <ul id="todos" class="todo"></ul> `; //simulerar vår UL i html där li:s ska läggas in.
    let testTodo: Todo = { text: "Mjölk", done: false };
    let spy = jest.spyOn(functions, "changeTodo").mockReturnValue(); //vi vill inte testa funktionen som anropas här, bara se att anropet sker.
    let wrongSpy = jest.spyOn(mainFunctions, "createHtml").mockReturnValue(); //vi vill inte testa funktionen som anropas här, bara se att anropet sker.

    //act
    mainFunctions.toggleTodo(testTodo);

    //assert
    expect(spy).toHaveBeenCalled();
    expect(wrongSpy).toHaveBeenCalled();
  });

  test("should call function createHtml", () => {
    //testar andra anropet inuti denna funktion
    //arrange
    document.body.innerHTML = ` <ul id="todos" class="todo"></ul> `; //simulerar vår UL i html där li:s ska läggas in.
    let testTodo: Todo = { text: "Mjölk", done: false };
    let spy = jest.spyOn(mainFunctions, "createHtml").mockReturnValue(); //vi vill inte testa funktionen som anropas här, bara se att anropet sker.
    let wrongSpy = jest.spyOn(functions, "changeTodo").mockReturnValue(); //vi vill inte testa funktionen som anropas här, bara se att anropet sker.

    //act
    mainFunctions.toggleTodo(testTodo);

    //assert
    expect(spy).toHaveBeenCalled();
    expect(wrongSpy).toHaveBeenCalled();
  });
});

describe("clearTodos", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  test("should call function removeAllTodos", () => {
    //testar första anropet i denna funktion.
    //arrange
    let testList: Todo[] = [
      { text: "Mjölk", done: true },
      { text: "Ägg", done: true },
    ];
    let spy = jest.spyOn(functions, "removeAllTodos").mockReturnValue(); //vi vill inte testa funktionen som anropas här, bara se att anropet sker.
    let wrongSpy = jest.spyOn(mainFunctions, "createHtml").mockReturnValue(); //vi vill inte testa funktionen som anropas här, bara se att anropet sker.

    //act
    mainFunctions.clearTodos(testList);

    //assert
    expect(spy).toHaveBeenCalled();
    expect(wrongSpy).toHaveBeenCalled();
  });

  test("should call function createHtml", () => {
    //testar första anropet i denna funktion.
    //arrange
    let testList: Todo[] = [
      { text: "Mjölk", done: true },
      { text: "Ägg", done: true },
    ];
    let wrongSpy = jest.spyOn(functions, "removeAllTodos").mockReturnValue(); //vi vill inte testa funktionen som anropas här, bara se att anropet sker.
    let spy = jest.spyOn(mainFunctions, "createHtml").mockReturnValue(); //vi vill inte testa funktionen som anropas här, bara se att anropet sker.

    //act
    mainFunctions.clearTodos(testList);

    //assert
    expect(spy).toHaveBeenCalled();
    expect(wrongSpy).toHaveBeenCalled();
  });
});

describe("init", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  test("should be able to submit form/click", () => {
    //arrange
    let spy = jest.spyOn(mainFunctions, "createNewTodo").mockReturnValue();

    document.body.innerHTML = `
    <form id="newTodoForm">
    <div>
      <input type="text" id="newTodoText"/>
      <button "letsAddSomeStuff">Skapa</button>
    </div>
  </form>
    `;

    mainFunctions.init();

    //act
    (document.getElementById("newTodoText") as HTMLInputElement).value =
      "Peppar";
    document.getElementById("letsAddSomeStuff")?.click();

    //assert
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith("Peppar");
  });
});

/*
test("should be able to submit", () => {
  //test för att testa funktion init
  //arrange
  let spy = jest.spyOn(functions, "clearTodos").mockReturnValue();

  document.body.innerHTML = `
  <form id="newTodoForm">
    <div>
        <input type="text" id="newTodoText" />
        <button>Skapa</button>
    </div>
  </form>`; //skapar innerHTML - så att vi kan lyssna på submit på formuläret.

  functions.init(); //min modul punkt funktionsnamnet. ANROPAR init för att där finns vår addEventListener.

  let anotherSpy = jest.spyOn(functions, "createNewTodo").mockReturnValue();

  //act
  document.getElementById("newTodoForm")?.click(); //hitta formuläret/submit/knappen, och om denna finns, så klicka på den.
  //assert
  expect(spy).toHaveBeenCalled();

  //i arrange så skapar vi knappen, lyssnar på klicket, sen i act klickar vi på knappen :) samt slutligen utvärderar vi i assert.
});
*/

/* test("should update list", () => {
  //test för att testa funktion toggleTodo
  //arrange
  let todos: Todo[] = [new Todo("text1", true), new Todo("text2", true)];
  let testTodo: Todo = new Todo("text3", true); //skapa variabel som är en simulering av en todo som ska in på listan
  todos.push(testTodo);

  //act
  functions.createHtml(todos);

  //assert
  expect(testTodo.done).toBe(false); //Kollar boolean-egenskapen - obs!
});
*/

/*
test("should x", () => {
    //test av funktion
    //arrange
    //act
    //assert
  });
*/
