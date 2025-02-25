import React from "react";

// shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]

const Task = (props) => {
  const { task, handleEdit, handleDeleteTask } = props;
  return (
    <div
      className="bg-white mt-2 p-2 shadow-[0_10px_40px_rgba(8,_12,_184,_0.7)]
"
      key={task.id}
    >
      {/* <div className="bg-white mt-2 p-2 shadow-lg" key={task.id}> */}
      <h5 class="mb-2 text-2xl font-normal tracking-tight text-gray-900 dark:text-black">
        {task.title}
      </h5>
      <p class="font-light text-gray-700 dark:text-gray-400">
        {task.description}
      </p>
      <div className="flex justify-between mt-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="h-5 w-5 cursor-pointer"
          onClick={() => {
            handleEdit(task.id);
          }}
        >
          <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
        </svg>
        <svg
          className="h-5 w-5 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          onClick={() => {
            handleDeleteTask(task.id);
          }}
        >
          Delete Task
          <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
        </svg>
      </div>
    </div>
  );
};

export default Task;
