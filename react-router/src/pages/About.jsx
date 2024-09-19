/* eslint-disable react/prop-types */
import { Link } from '../Link.jsx'

const i18n = {
    es: {
        title: 'Sobre nosotros',
        button: 'Ir a Home',
        description: 'Hola! Estoy creando un clon de React Router'
    },
    en: {
        title: 'About us',
        button: 'Go to Home Page',
        description: "Hello! I'm creating a React Router clone"
    }
}

const useI18n = (lang) => {
    return i18n[lang] || i18n.en
}

export default function AboutPage({ routeParams }) {
    // Si no tiene lang, por defecto usa 'es'
    const i18n = useI18n(routeParams.lang ?? 'es') 
  return (
    <>
      <h1>{i18n.title}</h1>
      <div>
        <img
          src="https://sm.ign.com/ign_br/screenshot/default/blob_79dq.jpg"
          alt="Foto de perfil"
        ></img>
        <p>{i18n.description}</p>
      </div>
      <Link to='/'>{i18n.button}</Link>
    </>
  );
}
