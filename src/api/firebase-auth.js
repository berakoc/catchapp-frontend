import firebase from 'firebase/app';
import 'firebase/auth';
import { is } from '../lib/bool';

export default class FirebaseAuthAPI {
    constructor() {
        throw new Error('Cannot create an object of a static class.');
    }

    static getInstance() {
        let app = null;
        if (is(firebase.apps.length, 0)) {
            const config = {
                apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
                authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
                databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
                storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
                projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
            };
            app = firebase.initializeApp(config);
        } else {
            app = firebase.app();
        }
        return app;
    }

    static init(fetchSessionUser) {
        FirebaseAuthAPI.getInstance();
        firebase.auth().onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                fetchSessionUser(firebaseUser);
            }
        });
        console.log('Firebase Auth is ready.');
    }

    static login = async (email, password) =>
        await firebase.auth().signInWithEmailAndPassword(email, password);

    static signUp = async (email, password) =>
        await firebase.auth().createUserWithEmailAndPassword(email, password);

    static logout = async () => await firebase.auth().signOut();
}

Object.freeze(FirebaseAuthAPI.prototype);
