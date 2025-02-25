


// import { useState } from "react";
// import { useTaskStore } from "../store/useTaskStore";
// import TaskList from "./TaskList";
// import { CheckCircle, Circle, Clock, ListTodo, RotateCcw } from 'lucide-react';

// const categories = [
//     { id: "All", icon: ListTodo, label: "All Tasks" },
//     { id: "To Do", icon: Circle, label: "To Do" },
//     { id: "In Progress", icon: Clock, label: "In Progress" },
//     { id: "Done", icon: CheckCircle, label: "Completed" },
//     { id: "Timeout", icon: RotateCcw, label: "Expired" }
// ];

// const CategoryFilter = () => {
//     const { tasks } = useTaskStore();
//     const [selectedCategory, setSelectedCategory] = useState("All");

//     const filteredTasks = selectedCategory === "All"
//         ? tasks
//         : tasks.filter(task => task.status === selectedCategory);

//     const getTaskCount = (category: string) => {
//         return category === "All"
//             ? tasks.length
//             : tasks.filter(task => task.status === category).length;
//     };

//     return (
//         <div className="flex flex-col items-center space-y-6">
//             <div className="w-full max-w-4xl bg-[#1a1a3a] rounded-2xl p-2 shadow-lg border border-purple-500/20">
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
//                     {categories.map(({ id, icon: Icon, label }) => {
//                         const count = getTaskCount(id);
//                         const isSelected = selectedCategory === id;

//                         return (
//                             <button
//                                 key={id}
//                                 onClick={() => setSelectedCategory(id)}
//                                 className={`flex items-center justify-center gap-2 p-3 rounded-xl transition-all duration-300 ${isSelected
//                                     ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg'
//                                     : 'hover:bg-[#0B0B1E]/50 text-gray-400 hover:text-white'
//                                     }`}
//                             >
//                                 <Icon className="w-4 h-4" />
//                                 <span className="hidden md:inline">{label}</span>
//                                 <span className="text-sm">({count})</span>
//                             </button>
//                         );
//                     })}
//                 </div>
//             </div>

//             <TaskList tasks={filteredTasks} />
//         </div>
//     );
// };

// export default CategoryFilter;


import { useState } from "react";
import { useTaskStore } from "../store/useTaskStore";
import TaskList from "./TaskList";
import { CheckCircle, Circle, Clock, ListTodo, RotateCcw } from 'lucide-react';

const categories = [
    { id: "All", icon: ListTodo, label: "All Tasks" },
    { id: "To Do", icon: Circle, label: "To Do" },
    { id: "In Progress", icon: Clock, label: "In Progress" },
    { id: "Done", icon: CheckCircle, label: "Completed" },
    { id: "Timeout", icon: RotateCcw, label: "Expired" }
];

const CategoryFilter = () => {
    const { tasks } = useTaskStore();
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredTasks = selectedCategory === "All"
        ? tasks
        : tasks.filter(task => task.status === selectedCategory);

    const getTaskCount = (category: string) => {
        return category === "All"
            ? tasks.length
            : tasks.filter(task => task.status === category).length;
    };

    return (
        <div className="flex flex-col items-center space-y-6 px-2 sm:px-4">
            <div className="w-full max-w-4xl bg-[#1a1a3a] rounded-2xl p-2 shadow-lg border border-purple-500/20 overflow-x-auto">
                {/* Horizontal scrollable container for very small screens */}
                <div className="flex sm:grid sm:grid-cols-3 md:grid-cols-5 gap-2 min-w-max sm:min-w-0">
                    {categories.map(({ id, icon: Icon, label }) => {
                        const count = getTaskCount(id);
                        const isSelected = selectedCategory === id;

                        return (
                            <button
                                key={id}
                                onClick={() => setSelectedCategory(id)}
                                className={`flex items-center justify-center gap-2 p-3 rounded-xl transition-all duration-300 whitespace-nowrap ${isSelected
                                    ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg'
                                    : 'hover:bg-[#0B0B1E]/50 text-gray-400 hover:text-white'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                <span className="text-sm">{label.split(' ')[0]}</span>
                                <span className="text-xs">({count})</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <TaskList tasks={filteredTasks} />
        </div>
    );
};

export default CategoryFilter;