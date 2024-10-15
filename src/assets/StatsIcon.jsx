import { svgDimensions, svgClass } from "../utils";

function StatsIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={svgDimensions} height={svgDimensions} viewBox="0 0 24 24" className={svgClass}>
            <rect x="10" y="3" width="4" height="18"></rect>
            <rect x="18" y="8" width="4" height="13"></rect>
            <rect x="2" y="13" width="4" height="8"></rect>
        </svg>
    );
}

export default StatsIcon;