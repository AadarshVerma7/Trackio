import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import createGroupbgLight from '../../assets/createGroupbgLight.png'
import createGroupbgDark from '../../assets/createGroupbgDark.png'
import {toast} from "react-toastify";


const CreateGroup = ({ close3, theme }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      groupName:data.groupName,
      topic:data.groupTopic,
      description:data.groupDescription,
      todoList:todos.map(todo=>({task:todo.text})),
    };

    try {
      const response = await fetch("http://localhost:4000/api/group/create",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(payload),
        credentials:"include",
      });

      const result = await response.json();

      if(result.success){
        toast.success(`${result.message}`);
        setTodos([]);
        close3();
      }
      else{
        toast.error(`${result.message}`);
      }
    } catch (error) {
      console.error("Error Creating group : ",error);
      toast.error("Something went wrong. Please try again !");
    }
  };

  const [task,setTask] = useState("");
  const [todos,setTodos] = useState([]);

  const addTodo = (e) => {
    e.preventDefault();
    if(task.trim() === "") return;
    setTodos([...todos, {id: Date.now(), text:task}]);
    setTask("");
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id != id))
  }
  
  return (
    <div className="bg-cover bg-center w-[950px] max-w-[95vw] rounded-2xl border-2 border-orange-400 shadow-lg p-8 relative flex gap-8"
    style={theme === "light" ? {backgroundImage: `url(${createGroupbgLight})`} : {backgroundImage: `url(${createGroupbgDark})`}}
    >
      {/* Close button */}
      <button
        onClick={close3}
        className="absolute top-3 right-4 text-orange-500 hover:text-orange-600 text-3xl font-bold"
        aria-label="Close"
      >
        &times;
      </button>

      {/* Left Section - Form */}
      <div className="flex-1">
        <h1 className={ theme === "light" ? "text-3xl font-bold fjalla mb-6 text-black" : "text-3xl font-bold fjalla mb-6 text-white"}>
        Let's build your community
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Group Name */}
          <div>
            <p className={theme === "light" ? "text-sm font-medium mb-1 text-black" : "text-sm font-medium mb-1 text-white"}>Group Name*</p>
            <input
              type="text"
              placeholder="Ex: Learn React!"
              className={theme === "light" ? `w-full border-2 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.groupName ? "border-red-500" : "border-orange-500"
              } bg-transparent text-black placeholder-gray-500` : `w-full border-2 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.groupName ? "border-red-500" : "border-orange-500"
              } bg-transparent text-white placeholder-gray-500`}
              {...register("groupName", { required: "Group Name is required" })}
            />
            {errors.groupName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.groupName.message}
              </p>
            )}
          </div>

          {/* Group Topic */}
          <div>
            <p className={theme === "light" ? "text-sm font-medium mb-1 text-black" : "text-sm font-medium mb-1 text-white"}>Group Topic*</p>
            <input
              type="text"
              placeholder="React"
              className={theme === "light" ? `w-full border-2 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.groupTopic ? "border-red-500" : "border-orange-500"
              } bg-transparent text-black placeholder-gray-500` : `w-full border-2 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.groupTopic ? "border-red-500" : "border-orange-500"
              } bg-transparent text-white placeholder-gray-500`}
              {...register("groupTopic", { required: "Group Topic is required" })}
            />
            {errors.groupTopic && (
              <p className="text-red-500 text-sm mt-1">
                {errors.groupTopic.message}
              </p>
            )}
          </div>

          {/* Group Description */}
          <div>
            <p className={theme === "light" ? "text-sm font-medium mb-1 text-black" : "text-sm font-medium mb-1 text-white"}>Group Description</p>
            <textarea
              rows="3"
              placeholder="We created this group to learn React.js!"
              className={theme == "light" ? `w-full border-2 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.groupDescription ? "border-red-500" : "border-orange-500"
              } bg-transparent text-black placeholder-gray-500` : `w-full border-2 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.groupDescription ? "border-red-500" : "border-orange-500"
              } bg-transparent text-white placeholder-gray-500`}
              {...register("groupDescription", {
                required: "Group Description is required",
              })}
            />
            {errors.groupDescription && (
              <p className="text-red-500 text-sm mt-1">
                {errors.groupDescription.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition cursor-pointer"
          >
            Create Group
          </button>
        </form>
      </div>

      {/* Right Section */}
      <div className="flex-1 border-l pl-6">
        <h2 className={theme === "light" ? "text-3xl font-semibold mb-4 fjalla text-black" : "text-3xl font-semibold mb-4 fjalla text-white"}>Your tasks, your way</h2>
        
        {/* SubTopic List  */}
        <div className='relative top-1.5'>
            <p className={theme === "light" ? "text-sm font-medium mb-1 text-black" : "text-sm font-medium mb-1 text-white"}>Add the topics you want to learn!</p>
          <div className='flex gap-2 mb-4'>
              <input
              value={task}
              onChange={(e)=>{setTask(e.target.value)}} 
              placeholder='Ex: React Hooks'
              className={theme === "light" ? `w-full border-2 border-orange-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-transparent text-black placeholder-gray-500` : `w-full border-2 border-orange-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-transparent text-white placeholder-gray-500`}
              />
              <button 
              onClick={addTodo}
              className='bg-orange-500 text-white px-4 rounded-lg hover:bg-orange-600 h-10'>Add</button>
          </div>
          <div>
            <ul className='space-y-2'>
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex justify-between items-center bg-orange-400 text-zinc-900 font-semibold p-2 rounded-lg"
                >
                  <span>{todo.text}</span>
                  <button
                    onClick={() => {deleteTodo(todo.id)}}
                    className="text-red-600 hover:text-red-800 text-2xl"
                  >&times;</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default CreateGroup;
