import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ShipmentsPage } from './components/shipments-page';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ShipmentsPage />
    </QueryClientProvider>
  );
}

export default App;
