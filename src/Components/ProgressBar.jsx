import { useEffect, useState } from "react";

function ProgressBar({ totalSessions }) {

    const [progress, setProgress] = useState(0);
    const [showProgress, setShowProgress] = useState(false);

    useEffect(() => {
        if (totalSessions >= 0) {
            calculateProgress(totalSessions);
        }
    }, [totalSessions]);

    function calculateProgress(sessions) {
        const width = (sessions / 30) * 100;
        setProgress(width);
    }

    return (
        <div onMouseOver={() => setShowProgress(true)} onMouseOut={() => setShowProgress(false)} className="relative w-full bg-accent-color-secondary-faded rounded-full h-full">
            <div style={{ width: `${progress}%` }} className="bg-accent-color-secondary rounded-full h-full"></div>
            {
                showProgress && (
                    <div className="flex items-center absolute w-full justify-center -top-0 z-50">
                        {progress.toFixed(2)}% fullført
                    </div>
                )
            }
        </div>
    );
}

export default ProgressBar;