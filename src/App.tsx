import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Container } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

function App() {


  return (
    <QueryClientProvider client={queryClient}>
      <Container maxWidth={'lg'} sx={{ pt: 5 }}>
        <RouterProvider router={router} />
        <ToastContainer />
      </Container>
    </QueryClientProvider>
  );
}

export default App;
