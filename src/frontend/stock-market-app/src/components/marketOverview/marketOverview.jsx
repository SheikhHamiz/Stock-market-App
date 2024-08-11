import { useEffect, useState } from "react";
import { marketGainersLosers } from "../../api/stockApi";
import MarketTable from "./marketTable";

const MarketOverview = () => {

    const [topGainers, setTopGainers] = useState(null);
    const [mostActive, setmostActive] = useState(null);
    const [topLosers, setTopLosers] = useState(null);

    const [displayTopGainer, setDisplayTopGainers] = useState(true);
    const [displayMostActive, setDisplayMostActive] = useState(false);
    const [displayTopLosers, setDisplayTopLosers] = useState(false);

    useEffect(()=> {
        marketGainersLosers().then(res => {
            setTopGainers(res.data.top_gainers);
            setTopLosers(res.data.top_losers);
            setmostActive(res.data.most_actively_traded);
        }).catch(err => console.log(err));
    },[]);

    const displayTable = () => {
        if(displayTopGainer) return topGainers;
        else if(displayMostActive) return mostActive;
        return topLosers;
    }

    const setTableDisplay = (table) => {
        if(topGainers === table) {
            setDisplayMostActive(false);
            setDisplayTopLosers(false);
            setDisplayTopGainers(true);
        } else if(topLosers === table) {
            setDisplayMostActive(false);
            setDisplayTopLosers(true);
            setDisplayTopGainers(false);
        } else {
            setDisplayMostActive(true);
            setDisplayTopLosers(false);
            setDisplayTopGainers(false);
        }
    }

    const activeLink = (clicked) => {
        if(clicked) return "btn btn-success";
        return "btn";
    }
    return(
        <>
            <div>
                <div className={activeLink(displayTopGainer)}
                    onClick={() =>setTableDisplay(topGainers)}>
                    Top Gainers
                </div>
                <div className={activeLink(displayMostActive)}
                    onClick={() =>setTableDisplay(mostActive)}>
                    Top MostActive
                </div>
                <div className={activeLink(displayTopLosers)}
                    onClick={() => setTableDisplay(topLosers)}>
                        Top Most Losers
                </div>
            </div>
            <div>
               {topGainers && <MarketTable table = {displayTable()}/>}
            </div>
        </>
    );
}
export default MarketOverview;