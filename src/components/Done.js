import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { setData } from "../store/taskSlice";
import useTaskOperations from "../utils/useTaskOperations";
import Task from "./Task";

const Done = (props) => {
  const { openModal, setOpenModal, setEditTaskId } = props;
  const { todoTasks, handleEdit, handleDeleteTask } = useTaskOperations({
    setData,
    setOpenModal,
    setEditTaskId,
    type: "done",
  });

  return (
    <div className="w-full bg-green-100/100">
      <div className="flex font-bold justify-center mt-2 border-b-4 border-white">
        Done
      </div>
      {todoTasks.length ? (
        <Droppable
          droppableId="done"
          isDropDisabled={false}
          isCombineEnabled={false}
          ignoreContainerClipping={false}
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
                    task={task}
                    index={index}
                    handleEdit={handleEdit}
                    key={task.id}
                    handleDeleteTask={handleDeleteTask}
                  />
                );
              })}{" "}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ) : (
        "No Tasks in Done"
      )}
    </div>
  );
};

export default Done;
