function SessionTableRow({data}) {

    return (
        <div className="flex w-full hover:bg-accent-color-secondary-faded cursor-pointer rounded-full">
            <div className="flex items-center justify-center w-1/3">{data.day}. nov</div>
            <div className="flex items-center justify-center w-1/3">{data.type}</div>
            <div className="flex items-center justify-center w-1/3">{data.duration} minutter</div>
        </div>
    );
}

export default SessionTableRow;