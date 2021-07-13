import { auth } from '@/utils/firebase';
import Firebase from 'firebase/app';


class UserService {
    getUserAuthInfo(): Firebase.User | null {
        var user = auth.currentUser
        return user;
    }
}

export default new UserService();