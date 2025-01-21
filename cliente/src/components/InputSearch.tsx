import { useTaskStore } from "../store/taskStore";

export const InputSearch: React.FC = () => {
  const taskStore = useTaskStore((state) => state);

  const filtered = (value: string) => {
    taskStore.setTaskArrayFilter(
      taskStore.taskArray.filter(
        (task) =>
          task.id.toString().includes(value) ||
          task.name.toLowerCase().includes(value.toLowerCase()) ||
          task.description.toLowerCase().includes(value.toLowerCase()) ||
          task.due_date.toLowerCase().includes(value.toLowerCase()) ||
          task.status.toLowerCase().includes(value.toLowerCase())
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
