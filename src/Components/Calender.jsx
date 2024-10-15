import { useEffect, useState } from "react";
import Day from "./Day";

function Calender({setDay, resetCalender}) {
        
    const days = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30']
    const [activeDay, setActiveDay] = useState(-1);

    useEffect(() => {
        if (activeDay >= 0) {
            setDay(activeDay + 1);
        }
    },[activeDay]);

    useEffect(() => {
        setActiveDay(-1);
    },[resetCalender])

    return (
        <div className="w-full mt-3 mb-3 flex flex-col">
            <div className="w-full text-center pb-2">
                Velg dato
            </div>
            <div className="w-full flex flex-wrap overflow-hidden justify-center">
            {
                days.map((day, index) => (
                    <Day resetCalender={resetCalender} key={index} day={day} index={index} activeDay={activeDay} setActiveDay={setActiveDay} />
                ))
            }
            </div>
        </div>
    );
}

export default Calender