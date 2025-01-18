import { create } from "zustand";

type taskType = {
  id: number;
  name: string;
  description: string;
  due_date: string;
  status: string;
};

interface taskStoreProps {
  task: taskType;
  setTask: (value: taskType) => void;
  taskCreate: boolean;
  setTaskCreate: (value: boolean) => void;
  taskUpdate: boolean;
  setTaskUpdate: (value: boolean) => void;
}

export const useTaskStore = create<taskStoreProps>((set) => ({
  task: { id: 0, name: "", description: "", due_date: "", status: "" },
  setTask: (value: taskType) => set({ task: value }),
  taskCreate: false,
  setTaskCreate: (value: boolean) => set({ taskCreate: value }),
  taskUpdate: false,
  setTaskUpdate: (value: boolean) => set({ taskUpdate: value }),
}));
