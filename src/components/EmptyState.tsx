import { ListTodo } from "lucide-react";
import { motion } from "framer-motion";

export const EmptyState = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 p-12 text-center"
    >
      <div className="rounded-full bg-gray-50 p-3">
        <ListTodo className="h-6 w-6 text-gray-400" />
      </div>
      <h3 className="mt-4 text-sm font-medium text-gray-900">Заданий пока нет</h3>
      <p className="mt-1 text-sm text-gray-500">
        Добавьте новую задачу, чтобы начать работу
      </p>
    </motion.div>
  );
};