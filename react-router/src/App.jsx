import { lazy, Suspense } from "react";

import Page404 from "./pages/404.jsx";
import { SearchPage } from "./pages/SearchPage.jsx";

import { Router } from "./Router.jsx";
import { Route } from "./Route.jsx";

// Import dinámico, devuelve PROMISE
const LazyHomePage = lazy(() => import("./pages/Home.jsx"));
const LazyAboutPage = lazy(() => import("./pages/About.jsx"));

const appRoutes = [
  {
    path: '/:lang/about',
    Component: LazyAboutPage
  },
  {
    // Url dinámica
    path: "/search/:query",
    Component: SearchPage,
  },
];

function App() {
  return (
    <main>
      <Suspense fallback={null}>
        <Router routes={appRoutes} defaultComponent={Page404}>
          <Route path="/" Component={LazyHomePage} />
          <Route path="/about" Component={LazyAboutPage} />
        </Router>
      </Suspense>
    </main>
  );
}

export default App;
