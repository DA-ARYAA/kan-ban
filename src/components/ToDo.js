import React, { useEffect } from "react";
import { Droppable } from "react-beautiful-dnd";
import { setData } from "../store/taskSlice";
import useTaskOperations from "../utils/useTaskOperations";
import Task from "./Task";

const ToDo = (props) => {
  const { openModal, setOpenModal, setEditTaskId } = props;
  const { todoTasks, handleEdit, handleDeleteTask } = useTaskOperations({
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
      {todoTasks.length ? (
        <Droppable
          droppableId="todo"
          ignoreContainerClipping={false}
          isDropDisabled={false}
          isCombineEnabled={false}
        >
          {(provided) => (
            <div
              className="m-5"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {todoTasks.map((task, index) => {
                return (
                  <Task
                    index={index}
                    task={task}
                    handleEdit={handleEdit}
                    handleDeleteTask={handleDeleteTask}
                    key={task.id}
                  />
                );
              })}
              {provided.placeholder}
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
