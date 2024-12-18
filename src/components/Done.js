import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../store/taskSlice";
import Task from "./Task";

const Done = (props) => {
  const { openModal, setOpenModal, setEditTaskId } = props;
  const allTasks = useSelector((state) => state);
  const [todoTask, setTodoTask] = useState([]);
  console.log("allTask from todo app ", allTasks);
  const dispatch = useDispatch();

  const handleDeleteTask = async (id) => {
    await axios.delete(`http://localhost:8000/tasks/${id}`).then(
      (response) => {
        var result = response.data;
        console.log("result for delete is ", result);
      },
      (error) => {
        console.log(error);
      }
    );

    await axios.get("http://localhost:8000/tasks").then(
      (response) => {
        var result = response.data;
        console.log("result for get is ", result);
        dispatch(setData(result, {}));
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleEdit = async (id) => {
    setOpenModal(true);
    setEditTaskId(id);
  };

  useEffect(() => {
    console.log("allTask from todo app ", allTasks);
    setTodoTask([]);
    allTasks.tasks.map((task) => {
      if (task.status === "done")
        setTodoTask((prevTodoTasks) => [...prevTodoTasks, task]);
    });
    console.log(todoTask);
  }, [allTasks]);

  return (
    <div className="w-full bg-green-100/100">
      <div className="flex font-bold justify-center mt-2 border-b-4 border-white">
        Done
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
        "No Tasks in Done"
      )}
    </div>
  );
};

export default Done;
