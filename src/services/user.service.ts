import { auth } from '@/utils/firebase';
import Firebase from 'firebase/app';


class UserService {
    getUserAuthInfo(): Firebase.User | null {
        const user = auth.currentUser;
        return user;
    }
}

export default new UserService();