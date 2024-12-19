import axios from "axios";
import React, { useEffect } from "react";
import { getTaskById } from "../utils/TaskApis";

const Form = (props) => {
  const {
    data,
    setData,
    handleSubmit,
    setOpenModal,
    editTaskId,
    setEditTaskId,
  } = props;

  const getSingleTask = async () => {
    const result = await getTaskById(editTaskId);
    console.log(result);
    Object.keys(result).forEach((key) => {
      setData((prevData) => ({ ...prevData, [key]: result[key] }));
    });
  };
  useEffect(() => {
    if (editTaskId) {
      getSingleTask();
    }
  }, []);

  return (
    <form
      className="fixed inset-0 flex items-center justify-center z-50"
      onChange={(e) => {
        setData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }));
      }}
      onSubmit={handleSubmit}
    >
      <div
        data-dialog="sign-in-dialog"
        class="relative mx-auto w-full max-w-[24rem] rounded-lg overflow-hidden shadow-sm"
      >
        <div class="relative flex flex-col bg-white">
          <div class="relative m-2.5 items-center flex justify-center text-white h-24 rounded-md bg-slate-800">
            <h3 class="text-2xl">Add Task Details</h3>
          </div>
          <div class="flex flex-col gap-4 p-6">
            <div class="w-full max-w-sm min-w-[200px]">
              <label class="block mb-2 text-sm text-slate-600">Title</label>
              <input
                type="text"
                class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Your Title"
                name="title"
                value={data.title}
                required
              />
            </div>
            <div class="w-full max-w-sm min-w-[200px]">
              <label class="block mb-2 text-sm text-slate-600">
                Description
              </label>
              <input
                type="text"
                class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Your Description"
                name="description"
                value={data.description}
                required
              />
            </div>

            <div class="w-full max-w-sm min-w-[200px]">
              <label
                for="status"
                class="block mb-2 text-sm font-medium text-white dark:text-black"
              >
                Select an option
              </label>
              <select
                id="status"
                class="bg-white  border border-white-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="status"
                value={data.status}
                required
              >
                <option selected>Choose a Status</option>
                <option value="to_do">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>
          <div class="p-6 pt-0">
            <div className="flex mt-2">
              <button
                className=" px-5 py-1 bg-sky-400/100 rounded-md flex items-center max-w-sm  mx-auto"
                onClick={(e) => {
                  setOpenModal((prevState) => !prevState);
                  setData({
                    title: "",
                    description: "",
                    status: "",
                  });
                  setEditTaskId(null);
                }}
              >
                Cancel
              </button>{" "}
              <button
                className=" px-5 py-1 bg-sky-400/100 rounded-md flex items-center max-w-sm  mx-auto"
                // onClick={(e) => {
                //   setOpenModal((prevState) => !prevState);
                // }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;
