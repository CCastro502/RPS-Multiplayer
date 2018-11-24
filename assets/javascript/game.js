// Initialize Firebase
var config = {
    apiKey: "AIzaSyAoM07PdA_2ntSLQGMrU3wD3dpqivifVlc",
    authDomain: "hhgjkvk.firebaseapp.com",
    databaseURL: "https://hhgjkvk.firebaseio.com",
    projectId: "hhgjkvk",
    storageBucket: "hhgjkvk.appspot.com",
    messagingSenderId: "993857542944"
};
firebase.initializeApp(config);

// Create shorthand to accessing FB DB
var database = firebase.database();