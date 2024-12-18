import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useTaskOperations({
  setData,
  setOpenModal,
  setEditTaskId,
  type,
}) {
  const tasks = useSelector((state) =>
    state.tasks.filter((task) => task.status === type)
  );

  const dispatch = useDispatch();

  const handleDeleteTask = async (id) => {
    await axios.delete(`http://localhost:8000/tasks/${id}`).then(
      (response) => {
        var result = response.data;
      },
      (error) => {
        // console.log(error);
      }
    );

    await axios.get("http://localhost:8000/tasks").then(
      (response) => {
        var result = response.data;
        dispatch(setData(result, {}));
      },
      (error) => {
        // console.log(error);
      }
    );
  };

  const handleEdit = async (id) => {
    setOpenModal(true);
    setEditTaskId(id);
  };

  const tasksForSelectedType = () => {};

  return {
    todoTasks: tasks,
    handleEdit,
    handleDeleteTask,
    tasksForSelectedType,
  };
}
