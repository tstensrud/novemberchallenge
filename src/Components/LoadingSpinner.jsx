function LoadingSpinner() {
    return (
        <div className="flex w-full h-full justify-center items-center">
            <div className="flex w-full h-full justify-center items-center text-center">
                <div className="border-4 border-accent-color-secondary rounded-full border-t-accent-color-secondary-faded w-5 h-5 animate-spin mr-1"></div>
            </div>
        </div>
    );
}

export default LoadingSpinner;