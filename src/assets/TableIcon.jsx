import { svgDimensions, svgClass } from "../utils";

function TableIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={svgDimensions} height={svgDimensions} viewBox="0 0 24 24" className={svgClass}>
            <line x1="2" y1="6" x2="21" y2="6"></line>
            <line x1="2" y1="12" x2="21" y2="12"></line>
            <line x1="2" y1="18" x2="21" y2="18"></line>
            <line x1="3" y1="6" x2="3" y2="6"></line>
            <line x1="3" y1="12" x2="3" y2="12"></line>
            <line x1="3" y1="18" x2="3" y2="18"></line>
        </svg>
    );
}

export default TableIcon;