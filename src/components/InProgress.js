import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../store/taskSlice";
import useTaskOperations from "../utils/useTaskOperations";
import Task from "./Task";

const InProgress = (props) => {
  const { openModal, setOpenModal, setEditTaskId } = props;
  const { todoTask, handleEdit, handleDeleteTask } = useTaskOperations({
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
      {todoTask.length > 0 ? (
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
      ) : (
        "No Tasks in In Progress"
      )}
    </div>
  );
};

export default InProgress;
