import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Task } from "../types/task";

@customElement('task-card')
export class TaskCard extends LitElement {
  static styles = css`
    .todo-card{
      background-color: #e77763;
      border-radius: 15px;
      && p{
        margin: 0;
        padding: 5px;
        width: 100%;
      }

      .checkedTask{
        text-decoration-line: line-through;
      }
    }
  `;

  @property ({ type: Object }) task!: Task; 

  render() {

    return html`
      <div class="todo-card" @click=${this._toggle}>
        <p class=${this.task.completed ? "checkedTask" : ""}>${this.task.title}</p>
      </div>
    `;
  }

  private _toggle(){
    this.dispatchEvent(
      new CustomEvent("toggle-task", { 
        detail: this.task,
        bubbles: true,
        composed: true,
      })
    );
  }
}