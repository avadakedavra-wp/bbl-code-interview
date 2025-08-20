import React from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <nav>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-6">
              <Link
                to="/items"
                className="text-lg font-semibold text-gray-900 hover:text-gray-700"
              >
                Items
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6" id="main">
        {children}
      </main>
    </div>
  );
};

export default Layout;
