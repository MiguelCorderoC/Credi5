import { useTaskStore } from "../store/taskStore";

export const InputSearch: React.FC = () => {
  const taskStore = useTaskStore((state) => state);

  const filtered = (value: string) => {
    taskStore.setTaskArrayFilter(
      taskStore.taskArray.filter(
        (task) =>
          task.id.toString().includes(value) ||
          task.name.toLowerCase().includes(value) ||
          task.description.toLowerCase().includes(value) ||
          task.due_date.toLowerCase().includes(value) ||
          task.status.toLowerCase().includes(value)
      )
    );
  };

  return (
    <input
      type="text"
      className="form-control"
      placeholder="Search..."
      onChange={(e) => {
        filtered(e.target.value);
      }}
    />
  );
};
