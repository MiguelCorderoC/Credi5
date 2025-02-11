import { useEffect } from "react";
import { CreateTask } from "./CreateTask";
import { useTaskStore } from "../store/taskStore";
import toast from "react-hot-toast";
import { UpdateTask } from "./UpdateTask";
import { InputSearch } from "./InputSearch";

export const ReadTasks: React.FC = () => {
  const taskStore = useTaskStore((state) => state);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3000/tasks");
      if (!response.ok) {
        throw new Error(`http error! Status: ${response.status}`);
      }
      const data = await response.json();
      taskStore.setTaskArray(data);
      taskStore.setTaskArrayFilter(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await fetch("http://localhost:3000/tasks/" + id, {
        method: "delete",
      });
      toast.success("Task deleted success");
      fetchTasks();
    } catch (error) {
      console.error(error);
      toast.error("Error with the task");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <section className="p-3">
      {taskStore.taskCreate && <CreateTask refreshTask={fetchTasks} />}
      {taskStore.taskUpdate && <UpdateTask refreshTask={fetchTasks} />}
      <article className="d-flex align-items-center justify-content-between">
        <h2>Tasks</h2>
        <article className="d-flex align-items-center justify-content-between gap-2">
          <InputSearch />
          <button
            onClick={() => {
              taskStore.setTaskCreate(true);
            }}
            className="btn btn-success text-nowrap"
          >
            New task
          </button>
        </article>
      </article>
      <article>
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {taskStore.taskArrayFilter.map((item, index) => (
              <tr key={index} className="align-middle">
                <td scope="row">{item.id}</td>
                <td scope="row">{item.name}</td>
                <td scope="row">{item.description}</td>
                <td scope="row">
                  {new Date(item.due_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
                <td scope="row">{item.status}</td>
                <td scope="row">
                  <button
                    onClick={() => {
                      taskStore.setTask(item);
                      console.log(taskStore.task.due_date);
                      taskStore.setTaskUpdate(true);
                    }}
                    className="btn btn-primary"
                  >
                    Update
                  </button>{" "}
                  <button
                    onClick={() => {
                      deleteTask(item.id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {taskStore.taskArrayFilter.length == 0 && (
              <tr>
                <td colSpan={6} className="text-center">
                  No records
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </article>
    </section>
  );
};
