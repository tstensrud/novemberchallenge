import { forwardRef } from "react";

const InputField = forwardRef((props, ref ) => {
    return (
        <div className="flex mt-2 w-full">
            <input ref={ref} onChange={props.onChange} name={props.name} className="bg-secondary-color rounded-full pt-2 pb-2 pl-5 w-full outline-none border border-secondary-color hover:border-accent-color-main focus:border-accent-color-main" placeholder={props.placeholder} required/>
        </div>
    );
});

export default InputField;