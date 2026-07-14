import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';

import Home from '@/pages/Home';
import CV from '@/pages/CV';
import Projects from '@/pages/Projects';
import ProjectDetail from '@/pages/ProjectDetail';
import Creations from '@/pages/Creations';
import { GlobalNav } from '@/components/GlobalNav';
import { ThemeToggle } from '@/components/ThemeToggle';
// ThemeToggleInline is rendered inside Home.tsx footer; ThemeToggle handles all other pages

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/cv" component={CV} />
      <Route path="/projects" component={Projects} />
      <Route path="/projects/:id" component={ProjectDetail} />
      <Route path="/creations" component={Creations} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <GlobalNav />
          <Router />
          <ThemeToggle />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
