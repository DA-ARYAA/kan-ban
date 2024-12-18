import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { setData } from "../store/taskSlice";
import useTaskOperations from "../utils/useTaskOperations";
import Task from "./Task";

const ToDo = (props) => {
  const { openModal, setOpenModal, setEditTaskId } = props;

  const { todoTask, handleEdit, handleDeleteTask } = useTaskOperations({
    setData,
    setOpenModal,
    setEditTaskId,
    type: "to_do",
  });

  return (
    <div className="w-full bg-yellow-100/100  ">
      <div className="flex font-bold justify-center mt-2 border-b-4 border-white">
        To Do
      </div>
      {todoTask.length > 0 ? (
        <Droppable droppableId="to_do">
          {() => (
            <div className="m-5">
              {todoTask.map((task) => {
                return (
                  <Task
                    task={task}
                    handleEdit={handleEdit}
                    handleDeleteTask={handleDeleteTask}
                  />
                );
              })}
            </div>
          )}
        </Droppable>
      ) : (
        "No Tasks in To Do"
      )}
    </div>
  );
};

export default ToDo;
