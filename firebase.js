// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  where
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBa7ToJfMpyTJVA_94SQMKlACtr4_I8Ku4",
  authDomain: "duesoon-f195b.firebaseapp.com",
  projectId: "duesoon-f195b",
  storageBucket: "duesoon-f195b.firebasestorage.app",
  messagingSenderId: "104578149379",
  appId: "1:104578149379:web:61aeae839f70192af33236",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function fetchEvents() {
  const user = auth.currentUser;

  if (!user) {
    console.log("No user logged in");
    return [];
  }

  const snapshot = await getDocs(
    collection(db, "users", user.uid, "assignments"),
  );

  const events = [];

  snapshot.forEach((doc) => {
    const data = doc.data();

    events.push({
      title: data.AssignmentNameData,
      start: data.DateData,
    });
  });

  return events;
}

function generateStudyPlan({ AssignmentNameData, DateData, DifficultyData, HoursData }) {
  const dueDate = new Date(DateData);

  const numSessions = Math.ceil(HoursData);

  const windowMap = {
    very_hard: 14,
    hard: 7,
    medium: 5,
    easy: 3,
    very_easy: 2,
  };

  let windowDays = windowMap[DifficultyData];

  windowDays = Math.max(windowDays, numSessions);

  const studyPlan = [];

  for (let i = 0; i < numSessions; i++) {
    let offset;

    if (numSessions === 1) {
      offset = 1;
    } else {
      const position = (i / (numSessions - 1)) * (windowDays - 1);
      offset = Math.round(position) + 1;
    }

    const studyDate = new Date(dueDate);
    studyDate.setDate(dueDate.getDate() - offset);

    studyPlan.push({
      title: `Study: ${AssignmentNameData}`,
      date: studyDate.toISOString().split("T")[0],
      studyTime: 1,
      completed: false,
    });
  }

  return studyPlan;
}

async function addStudySessions(userId, assignmentId, data) {
  const studyPlan = generateStudyPlan(data);

  for (const session of studyPlan) {
    await addDoc(collection(db, "users", userId, "studySessions"), {
      ...session,
      assignmentId: assignmentId,
    });
  }
}

export {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  fetchEvents,
  addStudySessions,
  where
};
