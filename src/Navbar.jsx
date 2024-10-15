import { useState } from "react";
import MenuItem from "./Components/MenuItem";
import TableIcon from './assets/TableIcon';
import StatsIcon from './assets/StatsIcon';
import NewSessionIcon from './assets/NewSessionIcon';

function Navbar() {

    const [activeIndex, setActiveIndex] = useState(0);

    const menuItems = [
        {menuText: "Tabell", url: "/", svg: <TableIcon />},
        {menuText: "Ny økt", url: "newsession", svg: <NewSessionIcon />},
        {menuText: "Statistikk", url: "stats", svg: <StatsIcon />},
    ];


    return (
        <div className="flex flex-col w-full">
            {
                menuItems.map((item, index) => (
                    <MenuItem key={index} index={index} menuText={item.menuText} url={item.url} svg={item.svg} setActiveIndex={setActiveIndex} activeIndex={activeIndex} />
                ))
            }
             
        </div>
    );
}

export default Navbar;