import firebase from 'firebase'
var config = {
	apiKey: "AIzaSyDinGuFBHphhrOMkZxq3TevFzzFqDTiE70",
	authDomain: "goochat-c3355.firebaseapp.com",
	databaseURL: "https://goochat-c3355.firebaseio.com",
	projectId: "goochat-c3355",
	storageBucket: "goochat-c3355.appspot.com",
	messagingSenderId: "398255673485"
};
var FirebaseConfig = firebase.initializeApp(config);

export default FirebaseConfig;