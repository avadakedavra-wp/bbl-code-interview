import React from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div >
      <nav>
        <div>
          <div>
            <div>
              <Link to="/items" >
                Items
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main >
        {children}
      </main>
    </div>
  );
};

export default Layout;