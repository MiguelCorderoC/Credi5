import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useTaskStore } from "../store/taskStore";

type taskType = {
  name: string;
  description: string;
  date: string;
  status: string;
};

export const CreateTask: React.FC = () => {
  const { handleSubmit, register } = useForm<taskType>();
  const taskStore = useTaskStore((state) => state);

  const onSubmit = async (data: taskType) => {
    try {
      await fetch("http://localhost:3000/tasks", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      toast.success("Task registered");
    } catch (error) {
      console.error(error);
      toast.error("Task error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="card w-25 position-absolute top-50 start-50 translate-middle shadow"
    >
      <article className="card-header d-flex align-items-center justify-content-between">
        <h2>New Task</h2>
        <button
          onClick={() => {
            taskStore.setTaskCreate(false);
          }}
          type="button"
          className="btn p-0"
        >
          <IoCloseCircleSharp className="text-danger fs-3" />
        </button>
      </article>
      <article className="card-body">
        <div>
          <label>Name</label>
          <input {...register("name")} type="text" className="form-control" />
        </div>
        <div>
          <label>Description</label>
          <textarea
            {...register("description")}
            className="form-control"
          ></textarea>
        </div>
        <div>
          <label>Date due</label>
          <input {...register("date")} type="date" className="form-control" />
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
        <button className="btn btn-success w-100">Create Task</button>
      </article>
    </form>
  );
};
