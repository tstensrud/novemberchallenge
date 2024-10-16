import { useNavigate } from "react-router-dom";

function MenuItem({ url, index, menuText, setActiveIndex, activeIndex, svg }) {
    const navigate = useNavigate();

    const handleLinkClick = () => {
        setActiveIndex(index);
        navigate(url);
    }

    return (
        <div className="mb-2">
            <div onClick={handleLinkClick} className={`group flex cursor-pointer pl-5 pr-5 pt-2 pb-2 w-full rounded-3xl ${activeIndex === index ? 'bg-secondary-color text-primary-color' : 'text-primary-color-faded hover:text-primary-color'} hover:bg-accent-color-main transition duration-300`}>
                <div className={`${activeIndex === index && 'stroke-primary-color'} flex w-8 justify-start`}>
                    {svg}
                </div>
                <div className={`flex flex-1 ml-2`}>
                    {menuText}
                </div>
            </div>
        </div>
    );
}

export default MenuItem