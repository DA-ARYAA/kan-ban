import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTaskById, getAllTasks } from "./TaskApis";

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
    await deleteTaskById(id);
    const result = await getAllTasks();
    dispatch(setData(result, {}));
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
