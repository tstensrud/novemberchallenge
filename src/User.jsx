import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from "../firebase";
import { useEffect, useState } from "react";

import UserIcon from './assets/UserIcon';
import SessionTableRow from "./Components/SessionTableRow";

function User() {
    const { name, userId } = useParams();
    const [sessions, setSessions] = useState({});
    const [totalTrainingDuration, setTotalTrainingDuration] = useState(0);

    useEffect(() => {
        if (userId) {
            const fetchUserSessions = async () => {
                try {
                    await getUserSessions();
                } catch (error) {
                    console.error(error);
                }
            }
            fetchUserSessions();
        }
    }, [userId]);

    useEffect(() => {
        if (sessions) {
            calculateTrainingHours();
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

    function calculateTrainingHours() {
        if (sessions) {
            let minutes = 0;
            let hours = 0;
            let remaindingMinutes = 0;

            for (let i = 0; i < sessions.length; i++) {
                minutes += Number(sessions[i].duration);
            }

            remaindingMinutes = minutes % 60;

            if (remaindingMinutes !== 0) {
                hours = (minutes - remaindingMinutes) / 60
            } else {
                hours = minutes / 60;
            }

            setTotalTrainingDuration({ hours: hours, minutes: remaindingMinutes })
        }
    }

    return (
        <div className="flex flex-col w-full h-fit">

            <div className={`flex h-fit pl-5 pr-5 pt-2 pb-2 w-full rounded-3xl bg-secondary-color`}>
                <div className="w-fit h-6">
                    {name}
                </div>
                <div className="flex h-6 items-center flex-1 justify-end">
                    <UserIcon />
                </div>
            </div>
            <div className="flex w-full pt-5">
                <div className="flex flex-col w-1/3 rounded-lg bg-secondary-color p-2">
                    <div className="flex">
                        <div>
                            Antall økter
                        </div>
                        <div className="flex flex-1 justify-end">
                            {
                                sessions?.length === 1 ? (
                                    <>{sessions?.length} økt</>
                                ) : (
                                    <>{sessions?.length} økter</>
                                )
                            }
                        </div>
                    </div>
                    <div className="flex">
                        <div>
                            Antall timer
                        </div>
                        <div className="flex flex-1 justify-end">
                            {
                                !totalTrainingDuration?.minutes === 0 ? (
                                    <>
                                        {totalTrainingDuration.hours}t
                                    </>
                                ) : (
                                    <>
                                        {totalTrainingDuration.hours}t og {totalTrainingDuration.minutes}m
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-5">
                <div className="flex w-full bg-secondary-color rounded-lg p-2">
                    <div className="flex items-center justify-center w-1/3">Dato</div>
                    <div className="flex items-center justify-center w-1/3">Type økt</div>
                    <div className="flex items-center justify-center w-1/3">Varighet</div>
                </div>
            </div>
            {
                sessions && Object.keys(sessions).map((key, index) => (
                    <SessionTableRow key={index} data={sessions[key]} />
                ))
            }

        </div>
    );
}

export default User;