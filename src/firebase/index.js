import firebase from 'firebase';
import {firebaseConfig} from './config.js';

export const firebaseApp=firebase.initializeApp(firebaseConfig);
export const firebaseDB=firebaseApp.database();