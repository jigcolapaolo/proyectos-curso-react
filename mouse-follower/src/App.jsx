import { useEffect, useState } from "react"

const FollowMouse = () => {

  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });


  //Pointer move effect
  useEffect(() => {
    const handleMove = (event) => {
      //Captura la ubicacion X Y del puntero y la guarda en setPosition para usar en los estilos
      const { clientX, clientY } = event;
      setPosition({ x: clientX, y: clientY })
    }

    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }

    //Cleanup cuando el componente se desmonta y cuando cambian las dependencias,
    //antes de ejecutar el evento de nuevo
    return () => {
      window.removeEventListener('pointermove', handleMove)
    }

  }, [enabled]);

  //Change body className
  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)
    
    return () => {
      document.body.classList.remove('no-cursor',)
    }

  }, [enabled]);

  return (
    <>
      <div style={{
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: '1px solid #fff',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -25,
        top: -25,
        width: 50,
        height: 50,
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      />
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : 'Activar'} seguir puntero
      </button>
    </>
  );
}

function App() {
  const [mounted, setMounted] = useState(true)


  return (
    <main>
      {mounted && <FollowMouse />}
      <button onClick={() => setMounted(!mounted)}>
        Toggle mounted FollowMouse component
      </button>
    </main>
  )
}

export default App
