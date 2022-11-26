import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './Pages/Router/Router';

function App() {
  return (
    <div className='max-w-[1440px] mx-auto'>
      <RouterProvider router={router}>
      <Toaster/> 
      </RouterProvider>
    </div>

  );
}

export default App;
