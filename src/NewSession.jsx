import { collection, addDoc, getDocs } from 'firebase/firestore';
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase";

import Calender from "./Components/Calender";
import InputField from "./Components/InputField";
import SelectMenu from "./Components/SelectMenu";

function NewSession() {
    const [users, setUsers] = useState({});
    const [activeUser, setActiveUser] = useState(null);
    const [day, setDay] = useState(-1);
    const [newSessionData, setNewSessionData] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [sessionAdded, setSessionAdded] = useState(false);
    const [resetSelectMenu, setResetSelectMenu] = useState(false);
    const [resetCalender, setResetCalender] = useState(false);

    const durationRef = useRef(null);
    const typeRef = useRef(null);

    useEffect(() => {
        getFirebaseUsers();
    }, [])

    useEffect(() => {
        if (activeUser) {
            setNewSessionData((prev => ({
                ...prev,
                userId: activeUser.userId
            })))
        }
    }, [activeUser])

    useEffect(() => {
        if (day > 0) {
            setNewSessionData((prev) => ({
                ...prev,
                day: day
            }))
        }
    }, [day])

    const handleInputChange = (e) => {
        setNewSessionData((prev => ({
            ...prev,
            [e.target.name]: e.target.value
        })))
    }

    const getFirebaseUsers = async () => {
        const firebaseUsers = await getDocs(collection(db, "users"));
        firebaseUsers.forEach((doc) => {
            setUsers((prev) => ({
                ...prev,
                [doc.id]: doc.data()
            }))
        })
    }

    const addNewSession = async () => {
        if (newSessionData) {
            try {
                const docRef = await addDoc(collection(db, "sessions"), {
                    userId: newSessionData?.userId,
                    type: newSessionData?.type,
                    duration: newSessionData?.duration,
                    day: newSessionData?.day
                });
                setSessionAdded(true);
                setNewSessionData(null);
                durationRef.current.value = '';
                typeRef.current.value = '';
                setResetSelectMenu(!resetSelectMenu);
                setResetCalender(!resetCalender);
            } catch (e) {
                setErrorMsg(e)
            }
        }
    }

    const handleSubmitClick = async (e) => {
        setErrorMsg(null);
        setSessionAdded(false);
        e.preventDefault();
        if (!newSessionData?.userId) {
            setErrorMsg("Velg deltaker");
            return;
        } else if (!newSessionData?.day) {
            setErrorMsg("Velg dato");
            return;
        } else if (!newSessionData?.duration) {
            setErrorMsg("Velg varighet på økt");
            return;
        } else if (!newSessionData?.type) {
            setErrorMsg("Velg type økt")
            return;
        }

        const isDigit = isDigitsOnly(newSessionData?.duration)
        if (!isDigit) {
            setErrorMsg("Varighet kan kun inneholde tall")
            return;
        }

        await addNewSession();
    }

    function isDigitsOnly(str) {
        return str !== '' && !isNaN(str) && !str.includes(' ');
    }

    return (
        <div className="flex flex-col w-full">
            <form>
                <div className="w-80">
                    <SelectMenu resetSelectMenu={resetSelectMenu} setActiveUser={setActiveUser} users={users} />
                    <InputField ref={typeRef} onChange={handleInputChange} name="type" placeholder={"Type økt"} />
                    <InputField ref={durationRef} onChange={handleInputChange} name="duration" placeholder={"Varighet i minutter"} />
                </div>
                <div className="w-80">
                    <Calender resetCalender={resetCalender} setDay={setDay} />
                </div>
                <div className="w-80">
                    <button onClick={handleSubmitClick} className="bg-secondary-color rounded-full pt-2 pb-2 w-full outline-none border border-secondary-color hover:border-accent-color-main focus:border-accent-color-main">Legg til</button>
                </div>
                {
                    errorMsg && (
                        <div className="text-center mt-2 border-accent-color-main border w-80 p-2 rounded-lg break-words">
                            {errorMsg}
                        </div>
                    )
                }

                {
                    sessionAdded && (
                        <div className="text-center mt-2 border-accent-color-secondary border w-80 p-2 rounded-lg">
                            Økt lagt til!
                        </div>
                    )
                }
            </form>
        </div>
    );
}

export default NewSession;