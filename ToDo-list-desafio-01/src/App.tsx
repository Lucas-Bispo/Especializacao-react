import { Buton } from "./components/ButonCriar";
import { Header } from "./components/Header";
//import { TodoList } from "./components/TodoList";

//import styles from './App.module.css';<TodoList /> 
import './global.css';


export function App(){
    return(
        <div>
            <Header />
            
            <Buton />
        </div>
    );
}