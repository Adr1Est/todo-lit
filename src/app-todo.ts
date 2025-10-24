import { LitElement, html } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import type { Task } from "./types/task.ts";
import { appTodoStyles } from "./styles/appTodo.styles.ts";
import './components/task-card.ts'

@customElement('app-todo')
export class AppTodo extends LitElement {
  
  static styles = appTodoStyles;

  @state()
  private _todoList = [
    { title: "Aprender Lit", completed: false },
    { title: "Realizar prueba técnica", completed: false },
  ];
  @property({ type: Boolean })
  hideCompleted = false;

  toggleCompleted(task: Task) {
    this._todoList = this._todoList.map(t =>
      t === task ? { ...t, completed: !t.completed } : t
    );
  }

  render() {
    const items = this.hideCompleted
      ? this._todoList.filter((item) => !item.completed)
      : this._todoList;

    const message = html`
      <p class="message">Sin tareas por hacer</p>
    `;

    const todos = items.map((todo) => html`
      <task-card 
        .task=${todo} 
        @toggle-task=${(e: CustomEvent) => this.toggleCompleted(e.detail)}
      ></task-card>
    `);

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

          ${items.length
            ? todos
            : message
          }  

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