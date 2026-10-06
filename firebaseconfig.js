// firebase-config.js - Firebase初期化と認証・同期の共通処理
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCPp2jKRGMrxGivzKF820UvX1B4AUpMkEI",
  authDomain: "carcon-d0947.firebaseapp.com",
  projectId: "carcon-d0947",
  storageBucket: "carcon-d0947.firebasestorage.app",
  messagingSenderId: "60686984487",
  appId: "1:60686984487:web:3ecfd5989028e5193ef502",
  measurementId: "G-DKY1332YVW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// ===== 認証 =====
window.fbSignIn = (email, password) => signInWithEmailAndPassword(auth, email, password);
window.fbSignUp = (email, password) => createUserWithEmailAndPassword(auth, email, password);
window.fbSignOut = () => signOut(auth);
window.fbOnAuthStateChanged = (cb) => onAuthStateChanged(auth, cb);

// ★ Googleログイン
window.fbSignInWithGoogle = () => signInWithPopup(auth, googleProvider);

// ===== Firestore同期 =====
window.fbSaveProgress = async function() {
  const user = auth.currentUser;
  if (!user) return false;
  try {
    const data = {
      qHistory: JSON.parse(localStorage.getItem('cc_qHistory') || '{}'),
      catStats: JSON.parse(localStorage.getItem('cc_catStats') || '{}'),
      wrongCounts: JSON.parse(localStorage.getItem('cc_wrongCount') || '{}'),
      stats: JSON.parse(localStorage.getItem('cc_stats') || '{}'),
      statsByLevel: JSON.parse(localStorage.getItem('cc_stats_byLevel') || '{}'),
      statsByPerson: JSON.parse(localStorage.getItem('cc_stats_byPerson') || '{}'),
      gidMap: JSON.parse(localStorage.getItem('cc_gidMap') || '{}'),
      categories: JSON.parse(localStorage.getItem('cc_categories') || '{}'),
      updatedAt: new Date().toISOString()
    };
    await setDoc(doc(db, 'users', user.uid, 'data', 'progress'), data);
    return true;
  } catch (e) {
    console.error('保存失敗:', e);
    return false;
  }
};

window.fbLoadProgress = async function() {
  const user = auth.currentUser;
  if (!user) return false;
  try {
    const snap = await getDoc(doc(db, 'users', user.uid, 'data', 'progress'));
    if (!snap.exists()) return false;
    const data = snap.data();
    if (data.qHistory) localStorage.setItem('cc_qHistory', JSON.stringify(data.qHistory));
    if (data.catStats) localStorage.setItem('cc_catStats', JSON.stringify(data.catStats));
    if (data.wrongCounts) localStorage.setItem('cc_wrongCount', JSON.stringify(data.wrongCounts));
    if (data.stats) localStorage.setItem('cc_stats', JSON.stringify(data.stats));
    if (data.statsByLevel) localStorage.setItem('cc_stats_byLevel', JSON.stringify(data.statsByLevel));
    if (data.statsByPerson) localStorage.setItem('cc_stats_byPerson', JSON.stringify(data.statsByPerson));
    if (data.gidMap) localStorage.setItem('cc_gidMap', JSON.stringify(data.gidMap));
    if (data.categories) localStorage.setItem('cc_categories', JSON.stringify(data.categories));
    return true;
  } catch (e) {
    console.error('読み込み失敗:', e);
    return false;
  }
};

// ===== グローバル公開 =====
window.fbAuth = auth;
window.fbDb = db;
window.fbReady = true;

window.dispatchEvent(new Event('firebase-ready'));