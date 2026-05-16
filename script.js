// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDd3EaTYm1DhLPRxNJTe5Z-YI_e_3WrBOY",
    authDomain: "pro-ab755.firebaseapp.com",
    projectId: "pro-ab755",
    storageBucket: "pro-ab755.firebasestorage.app",
    messagingSenderId: "44360529590",
    appId: "1:44360529590:web:eca4a6ec0d9d448e831817",
    measurementId: "G-HF5FW5L9KM"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Google Auth Provider
const provider = new firebase.auth.GoogleAuthProvider();

// DOM Elements
const googleSignInBtn = document.getElementById('googleSignIn');
const loginForm = document.getElementById('loginForm');

// Google Sign In
googleSignInBtn.addEventListener('click', async () => {
    try {
        const result = await firebase.auth().signInWithPopup(provider);
        const user = result.user;
        console.log('Google sign-in successful:', user);
        alert('Welcome ' + user.displayName + '!');
        // Redirect or update UI as needed
    } catch (error) {
        console.error('Google sign-in error:', error);
        alert('Sign-in failed: ' + error.message);
    }
});

// Email/Password Sign In
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        const result = await firebase.auth().signInWithEmailAndPassword(email, password);
        console.log('Email sign-in successful:', result.user);
        alert('Welcome back!');
        // Redirect or update UI as needed
    } catch (error) {
        console.error('Email sign-in error:', error);
        alert('Sign-in failed: ' + error.message);
    }
});

// Auth state listener
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log('User is signed in:', user);
        // User is signed in, redirect to dashboard or update UI
    } else {
        console.log('User is signed out');
    }
});