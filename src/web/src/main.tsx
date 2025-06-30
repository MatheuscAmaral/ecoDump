
import { createRoot } from 'react-dom/client';
import { Toaster } from "@/components/ui/sonner"
import {
  QueryClientProvider,
} from '@tanstack/react-query'
import './index.css';
import AppRouter from './routes/index.tsx';
import { queryClient } from './lib/react-query.ts';

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <AppRouter />
    <Toaster />
  </QueryClientProvider>
);
