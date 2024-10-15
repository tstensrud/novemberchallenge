import { svgDimensions, svgClass } from "../utils";

function ArrowIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className={svgClass}>
            <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
    );
}

export default ArrowIcon;