import Navbar from './Navbar';
import AppIcon from './assets/AppIcon';
import { Outlet } from 'react-router-dom';

function Novemberchallenge({ children }) {
    return (
        <div className="flex flex-col w-full h-full p-5">
            <div className="flex items-center w-full h-20 text-2xl bg-tertiary-color rounded-2xl">
                <div className="flex pl-5 w-1/12">
                    <div className="bg-accent-color-main rounded-lg p-1">
                        <AppIcon />
                    </div>
                </div>
                <div className="flex justify-center w-10/12">
                    <div className="pl-5 pr-5 pt-2 pb-2 w-fit rounded-3xl bg-secondary-color">
                        November challenge 2024
                    </div>
                </div>
                <div className="flex w-1/12">
                </div>
            </div>

            <div className="flex flex-row w-full  mt-5 mb-5">
                <div className="flex h-96 w-60 rounded-2xl bg-tertiary-color p-5">
                    <Navbar />
                </div>
                <div className="flex flex-1 bg-tertiary-color rounded-2xl ml-5 p-5">
                    <Outlet>
                        { children }
                    </Outlet>
                </div>
            </div>
        </div>
    );
}

export default Novemberchallenge;