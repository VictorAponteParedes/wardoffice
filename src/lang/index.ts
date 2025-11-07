import Login from './es/login.json';
import PageNotFound from './es/PageNotFount.json';
import Sidebar from './es/sidebar.json';
import Members from './es/members.json';
import CreateMember from './es/CreateMember.json';
// Definir el idioma actual, por ejemplo, 'es' para español
const currentLanguage = 'es';


const translations = {
    es: {
        // Traducciones para el idioma español
        ...Login,
        ...PageNotFound,
        ...Sidebar,
        ...Members,
        ...CreateMember,
    },

};

// Función para obtener la traducción
const translate = (key) => {
    const keys = key.split('.');
    let result = translations[currentLanguage];

    for (const k of keys) {
        result = result[k];
        if (result === undefined) return key; // Devuelve la clave si no encuentra la traducción
    }

    return result || key;
};


export { translate };