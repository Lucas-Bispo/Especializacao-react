import { Header } from "./components/Header";
import { TodoList } from "./components/TodoList";

//import styles from './App.module.css'; <Header />
import './global.css';


export function App(){
    return(
        <div>
            
            <TodoList />
        </div>
    );
}