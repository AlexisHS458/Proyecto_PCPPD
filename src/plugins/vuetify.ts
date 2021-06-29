import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme:{ //Paleta de colores elegida para el proyecto
        themes: { 
            light:{ 
                primary: '#3e527e',
                secondary: '#46606f',
                error: '#d84a54',
                info: '#d9ffff',
                success: '#a1db45',
                warning: '#ffbd45'
            },
            dark: {
                primary: '#000029',
                secondary: '#00101d',
                error: '#6b0001',
                info: '#75b4a9',
                success: '#3b7900',
                warning: '#c55d00'
            }
        }
    }
});
