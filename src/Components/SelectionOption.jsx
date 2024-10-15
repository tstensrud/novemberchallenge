function SelectionOption({ handleOptionsClick, setChosenUser, setShowOptions, name, userId }) {

    const handleClick = () => {
        handleOptionsClick();
        setChosenUser({userId: userId, name: name});
    }

    return (
        <div className={`flex w-full border border-secondary-color z-[999]`}>
            <div onClick={handleClick} className="pt-2 pb-2 pl-5 w-full rounded-full hover:bg-accent-color-main cursor-pointer">
                {name}
            </div>
        </div>
    );
}

export default SelectionOption;