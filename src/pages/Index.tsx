import { useState } from "react";
import { Task } from "@/types/task";
import { TaskCard } from "@/components/TaskCard";
import { AddTaskForm } from "@/components/AddTaskForm";
import { EmptyState } from "@/components/EmptyState";
import { AnimatePresence, motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { toast } = useToast();

  const addTask = (title: string, category: string) => {
    const newTask: Task = {
      id: Math.random().toString(36).substring(7),
      title,
      category,
      completed: false,
      createdAt: new Date(),
    };
    setTasks((prev) => [newTask, ...prev]);
    toast({
      title: "Задание добавлено",
      description: "Ваше новое задание было успешно добавлено.",
    });
  };

  const completeTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    toast({
      title: "Задание удалено",
      description: "Ваше задание успешно удалено.",
      variant: "destructive",
    });
  };

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          TO DO List
        </h1>
        <p className="mt-2 text-gray-600">
          Следите за выполнением ежедневных задач и будьте организованы
        </p>
      </motion.div>

      <AddTaskForm onAdd={addTask} />

      <div className="space-y-4">
        {tasks.length === 0 ? (
          <EmptyState />
        ) : (
          <AnimatePresence mode="popLayout">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onComplete={completeTask}
                onDelete={deleteTask}
              />
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default Index;