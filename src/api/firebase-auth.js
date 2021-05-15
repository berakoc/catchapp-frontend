import firebase from 'firebase/app'
import { is } from '../lib/bool'

const GET_REQUEST = {
    method: 'GET',
    mode: 'cors',
    headers: {
        Accept: 'application/json'
    }
}

export default class FirebaseAuthAPI {
    static getInstance() {
        let app = null
        if (is(firebase.apps.length, 0)) {
            console.log(process.env)
            const config = {
                apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
                authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
                databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
                storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
                projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
            }
            app = firebase.initializeApp(config)
        } else {
            app = firebase.app()
        }
        return app
    }

    static getSessionUser = async () => {
        //const response = await fetch(FIREBASE_AUTH_API_URL, GET_REQUEST)
    }
}