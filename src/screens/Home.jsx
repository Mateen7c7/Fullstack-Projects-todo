import IncompleteTask from "../components/IncompleteTask";
import CompletedTask from "../components/CompleteTask";
import useStore from "../store";
import { useEffect, useRef, useState } from "react";
import { databases } from "../appwrit";
import { ID, Query } from "appwrite";

const databaseId = import.meta.env.VITE_TODO_DATABASE_ID;
const dataCollectionId = import.meta.env.VITE_DATA_COLLECTION_ID;
const tasksCollectionId = import.meta.env.VITE_TASKS_COLLECTION_ID;

export default function Home() {
  const userId = useStore((state) => state.userId);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const completedTasks = tasks?.filter((task) => task.completed);
  const inCompleteTasks = tasks?.filter((task) => !task.completed);
  // sort inCompletedTasks by created date
  inCompleteTasks?.sort((a, b) => {
    return new Date(b.$createdAt) - new Date(a.$createdAt);
  });

  completedTasks?.sort((a, b) => {
    return new Date(a.$createdAt) - new Date(b.$createdAt);
  });
  const documentId = useRef();
  useEffect(() => {
    const promise = databases.listDocuments(databaseId, dataCollectionId, [
      Query.equal("user_id", userId),
    ]);
    promise.then(
      function (response) {
        console.log(response?.documents[0].user_tasks);
        documentId.current = response?.documents[0].$id;
        setTasks(response?.documents[0].user_tasks);
      },
      function (error) {
        console.log(error);
      }
    );
  }, [userId]);

  const handleCompleteTask = (id) => {
    const index = tasks.findIndex((task) => task.$id === id);
    const newTasks = [...tasks];
    newTasks[index].completed = true;
    setTasks(newTasks);

    const promise = databases.updateDocument(
      databaseId,
      tasksCollectionId,
      id,
      {
        completed: true,
      }
    );
    promise.then(
      function (response) {
        console.log(response);
      },
      function (error) {
        console.log(error);
      }
    );
  };

  const handleDeleteTask = (id) => {
    const index = tasks.findIndex((task) => task.$id === id);
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);

    const promise = databases.deleteDocument(databaseId, tasksCollectionId, id);
    promise.then(
      function (response) {
        console.log(response);
      },
      function (error) {
        console.log(error);
      }
    );
  };

  const handleSubmit = () => {
    if (newTask) {
      const promise = databases.createDocument(
        databaseId,
        tasksCollectionId,
        ID.unique(),
        {
          title: newTask,
          data: documentId.current,
        }
      );

      promise.then(
        function (response) {
          console.log(response);
          setTasks([...tasks, response]);
          setNewTask("");
          // window.location.reload();
        },
        function (error) {
          console.log(error);
        }
      );
    }
  };

  return (
    <div className="w-full h-[100%]  px-4 space-y-3 flex flex-col">
      <div className=" flex-[5] w-full overflow-y-auto space-y-3">
        <div>
          <h3 className="text-2xl font-bold text-[#5e5e5e]">Tasks</h3>
        </div>
        <div className="space-y-2">
          {inCompleteTasks.map((task) => (
            <IncompleteTask
              onClick={handleCompleteTask}
              key={task.$id}
              task={task}
            />
          ))}
        </div>
        {completedTasks.length > 0 && (
          <div className="border-b-2 border-gray-500 my-2"></div>
        )}
        <div className="space-y-2">
          {completedTasks.map((task) => (
            <CompletedTask
              onClick={handleDeleteTask}
              key={task.$id}
              task={task}
            />
          ))}
        </div>
      </div>
      <div className="flex-[1] w-full">
        <div className="h-[45%] w-full bg-gray-300 rounded-t-md">
          <input
            type="text"
            className="w-full h-full bg-transparent outline-none px-4 placeholder:text-gray-500"
            placeholder="What do you want to do?"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
        </div>
        <div
          onClick={handleSubmit}
          className="h-[45%] w-full bg-black rounded-b-md cursor-pointer"
        >
          <h1 className="text-white text-2xl text-center pt-2">+ Add</h1>
        </div>
      </div>
    </div>
  );
}
