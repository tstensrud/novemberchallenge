import { svgDimensions, svgClass } from "../utils";

function NewSessionIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={svgDimensions} height={svgDimensions} viewBox="0 0 24 24" className={svgClass}>
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        </svg>
    );
}

export default NewSessionIcon;