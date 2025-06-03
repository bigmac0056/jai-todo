import { useState } from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

interface AddTaskFormProps {
  onAdd: (title: string, category: string) => void;
}

export const AddTaskForm = ({ onAdd }: AddTaskFormProps) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Личный");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim(), category);
      setTitle("");
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 space-y-4"
      onSubmit={handleSubmit}
    >
      <div className="flex gap-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Добавьте новую задачу..."
          className="flex-1 rounded-lg border border-gray-200 px-4 py-2 text-sm transition-all focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-100"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm transition-all focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-100"
        >
          <option value="Личный">Личный</option>
          <option value="Работа">Работа</option>
          <option value="Покупки">Покупки</option>
          <option value="Здоровье">Здоровье</option>
        </select>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-gray-800"
        >
          <Plus className="h-4 w-4" />
          Добавить задачу
        </button>
      </div>
    </motion.form>
  );
};