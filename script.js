// Firebase (dummy config - replace with real one)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBBcMUDFQ8SkiukepPa975KpG0P7nSrEAc",
  authDomain: "sensore-7a093.firebaseapp.com",
  databaseURL: "https://sensore-7a093-default-rtdb.firebaseio.com",
  projectId: "sensore-7a093",
  storageBucket: "sensore-7a093.firebasestorage.app",
  messagingSenderId: "966195331690",
  appId: "1:966195331690:web:878ca740d0da8643c10013"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const messageRef = ref(database, 'messages/latest');
const messageDisplay = document.getElementById('messageDisplay');

// Live message from Firebase
onValue(messageRef, (snapshot) => {
  const data = snapshot.val();
  if (data) {
    messageDisplay.innerText = data;
  } else {
    messageDisplay.innerText = "No message yet...";
  }
});

// A2HS Button (Add to Home Screen)
let deferredPrompt;
const a2hsBtn = document.getElementById('a2hsButton');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  a2hsBtn.hidden = false;
});

a2hsBtn.addEventListener('click', () => {
  a2hsBtn.hidden = true;
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => deferredPrompt = null);
  }
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log("✅ Service Worker registered"))
      .catch(err => console.log("❌ Registration failed", err));
  });
}
