import { collection, getDocs } from 'firebase/firestore';
import { db } from "../firebase";
import { useEffect, useState } from "react";
import TableRow from "./Components/TableRow";
import LoadingSpinner from './Components/LoadingSpinner';

function Table() {
    const [users, setUsers] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchSessions = async () => {
            try {
                await getFirebaseUsers();
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchSessions();
    }, []);

    const getFirebaseUsers = async () => {
        const firebaseUsers = await getDocs(collection(db, "users"));
        const firebaseUserData = firebaseUsers.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        setUsers(firebaseUserData)
    }

    return (
        <>
        {
            loading ? (
                <LoadingSpinner />
            ) : (
                <div className="flex flex-col w-full">
                    <div className="flex w-full bg-secondary-color rounded-2xl">
                        <div className="flex justify-center p-2 w-1/3 rounded-tl-lg">Deltaker</div>
                        <div className="flex justify-center p-2 w-2/3 rounded-tr-lg">Progresjon</div>
                    </div>
                    {
                        users && Object.keys(users).map((key, index) => (
                            <TableRow key={index} userId={users[key].id} userData={users[key]} />
                        ))
                    }
                </div>
            )
        }
</>
    );
}

export default Table;