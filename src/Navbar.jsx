import { useState } from "react";
import MenuItem from "./Components/MenuItem";
import TableIcon from './assets/TableIcon';
import StatsIcon from './assets/StatsIcon';
import NewSessionIcon from './assets/NewSessionIcon';
import HelpIcon from './assets/HelpIcon';

function Navbar() {

    const [activeIndex, setActiveIndex] = useState(0);

    const menuItems = [
        {menuText: "Tabell", url: "/", svg: <TableIcon activeIndex={activeIndex} index={0} />},
        {menuText: "Ny økt", url: "newsession", svg: <NewSessionIcon index={1} />},
        {menuText: "Statistikk", url: "stats", svg: <StatsIcon index={2} />},
        {menuText: "Hva er dette?", url: "/help", svg: <HelpIcon index={3} />}
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