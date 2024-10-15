import { useEffect } from "react";

function Day({ day, index, setActiveDay, activeDay, resetCalender }) {

    useEffect(() => {
        setActiveDay(-1);
    },[resetCalender]);
    
    const handleclick = () => {
        setActiveDay(index);
    }

    return (
        <div className="pl-1">
            <div onClick={handleclick} className={`${activeDay === index ? 'bg-accent-color-main' : 'bg-secondary-color'} rounded-full p-1 w-8 h-8 text-center hover:bg-accent-color-main cursor-pointer`}>
                {day}
            </div>
        </div>
    );
}

export default Day;