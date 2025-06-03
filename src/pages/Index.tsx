import { useState, useEffect } from "react";
import { Task } from "@/types/task";
import { TaskCard } from "@/components/TaskCard";
import { AddTaskForm } from "@/components/AddTaskForm";
import { EmptyState } from "@/components/EmptyState";
import { AnimatePresence, motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

type Filter = "all" | "active" | "completed";
const LOCAL_STORAGE_KEY = "jai-todo-tasks";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const { toast } = useToast();

  useEffect(() => {
    const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedTasks) {
      try {
        setTasks(JSON.parse(storedTasks));
      } catch {
        console.warn("Ошибка чтения задач из localStorage");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

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

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
    toast({
      title: "Выполненные задания удалены",
    });
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const activeCount = tasks.filter((t) => !t.completed).length;

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

      <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            Все
          </Button>
          <Button
            variant={filter === "active" ? "default" : "outline"}
            onClick={() => setFilter("active")}
          >
            Активные
          </Button>
          <Button
            variant={filter === "completed" ? "default" : "outline"}
            onClick={() => setFilter("completed")}
          >
            Завершённые
          </Button>
        </div>
        <div className="text-sm text-gray-600">
          Осталось задач: <strong>{activeCount}</strong>
        </div>
        <Button variant="destructive" onClick={clearCompleted}>
          Очистить завершённые
        </Button>
      </div>

      <div className="mt-6 space-y-4">
        {filteredTasks.length === 0 ? (
          <EmptyState />
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredTasks.map((task) => (
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