import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"
export interface Item {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
}

const CreateItems: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate()
  return (
    <div className="px-4 py-6 sm:px-0">
      <h1 className="text-2xl font-bold mb-4">Create Item</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const newItem: Item = {
            id: crypto.randomUUID(),
            name,
            description,
            createdAt: new Date().toISOString(),
          };
          try {
            const response = await fetch("http://localhost:3000/items", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newItem),
            });
            if (!response.ok) {
              throw new Error("Failed to create item");
            }
            setName("");
            setDescription("");
            navigate("/items")
          } catch (error) {
            console.error("Error creating item:", error);
          }
        }}
      >
        <div className="mb-4">
          <label className="block text-sm text-left font-medium text-gray-700 dark:text-amber-50 mb-2">
            Name
          </label>
          <input
            type="text"
            value={name}
            className="bg-gray-50 border border-gray-300 text-gray-900  text-sm rounded-lg block w-full p-2.5"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-left font-medium text-gray-700 dark:text-amber-50 mb-2">
            Description
          </label>
          <input
            type="text"
            value={description}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
          >
            Create Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateItems;
