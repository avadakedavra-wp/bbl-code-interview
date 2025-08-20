import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import Items from './components/items';
import CreateItems from './components/create-item';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/items" element={<Items />} />
          <Route path="/items/new" element={<CreateItems />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
