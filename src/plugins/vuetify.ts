import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme:{ //Paleta de colores elegida para el proyecto
        themes: { 
            light:{ 
                primary: '0C2A52',
                secondary: '1B3644',
                error: 'A10B2B',
                warning: "FF8C00",
                success: "6EA900",
                info: 'A6E6DB',
                primaryLight: '#3e527e',
                secondaryLight: '#46606f',
                errorLight: '#d84a54',
                infoLight: '#d9ffff',
                successLight: '#a1db45',
                warningLight: '#ffbd45',
                primaryDark: '#000029',
                secondaryDark: '#00101d',
                errorDark: '#6b0001',
                infoDark: '#75b4a9',
                successDark: '#3b7900',
                warningDark: '#c55d00'
            },
           /*  dark: {
                primaryDark: '#000029',
                secondaryDark: '#00101d',
                errorDark: '#6b0001',
                infoDark: '#75b4a9',
                successDark: '#3b7900',
                warningDark: '#c55d00'
            } */
        }
    }
});
