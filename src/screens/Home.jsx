import IncompleteTask from "../components/IncompleteTask";
import data from "../data";
import CompletedTask from "../components/CompleteTask";
import useStore from "../store";
import { useEffect, useState } from "react";
import { databases } from "../appwrit";
import { Query } from "appwrite";

const databaseId = import.meta.env.VITE_TODO_DATABASE_ID;
const dataCollectionId = import.meta.env.VITE_DATA_COLLECTION_ID;

export default function Home() {
  const userId = useStore((state) => state.userId);
  const [tasks, setTasks] = useState([]);
  const completedTasks = tasks.filter((task) => task.completed);
  const inCompleteTasks = tasks.filter((task) => !task.completed);

  useEffect(() => {
    const promise = databases.listDocuments(databaseId, dataCollectionId, [
      Query.equal("user_id", userId),
    ]);
    promise.then(
      function (response) {
        // console.log(response);
        setTasks(response.documents[0].user_tasks);
      },
      function (error) {
        console.log(error);
      }
    );
  }, [userId]);
  return (
    <div className="w-full h-[100%]  px-4 space-y-3 flex flex-col">
      <div className=" flex-[5] w-full overflow-y-auto space-y-3">
        <div>
          <h3 className="text-2xl font-bold text-[#5e5e5e]">Tasks</h3>
        </div>
        <div className="space-y-2">
          {inCompleteTasks.map((task) => (
            <IncompleteTask key={task.$id} task={task} />
          ))}
        </div>
        {completedTasks.length > 0 && (
          <div className="border-b-2 border-gray-500 my-2"></div>
        )}
        <div className="space-y-2">
          {completedTasks.map((task) => (
            <CompletedTask key={task.$id} task={task} />
          ))}
        </div>
      </div>
      <div className="flex-[1] w-full">
        <div className="h-[45%] w-full bg-gray-300 rounded-t-md">
          <input
            type="text"
            className="w-full h-full bg-transparent outline-none px-4 placeholder:text-gray-500"
            placeholder="What do you want to do?"
          />
        </div>
        <div className="h-[45%] w-full bg-black rounded-b-md cursor-pointer">
          <h1 className="text-white text-2xl text-center pt-2">+ Add</h1>
        </div>
      </div>
    </div>
  );
}
