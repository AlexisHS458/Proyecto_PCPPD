import { auth } from '@/utils/firebase';


class AuthService {
    
    logout(){
        return auth.signOut();
    }
}

export default new AuthService();