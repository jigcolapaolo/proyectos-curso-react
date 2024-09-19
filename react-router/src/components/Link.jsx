/* eslint-disable react/prop-types */
import { EVENTS } from "../utils/const";

// eslint-disable-next-line react-refresh/only-export-components
export function navigate(href) {
  // Nos permite cambiar la url sin recargarla
  window.history.pushState({}, "", href);
  // Crear evento personalizado para avisar que se cambio la url
  const navigationEvent = new Event(EVENTS.PUSHSTATE);
  window.dispatchEvent(navigationEvent);
}

export function Link({ target, to, ...props }) {
  const handleClick = (event) => {
    // Para que funcione el teclado al querer navegar, keybind
    const isMainEvent = event.button === 0; // Primary click, ignora todo excepto el click izquierdo
    const isModifiedEvent = 
      event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;
    const isManageableEvent = target === undefined || target === "_self";

    if (isMainEvent && isManageableEvent && !isModifiedEvent) {
      // preventDefault para que no se recargue la pagina
      event.preventDefault();
      // Si se cumplen estas 3, se usa SPA
      navigate(to);
    /* Hacer scroll arriba de todo al navegar a otra pagina
       window.scrollTo(0, 0) */
    }
  };

  // ...props le pasa todas las props incluida children
  return <a onClick={handleClick} href={to} target={target} {...props} />;
}
