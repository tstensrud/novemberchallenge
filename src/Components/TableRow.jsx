import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from "../../firebase";
import { useEffect, useState } from "react";

import ProgressBar from "./ProgressBar";
import { Link } from 'react-router-dom';

function TableRow({ index, userData, userId }) {

    const [sessions, setSessions] = useState(null);
    const [totalSessions, setTotalSessions] = useState(0);

    useEffect(() => {
        if (userId) {
            getUserSessions();
        }
    }, [userId]);

    useEffect(() => {
        if (sessions) {
            setTotalSessions(sessions.length)
        }
    }, [sessions]);

    const getUserSessions = async () => {
        try {
            const sessionsQuery = query(collection(db, "sessions"), where("userId", "==", userId));
            const querySnapshot = await getDocs(sessionsQuery);

            const sessionList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setSessions(sessionList)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div key={index} className="flex w-full">
            <div className="flex justify-start p-2 w-1/3 rounded-tl-lg">
                <Link to={`/${userData.name}/${userId}`}>{userData.name}</Link>
            </div>
            <div className="flex justify-end items-center p-2 w-2/3 rounded-tr-lg"><ProgressBar totalSessions={totalSessions} /></div>
        </div>
    );
}

export default TableRow;