import admin from "firebase-admin";

import serviceAccount from "./trellonextjs-firebase-admin.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
export const authAdmin = admin.auth();
//firebase admin to authenticate users on the serverside
