# Hillsville Firebase Real-Time Room Rental System

This version uses Firebase Firestore so everyone can see the same live data from different computers.

## Setup
1. Firebase Console e project create koro.
2. Web app create kore config copy koro.
3. `firebase-config.js` file e placeholder config replace koro.
4. Firestore Database create koro, start in test mode.
5. VS Code Live Server diye `index.html` run koro.

## Admin Login
Default in firebase-config.js:
- admin / admin123

## Real-time
Rooms, requests, users, owners, team, admin settings sob Firestore e sync hobe.

Note: Image demo er jonno Base64 hisebe Firestore e save hocche. Production e Firebase Storage better.


## Admin Login Fixed
Admin login:
- ID: admin
- Password: admin123

Admin login now works directly. Firebase config is still required for realtime data sync.
