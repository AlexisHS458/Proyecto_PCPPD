import { auth } from '@/utils/firebase';


class AuthService {
    private auth = auth;

    get authChanges(){
        return this.auth.onAuthStateChanged;
    }

    logout() {
        return this.auth.signOut();
    }
}

export default new AuthService();