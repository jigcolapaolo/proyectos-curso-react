import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const client = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={client}>
        <App />
        <ReactQueryDevtools />
    </QueryClientProvider>
)
