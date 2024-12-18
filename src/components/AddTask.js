import React, { useEffect, useState } from "react";
import axios from "axios";
import { addTask } from "../store/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import taskStore from "../store/taskStore";
import Form from "./Form";
import { setData as setStoreData } from "../store/taskSlice";

const AddTask = (props) => {
  const { openModal, setOpenModal, editTaskId, setEditTaskId } = props;

  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);

  const [data, setData] = useState({
    title: "",
    description: "",
    status: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!["to_do", "in_progress", "done"].includes(data.status)) {
      setOpenModal(false);
      setIsError(true);
      return;
    }
    if (!editTaskId) {
      // adding new task
      axios.post("http://localhost:8000/tasks", data).then(
        (response) => {
          var result = response.data;
          dispatch(addTask(result, {}));
        },
        (error) => {
          // console.log(error);
        }
      );
      setOpenModal(false);
    } else {
      // editing current task
      await axios.put(`http://localhost:8000/tasks/${editTaskId}`, data).then(
        (response) => {
          var result = response.data;
          // dispatch(addTask(result, {}));
        },
        (error) => {
          // console.log(error);
        }
      );
      await axios.get("http://localhost:8000/tasks").then(
        (response) => {
          var result = response.data;
          dispatch(setStoreData(result, {}));
        },
        (error) => {
          // console.log(error);
        }
      );
      setOpenModal(false);
    }

    setEditTaskId(null);
    setData({
      title: "",
      description: "",
      status: "",
    });
  };

  return (
    <div className="">
      <button
        className=" px-5 py-1 bg-sky-400/100 rounded-md flex items-center max-w-sm  mx-auto"
        onClick={(e) => {
          setOpenModal((prevState) => !prevState);
        }}
      >
        Add Task
      </button>

      {openModal && (
        <Form
          data={data}
          setData={setData}
          handleSubmit={handleSubmit}
          setOpenModal={setOpenModal}
          editTaskId={editTaskId}
          setEditTaskId={setEditTaskId}
        />
      )}
      {isError && (
        <div
          className="absolute right-4 bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-neutral-800 dark:border-neutral-700"
          role="alert"
          tabindex="-1"
          aria-labelledby="hs-toast-error-example-label"
          onClick={() => setIsError(false)}
        >
          <div className="flex p-4">
            <div className="shrink-0">
              <svg
                className="shrink-0 size-4 text-red-500 mt-0.5"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
              </svg>
            </div>
            <div className="ms-3">
              <p
                id="hs-toast-error-example-label"
                className="text-sm text-gray-700 dark:text-neutral-400"
              >
                Please fill the valid fields.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTask;
