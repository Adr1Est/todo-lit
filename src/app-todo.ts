import { LitElement, html, css } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";

interface Task{
  title: string;
  completed: boolean
}
@customElement('app-todo')
export class AppTodo extends LitElement {
  
  static styles = css`
    .main-container{
      background-color: #F2F2F2;
      border-radius: 10px;
      padding: 10px;
      min-width: 500px;
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }

    .input-container{
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
    input[type="text"]{
      border: 0;
      border-radius: 10px;
      padding: 5px;
      background-color: #e77763;
      width: 70%;
      color: #F2F2F2;
    }
    .myButton{
      border-radius: 10px;
      border: 0;
      background-color: #e77763;
      padding: 5px;
      color: #F2F2F2;  
      cursor: pointer;
      font-weight: bold;
      &&:hover{
        background-color: #90A9B7;
      }
    }

    .render-list-container{
      display: flex;
      flex-direction: column;
      gap: 5px;
      width: 100%;
    }
    .todo-card{
      background-color: #e77763;
      border-radius: 15px;
      && p{
        margin: 0;
        padding: 5px;
        width: 100%;
      }
    }

    .checkbox-container{
      background-color: #e77763;
      border-radius: 10px;
      width: 100%;
      display: flex;
      justify-content: center;
      padding: 5px 0;
    }
    .checkedTask{
      text-decoration-line: line-through;
    }
    .message{
      background-color: #e77763;
      border-radius: 10px;
      padding: 5px;
    }

    hr{ 
      border: 3px solid #FCD790; 
      border-radius: 10px;
    }
  `;

  @state()
  private _todoList = [
    { title: "Tarea 1", completed: false },
    { title: "Tarea 2", completed: false },
  ];
  @property({ type: Boolean })
  hideCompleted = false;

  toggleCompleted(item: Task){
    item.completed = !item.completed;
    this.requestUpdate();
  }

  render() {
    const items = this.hideCompleted
      ? this._todoList.filter((item) => !item.completed)
      : this._todoList;

    const message = html`
      <p class="message">Has realizado todas las tareas!</p>
    `;

    const todos = items.map((todo) => html`
      <div 
        class="todo-card"
        @click=${() => this.toggleCompleted(todo)}
      >
        <p class=${todo.completed ? 'checkedTask' : ''}>${todo.title}</p>
      </div>
    `);
  
    const todoOrMessage = items.length > 0
      ? todos
      : message;

    return html`
      <div class="main-container">

        <div class="input-container">
          <input type="text" placeholder="Escribe algo..." id="newTask"/>
          <button class="myButton" @click=${this.addTask}>Añadir a la lista</button>
        </div>

        <hr />

        <div class="checkbox-container">
          <label>
            <input type="checkbox" 
              @change=${this.setHideCompleted}
              ?checked=${this.hideCompleted}
            >
            Ocultar completados
          </label>
        </div>

        <hr />

        <div class="render-list-container">

          ${todoOrMessage}  

        </div>

      </div>
    `;
  }

  setHideCompleted(e: Event){
    this.hideCompleted = (e.target as HTMLInputElement).checked;
  }

  @query("#newTask")
  input!: HTMLInputElement;

  addTask(){
    this._todoList = [...this._todoList, 
      { title: this.input.value, completed: false }
    ];
    this.input.value = '';
  }
}