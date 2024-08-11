import { useEffect, useState } from "react";
import { getQuote, getTickerDetails } from "../../api/stockApi";
import LineChart from "./lineChart";
import "../marketOverview/marketOverview.css";
import { useNavigate, useParams } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faCaretUp} from "@fortawesome/free-solid-svg-icons";

const Ticker =() => {
   const [data,setData] = useState(null);
   const [quote, setQuote] = useState(null);
   const {tickerName} = useParams();
   const navigate = useNavigate();
   const checkProfit = (change) => change[0] === "-";
   const stylePercent = (change) => {
    if(checkProfit(change)) return "text-danger";
    return "text-success";
   }
   const styleArrow = (change) => {
    if(checkProfit(change)) return faCaretDown;
    return faCaretUp;
   }

    useEffect( ()=>{
        getTickerDetails(tickerName).then(res => {
            setData(res.data["Monthly Time Series"]);
        }).catch(err => console.log(err));
        getQuote(tickerName).then(res => {
            setQuote(res.data["Global Quote"])
        }).catch(err => console.log(err));
    },[]);
    return(
    <>
        {quote &&
        <div className="container">  
            <h3>{quote["01. symbol"]}</h3>
            <div className="ticker-container">
                <div className="ticker-info">
                    <b>Volume:</b>
                    <span>{quote["06. volume"]}</span>
                </div>
                <div className="ticker-info">
                    <b>High:</b>
                    <span>${quote["03. high"]}</span>
                </div>
                <div className="ticker-info">
                    <b>Low:</b>
                    <span>${quote["04. low"]}</span>
                </div>
                <div className="ticker-info">
                    <b>% Change</b>
                    <span>
                        <FontAwesomeIcon className={stylePercent(quote["10. change percent"])} 
                        icon={styleArrow(quote["10. change percent"])}/>
                        {quote["10. change percent"]}
                    </span>
                </div>
                <div className="ticker-info">
                    <b>Price</b>
                    <span>
                        <span>${quote["05. price"]}</span>
                    </span>
                </div>  
            </div>
        </div>}
        <div className="container">
            <button className="btn btn-success" onClick={()=> navigate(`/buystock/${quote["01. symbol"]}`)} 
            style={{width:"100px"}}
            >Buy</button>
        </div>
       {data && <LineChart newdata={data}/>}
    </>
    );
}
export default Ticker;