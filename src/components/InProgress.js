import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { setData } from "../store/taskSlice";
import useTaskOperations from "../utils/useTaskOperations";
import Task from "./Task";

const InProgress = (props) => {
  const { openModal, setOpenModal, setEditTaskId } = props;
  const { todoTasks, handleEdit, handleDeleteTask } = useTaskOperations({
    setData,
    setOpenModal,
    setEditTaskId,
    type: "in_progress",
  });

  return (
    <div className="w-full bg-red-100/100">
      <div className="flex font-bold justify-center mt-2 border-b-4 border-white">
        In Progress
      </div>
      {todoTasks.length ? (
        <Droppable
          droppableId="inprogress"
          isDropDisabled={false}
          ignoreContainerClipping={false}
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
                    key={task.id}
                    task={task}
                    handleEdit={handleEdit}
                    handleDeleteTask={handleDeleteTask}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ) : (
        "No Tasks in In Progress"
      )}
    </div>
  );
};

export default InProgress;
