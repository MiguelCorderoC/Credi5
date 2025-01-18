import { IoCloseCircleSharp } from "react-icons/io5";
import { useTaskStore } from "../store/taskStore";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

type taskType = {
  name: string;
  description: string;
  date: string;
  status: string;
};

interface updateTaskProps {
  refreshTask: () => void;
}

export const UpdateTask: React.FC<updateTaskProps> = ({ refreshTask }) => {
  const taskStore = useTaskStore((state) => state);
  const { handleSubmit, register } = useForm<taskType>();

  const onSubmit = async (data: taskType) => {
    try {
      if (!taskStore.task || !taskStore.task.id) {
        toast.error("No task selected for update");
        return;
      }

      const response = await fetch(
        "http://localhost:3000/tasks/" + taskStore.task.id,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update task: ${response.statusText}`);
      }
      refreshTask();
      toast.success("Task updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error updating the task");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="card w-25 position-absolute top-50 start-50 translate-middle shadow"
    >
      <article className="card-header d-flex align-items-center justify-content-between">
        <h2>Update task state</h2>
        <button
          type="button"
          onClick={() => {
            taskStore.setTaskUpdate(false);
          }}
          className="btn p-0"
        >
          <IoCloseCircleSharp className="text-danger fs-3" />
        </button>
      </article>
      <article className="card-body">
        <div>
          <label>ID</label>
          <input
            type="text"
            disabled
            className="form-control"
            value={taskStore.task.id}
          />
        </div>
        <div>
          <label>Name</label>
          <input
            {...register("name")}
            type="text"
            disabled
            className="form-control"
            value={taskStore.task.name}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            {...register("description")}
            className="form-control"
            disabled
            value={taskStore.task.description}
          ></textarea>
        </div>
        <div>
          <label>Date</label>
          <input
            {...register("date")}
            className="form-control"
            value={taskStore.task.due_date}
            disabled
          />
        </div>
        <div>
          <label>Status</label>
          <select {...register("status")} className="form-control">
            <option value="pending">Pending</option>
            <option value="in_progress">Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </article>
      <article className="card-footer">
        <button className="btn btn-primary w-100">Update task</button>
      </article>
    </form>
  );
};
