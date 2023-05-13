
import { Header } from "./components/Header";
import { Task } from "./components/Task";
import { TaskList } from "./components/TaskList";

//import styles from './App.module.css';<TodoList /> 
import './global.css';


export function App(){
    return(
        <div>
            <Header />
            <Task />
            <TaskList />
            
        </div>
    );
}