import axios from "axios";

const getAllTasks = async () => {
  let result;
  await axios.get("http://localhost:8000/tasks").then(
    (response) => {
      result = response.data;
      //   dispatch(setData(result, {}));
    },
    (error) => {
      result = error;
      // console.log(error);
    }
  );
  return result;
};

const getTaskById = async (id) => {
  let result;
  await axios.get(`http://localhost:8000/tasks/${id}`).then(
    (response) => {
      result = response.data;
      console.log("result is for edit", result);
    },
    (error) => {
      result = error;
      // console.log(error);
    }
  );
  return result;
};

const deleteTaskById = async (id) => {
  await axios.delete(`http://localhost:8000/tasks/${id}`).then(
    (response) => {
      var result = response.data;
    },
    (error) => {
      // console.log(error);
    }
  );
};

const addNewTask = async (data) => {
  let result;
  await axios.post("http://localhost:8000/tasks", data).then(
    (response) => {
      result = response.data;
    },
    (error) => {
      result = error;
      // console.log(error);
    }
  );
  return result;
};

const updateSingleTask = async (id, data) => {
  await axios.put(`http://localhost:8000/tasks/${id}`, data).then(
    (response) => {
      var result = response.data;
      // dispatch(addTask(result, {}));
    },
    (error) => {
      // console.log(error);
    }
  );
};

export {
  getAllTasks,
  getTaskById,
  deleteTaskById,
  addNewTask,
  updateSingleTask,
};
