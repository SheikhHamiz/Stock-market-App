import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { getQuote } from "../../api/stockApi";
import { addStockToUser, getStockDetailsOwnedByUser, getUserAccountBalance, investCash, updateStock } from "../../api/userApi";
import { useAuth } from "../../security/auth";
import { useNavigate, useParams } from "react-router-dom";

const BuyStock = () => {
    const [quote, setQuote] = useState(null);
    const [stockOwned, setStockOwned] = useState(0);
    const [shares, setShares] = useState(0);
    const [cost, setCost] = useState(0);
    const [stock, setStock] = useState(null);
    const username = useAuth().username;
    const [myCash, setMyCash] = useState(0);
    const {tickerName} = useParams();
    const navigate = useNavigate();


    const checkProfit = (change) => change[0] === "-";
    const addorRemoveStock = (by) => {
        if(stockOwned === 0 && by === -1) return;
        setCost((stockOwned+by) * quote["05. price"]);
        setStockOwned(stockOwned + by);
    }
    const stylePercent = (change) => {
        if(checkProfit(change)) return "text-danger";
        return "text-success";
    }
    const styleArrow = (change) => {
        if(checkProfit(change)) return faCaretDown;
        return faCaretUp;
    }

    const checkBalance =() => {
        return myCash < cost || stockOwned === 0;
    }
    useEffect(()=> {
            getQuote(tickerName).then(res => {
                setQuote(res.data["Global Quote"]);
                getStockDetailsOwnedByUser(username,res.data["Global Quote"]["01. symbol"]).then(
                    res => {
                        setStock(res.data);
                        if(res.data.shares !== null) {
                            setShares(res.data.shares);
                        }  
                    }
            );
            getUserAccountBalance(username).then(res => setMyCash(res.data));
        }).catch(err => console.log(err));
    },[]);

    const onSubmit = () => {
        if(stock.id === null) {
            investCash(username, {cash:cost}).then(res => {
                if(res.data === "success") {
                    addStockToUser(username, {tickerName: quote["01. symbol"],price:quote["05. price"],shares:stockOwned, });
                    navigate("/portfolio");
                }
            });
        }else {
            investCash(username,{cash:cost}).then(res => {
                if(res.data === "success") {
                    updateStock(username, stock.id,{shares:stockOwned});
                    navigate("/portfolio");
                }
            });
        }
    }
    return (
        <div className="container">
            <h3>My Cash: {myCash}</h3>
        {quote &&
            <div>  
                <h3>{quote["01. symbol"]}</h3>
                <div className="tickerName-container">
                    <div className="tickerName-info">
                        <b>High:</b>
                        <span>${quote["03. high"]}</span>
                    </div>
                    <div className="tickerName-info">
                        <b>Low:</b>
                        <span>${quote["04. low"]}</span>
                    </div>
                    <div className="tickerName-info">
                        <b>% Change</b>
                        <span>
                            <FontAwesomeIcon className={stylePercent(quote["10. change percent"])} 
                            icon={styleArrow(quote["10. change percent"])}/>
                            {quote["10. change percent"]}
                        </span>
                    </div>
                    <div className="tickerName-info">
                        <b>Price</b>
                        <span>
                            <span>${quote["05. price"]}</span>
                        </span>
                    </div>  
                </div>
            </div>}
            <div className="buyingOption">
                <div>
                    <b>Shares Owned: </b><span>{shares}</span>
                    <br/>
                    <b>Total shares:</b><span>{stockOwned}</span>
                    <br/>
                    <b>Gross sum: </b><span>${cost}</span>
                </div>
                <button className="btn btn-success"
                onClick={()=>addorRemoveStock(1)}
                >
                    <FontAwesomeIcon icon={faPlus}/>
                </button>
                
                <button className="btn btn-danger"
                onClick={()=>addorRemoveStock(-1)}
                >
                    <FontAwesomeIcon icon={faMinus}/>
                </button>
                <button className="btn btn-success"
                disabled={checkBalance()}
                onClick={()=> onSubmit()}
                >Buy</button>
                {myCash < cost && <div className="form-text text-danger">insufficient Balance</div>}
            </div>
        </div>
    );
}
export default BuyStock;