import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import Home from './pages/Home.jsx';
import AllData from './pages/AllData.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/units-info' element={<AllData />} />
          <Route path='*' element={<NotFound />} />
        </Route>
        
      </Routes>
    </BrowserRouter>

  )
}

export default App;
