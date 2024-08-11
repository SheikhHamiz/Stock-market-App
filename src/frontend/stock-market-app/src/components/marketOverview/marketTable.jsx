import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

const MarketTable = ({table}) => {

    const navigate = useNavigate();
    const checkProfit = (change) => change[0] === "-";
    const styleArrow = (change) => {
        if(checkProfit(change)) return faCaretDown;
        return faCaretUp;
    }
    const stylePercent = (change) => {
        if(checkProfit(change)) return "text-danger";
        return "text-success";
    }

    return(
        <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>SNO.</th>
                            <th>Ticker</th>
                            <th>Price</th>
                            <th>% Change</th>
                        </tr>
                    </thead>
                    <tbody>
                        {table &&
                            table.map((item,index) =>(
                                <tr key={item.ticker} onClick={()=> navigate(`/ticker/${item.ticker}`)}>
                                    <td>{index+1}</td>
                                    <td>{item.ticker}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <FontAwesomeIcon className={stylePercent(item.change_percentage)}
                                        icon={styleArrow(item.change_percentage)}/>
                                        <span style={{marginLeft:"0.4rem"}}>{item.change_percentage} </span>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
    );
}
export default MarketTable;