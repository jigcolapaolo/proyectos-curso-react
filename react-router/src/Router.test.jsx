import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { Router } from "./components/Router";
import { getCurrentPath } from "./utils/getCurrentPath";
import { Route } from "./components/Route";
import { Link } from "./components/Link";

//Quiero mockear lo que esta en utils.js con un valor especifico
// vi.fn() permite el uso de getCurrentPath.mockReturnValue('/about')
vi.mock("./utils/getCurrentPath.js", () => ({
  getCurrentPath: vi.fn(),
}));

describe("Router", () => {
  // Limpia la pantalla antes de cada test
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("should render without problems", () => {
    // Esto solo funcionara bien si en RouterToUse en Router, usa el filter(Boolean)
    render(<Router routes={[]} />);
    expect(true).toBeTruthy();
  });

  it("should render 404 if no routes match", () => {
    render(<Router routes={[]} defaultComponent={() => <h1>404</h1>} />);
    expect(screen.getByText("404")).toBeTruthy();
    console.log(screen.debug());
    // Si encuentra el 404, dara bien el test, si lo cambio a cualquier otro numero, no dara bien
    // screen debug muestra el html que se renderiza
  });

  it("should render the component of the first route that matches", () => {
    // Puedo testear con '/about' o '/'
    getCurrentPath.mockReturnValue("/about");

    const routes = [
      {
        path: "/",
        Component: () => <h1>Home</h1>,
      },
      {
        path: "/about",
        Component: () => <h1>About</h1>,
      },
    ];

    render(<Router routes={routes} />);
    // Puedo cambiar lo que se espera obtener segun si estoy en home o about
    expect(screen.getByText("About")).toBeTruthy();
  });

  it("should navigate using Links", async () => {
    getCurrentPath.mockReturnValueOnce("/");

    render(
      <Router>
        <Route
          path="/"
          Component={() => {
            return (
              <>
                <h1>Home</h1>
                <Link to="/about">Go to About</Link>
              </>
            );
          }}
        />
        <Route path="/about" Component={() => <h1>About</h1>} />
      </Router>
    );

    // Se usa el mock para decir que estoy en Home,
    // Si estoy en Home, busco el elemento con el texto /Go to About/ que seria el Link
    // Clickeo ese elemento
    // Se deberia renderizar el Route path="/about", por lo tanto si se encuentra el About
    // , quiere decir que la navegacion se realizo correctamente
    const anchor = screen.getByText(/Go to About/);
    fireEvent.click(anchor);
    const aboutTitle = await screen.findByText("About");
    console.log(screen.debug());
    expect(aboutTitle).toBeTruthy();
  });
});
