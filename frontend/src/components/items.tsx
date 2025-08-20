import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export interface Item {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
}

const Items: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [createMode, setCreateMode] = useState(false);
  const { new: isNew } = useParams();

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    if (isNew) {
      setCreateMode(true);
    } else {
      setCreateMode(false);
    }
  }, [isNew]);

  const loadItems = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/items");
      const fetchedItems = await response.json();
      setItems(fetchedItems);
      setError(null);
    } catch (err) {
      setError("Failed to load items");
      console.error("Error loading items:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading items...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center">
        <p>{error}</p>
        <button
          onClick={loadItems}
          className="mt-2 px-4 py-2 bg-[#646cffaa] text-white rounded hover:bg-[#646cffaa]"
        >
          Retry
        </button>
      </div>
    );
  }

  if (createMode) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Create New Item
        </h2>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-amber-50">Items</h1>
        <Link
          to="/items/new"
          className="px-4 py-2 rounded-md hover:bg-[#646cffaa]/30"
        >
          Create New Item
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No items found.</p>
          <Link
            to="/items/new"
            className="mt-4 inline-block px-4 py-2 bg-[#646cffaa] text-white rounded-md hover:bg-[#646cffaa]"
          >
            Create your first item
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md p-6 border"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {item.name}
              </h3>
              {item.description && (
                <p className="text-gray-600 mb-4">{item.description}</p>
              )}
              <p className="text-sm text-gray-500 mb-4">
                Created: {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Items;
