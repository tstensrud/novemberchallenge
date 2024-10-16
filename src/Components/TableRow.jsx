import { collection, getDocs, query, where, onSnapshot } from 'firebase/firestore';
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import ProgressBar from "./ProgressBar";
import LoadingBar from './LoadingBar';

function TableRow({ index, userData, userId }) {

    const [sessions, setSessions] = useState({});
    const [totalSessions, setTotalSessions] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        if (userId) {
            const fetchUserSessions = async () => {
                try {
                    await getUserSessions();
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            }
            fetchUserSessions();
        }
    }, [userId]);

    useEffect(() => {
        if (sessions) {
            setTotalSessions(sessions.length)
        }
    }, [sessions]);

    const getUserSessions = async () => {
        const sessionsQuery = query(collection(db, "sessions"), where("userId", "==", userId));
        const querySnapshot = await getDocs(sessionsQuery);

        const sessionList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        setSessions(sessionList)
    }

    return (
        <div key={index} className="flex w-full">
            <div className="flex justify-start p-2 w-1/3 rounded-tl-lg">
                <Link to={`/${userData?.name}/${userData?.id}`}>{userData?.name}</Link>
            </div>
            <div className="flex justify-end items-center p-2 w-2/3 rounded-tr-lg">
                {
                    loading ? (
                        <LoadingBar />
                    ) : (
                        <ProgressBar totalSessions={totalSessions} />
                    )
                }
            </div>
        </div>
    );
}

export default TableRow;