import { auth } from "firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
const provider = new GoogleAuthProvider();

export async function loginWithEmail(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert(`Welcome ${auth.currentUser.email}`);
  } catch (error) {
    alert(`Unsuccessful Login: ${error.message}`);
  }
}
export async function loginWithGoogle() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      alert(`Welcome ${user.displayName}`);
    })
    .catch((error) => {
      alert(`Unsuccessful Login: ${error.message}`);
    });
}
export async function signUpWithEmail(email, password) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Successful Signup");
  } catch (error) {
    alert(`Unsuccessful Signup: ${error.message}`);
  }
}
export async function logout() {
  await signOut(auth);
}
