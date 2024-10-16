import { collection, getDocs } from 'firebase/firestore';
import { db } from "../firebase";
import { useEffect, useState } from "react";
import LoadingSpinner from './Components/LoadingSpinner';
import ProgressChart from './Components/ProgressChart';
import { Pie, PieChart, Tooltip } from 'recharts';


function Stats() {
    const maxSessions = 390;
    const participants = 13;

    const [sessions, setSessions] = useState(null);
    const [loading, setLoading] = useState(false);
    const [totalHours, setTotalHours] = useState("");
    const [avgSessions, setAvgSessions] = useState(0);

    const [sessionsCompleted, setSessionsCompleted] = useState(0);
    const [sessionsCompletedAngle, setSessionsCompletedAngle] = useState(0);

    const completedSessionsData = [
        {
            "name": `Gjennomført ${((sessionsCompleted / maxSessions) * 100).toFixed(2)}%`,
            "value": sessionsCompleted,
        }
    ];

    const totalSessionsData = [
        {
            "name": `Totalt`,
            "value": maxSessions
        },

    ];

    useEffect(() => {
        setLoading(true)
        const getFirebaseSessions = async () => {
            try {
                await getAllSessions();
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        getFirebaseSessions();
    }, []);

    useEffect(() => {
        setLoading(true)
        if (sessions) {
            countTotalSessions();
            calculateTotalHours();
            calculateAverageSessions();
        }
        setLoading(false)
    }, [sessions])

    function calculateTotalHours() {
        let minutes = 0;
        let hours = 0;
        let remaindingMinutes = 0;
        for (let i = 0; i < sessions.length; i++) {
            minutes += Number(sessions[i].duration);
        }

        remaindingMinutes = minutes % 60;

        if (remaindingMinutes !== 0) {
            hours = (minutes - remaindingMinutes) / 60;
        } else {
            hours = minutes / 60
        }

        setTotalHours({ hours: hours, minutes: remaindingMinutes })
    }

    function calculateAverageSessions() {
        const avg = sessions.length / participants;
        setAvgSessions(avg.toFixed(2))
    }

    function countTotalSessions() {
        const totalSessions = sessions.length;
        const angle = ((totalSessions / maxSessions) * 100) * 3.6;
        setSessionsCompleted(totalSessions)
        setSessionsCompletedAngle(angle);
    }

    const getAllSessions = async () => {
        const querySnapshot = await getDocs(collection(db, "sessions"));
        const sessionData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setSessions(sessionData);
    }

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-accent-color-secondary p-1 rounded-lg bg-opacity-80">
                    {
                        payload[0].value === maxSessions ? (
                            <p>{`${payload[0].value} økter totalt`}</p>
                        ) : (
                            <p>{`${payload[0].value} registrerte økter hittil`}</p>
                        )
                    }
                </div>
            );
        }

        return null;
    };

    return (
        <div className="flex w-full justify-center gap-5 flex-wrap">

            <div className="flex flex-col p-2 items-center rounded-2xl bg-secondary-color w-80">
                <div className="text-center font-semibold text-xl -tracking-wide">
                    Harde fakta
                </div>
                {
                    loading ? (
                        <LoadingSpinner />
                    ) : (
                        <>
                            <div className="flex flex-col items-center w-full">

                                <div className="flex w-full">
                                    <div className="flex justify-start text-primary-color-faded">
                                        Gjennomføringsgrad
                                    </div>
                                    <div className="flex flex-1 justify-end">
                                        {
                                            sessionsCompleted && maxSessions && (
                                                <>
                                                    {((sessionsCompleted / maxSessions) * 100).toFixed(2)}%
                                                </>
                                            )
                                        }
                                    </div>
                                </div>

                                <div className="flex w-full">
                                    <div className="flex justify-start text-primary-color-faded">
                                        Total treningstid
                                    </div>
                                    <div className="flex flex-1 justify-end">
                                        {
                                            !totalHours?.minutes === 0 ? (
                                                <>
                                                    {totalHours.hours}t
                                                </>
                                            ) : (
                                                <>
                                                    {totalHours.hours}t og {totalHours.minutes}m
                                                </>
                                            )
                                        }
                                    </div>
                                </div>

                                <div className="flex w-full">
                                    <div className="flex justify-start text-primary-color-faded">
                                        Gj.snitt økter per pers
                                    </div>
                                    <div className="flex flex-1 justify-end">
                                        {avgSessions} økter
                                    </div>
                                </div>

                            </div>
                        </>
                    )
                }


            </div>

            <div className="flex flex-col p-2 items-center rounded-2xl bg-secondary-color">
                <div className="text-center text-xl font-semibold -tracking-wide">
                    Gjennomførte økter
                </div>
                <div className="flex items-center">
                    {
                        loading ? (
                            <LoadingSpinner />
                        ) : (
                            <PieChart width={300} height={250}>
                                <Pie labelLine={false} data={totalSessionsData} dataKey="value" startAngle={0} endAngle={360} nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#EB6B44" label />
                                <Pie labelLine={false} data={completedSessionsData} dataKey="value" startAngle={0} endAngle={sessionsCompletedAngle} nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#7E67F6" label />
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        )
                    }
                </div>
            </div>

            <div className="flex">
                <div className="flex flex-col p-2 items-center rounded-2xl bg-secondary-color">
                    <div className="text-center font-semibold -tracking-wide text-xl">
                        Dag for dag
                    </div>
                    <div>
                        <ProgressChart loading={loading} sessionData={sessions && sessions} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Stats;