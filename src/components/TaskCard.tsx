import { Task } from "@/types/task";
import { cn } from "@/lib/utils";
import { Check, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface TaskCardProps {
  task: Task;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskCard = ({ task, onComplete, onDelete }: TaskCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn(
        "group relative flex items-center justify-between rounded-lg border p-4 transition-all",
        "hover:border-gray-300 hover:shadow-sm",
        task.completed && "bg-gray-50"
      )}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={() => onComplete(task.id)}
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-full border transition-all",
            task.completed
              ? "border-green-500 bg-green-500 text-white"
              : "border-gray-300 hover:border-gray-400"
          )}
        >
          {task.completed && <Check className="h-4 w-4" />}
        </button>
        <div className="flex flex-col gap-1">
          <span
            className={cn(
              "text-sm font-medium transition-all",
              task.completed && "text-gray-500 line-through"
            )}
          >
            {task.title}
          </span>
          <span className="inline-flex">
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
              {task.category}
            </span>
          </span>
        </div>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="opacity-0 transition-opacity group-hover:opacity-100"
      >
        <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
      </button>
    </motion.div>
  );
};