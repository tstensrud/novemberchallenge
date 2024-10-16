function LoadingBar() {
    return (
        <div className="relative w-full h-6 overflow-hidden rounded-full">
            <div className="w-full h-full bg-accent-color-secondary-faded">
                <div className="w-[20%] h-full bg-accent-color dark:bg-accent-color-secondary rounded-full absolute animate-slider"></div>
            </div>
        </div>
    );
}

export default LoadingBar