import { useEffect, useState } from "react";
import ArrowIcon from "../assets/ArrowIcon";
import SelectionOption from "./SelectionOption";

function SelectMenu({ resetSelectMenu, onChange, users, setActiveUser }) {
    const [showOptions, setShowOptions] = useState(false);
    const [chosenUser, setChosenUser] = useState(null);

    useEffect(() => {
        if (chosenUser) {
            setActiveUser(chosenUser);
        }
    },[chosenUser]);

    useEffect(() => {
        setChosenUser(null);
    },[resetSelectMenu])
    
    const handleOptionsClick = () => {
        setShowOptions(false);
    }

    return (
        <div className={` relative flex flex-col w-full border-none`}>

            <div onClick={() => setShowOptions(!showOptions)} className={`flex cursor-pointer bg-secondary-color ${showOptions ? 'rounded-tl-3xl rounded-tr-3xl' : 'rounded-full hover:border-accent-color-main'} border border-secondary-color pt-2 pb-2 pl-5`}>
                <div className="flex items-center h-full">
                    {
                        chosenUser ? chosenUser.name : 'Velg deltaker'
                    }
                </div>
                <div className="flex flex-1 justify-end items-center h-full pr-5">
                    <div className="pt-1 -rotate-90">
                        <ArrowIcon />
                    </div>
                </div>
            </div>
            {
                showOptions && (
                    <div className="absolute w-full flex flex-col left-0 top-full rounded-bl-2xl border-none rounded-br-2xl bg-secondary-color">
                    {
                            users && Object.keys(users).map((key, index) => (
                            <SelectionOption handleOptionsClick={handleOptionsClick} setChosenUser={setChosenUser} key={index} index={index} userId={key} name={users[key].name} />
                        ))
                    }
                    </div>
                )
            }
        </div>
    );
}

export default SelectMenu;