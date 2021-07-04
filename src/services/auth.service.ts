import { auth } from '@/utils/firebase';
import * as firebaseui from 'firebaseui'


class AuthService {
    initLoginUI(): firebaseui.auth.AuthUI{
        return new firebaseui.auth.AuthUI(auth);
    }

    logout(){
        return auth.signOut();
    }
}

export default new AuthService();