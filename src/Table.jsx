import {collection, getDocs } from 'firebase/firestore';
import { db } from "../firebase";
import { useEffect, useState } from "react";
import TableRow from "./Components/TableRow";

function Table() {   
    const [users, setUsers] = useState({});

    useEffect(() => {
        getFirebaseUsers();
    },[])

    const getFirebaseUsers = async () => {
        const firebaseUsers = await getDocs(collection(db, "users"));
        firebaseUsers.forEach((doc) => {
            setUsers((prev) => ({
                ...prev,
                [doc.id]: doc.data()
            }))
        })
    }

    return (
        <div className="flex flex-col w-full">
            <div className="flex w-full bg-secondary-color rounded-lg">
                <div className="flex justify-center p-2 w-1/3 rounded-tl-lg">Deltaker</div>
                <div className="flex justify-center p-2 w-2/3 rounded-tr-lg">Progresjon</div>
            </div>
                {
                    users && Object.keys(users).map((key, index) => (
                        <TableRow key={index} userId={key} userData={users[key]} />
                    ))
                }
        </div>

    );
}

export default Table;