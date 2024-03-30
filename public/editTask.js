const taskIDDOM = document.querySelector(".task-edit-id");
const taskNameDOM = document.querySelector(".task-edit-name");
const editFormDOM = document.querySelector(".single-task-form");
const formAlertDOM = document.querySelector(".form-alert");
const taskComletedpDOM = document.querySelector(".task-edit-completed");

const params = window.location.search;
const id = new URLSearchParams(params).get("id");

console.log(id);

// 1つの特定のタスクを取得する
const showTask = async () => {
  try {
    const { data: task } = await axios.get(`/api/v1/tasks/${id}`);
    const { _id, completed, name } = task;
    taskIDDOM.textContent = _id;
    taskNameDOM.value = name;
    if (completed) {
      taskComletedpDOM.checked = true;
    }
  } catch (error) {
    console.log(error);
  }
};

showTask();

// タスクの編集
editFormDOM.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const taskName = taskNameDOM.value;
    taskComleted = taskComletedpDOM.checked;
    const { data: task } = await axios.patch(`/api/v1/tasks/${id}`, {
      name: taskName,
      completed: taskComleted,
    });
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = "タスクを編集しました。";
    formAlertDOM.classList.add("text-success");
  } catch (error) {
    console.log(error);
  }

  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("text-success");
  }, 3000);
});
