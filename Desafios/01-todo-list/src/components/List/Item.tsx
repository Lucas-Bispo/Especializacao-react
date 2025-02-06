import { Trash, Check } from "phosphor-react";

import { ITask } from "../../App";

import styles from "./Item.module.css";

interface Props {
    data: ITask;
    removeTask: (id: number) => void;
    toggleTaskStatus: ({id, value}: {id: number, value: boolean}) => void;
}

export function Item({ data, removeTask, toggleTaskStatus }: Props) {
    function handleTaskToggle() {
        
        toggleTaskStatus({
            id: data.id,
            value: !data.isChecked 
        });
    }

    

}