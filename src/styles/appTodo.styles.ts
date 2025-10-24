import { css } from "lit";

export const appTodoStyles = css`
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

  .checkbox-container{
    background-color: #e77763;
    border-radius: 10px;
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 5px 0;
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