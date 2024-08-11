import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { getQuote } from "../../api/stockApi";
import { deleteStock, getStockDetailsOwnedByUser, updateStock, withdrawCash } from "../../api/userApi";
import { useAuth } from "../../security/auth";
import { useNavigate, useParams } from "react-router-dom";

const SellStock = () => {
    const [quote, setQuote] = useState(null);
    const [stockToSell, setStockToSell] = useState(0);
    const [shares, setShares] = useState(0);
    const [price ,setPrice] = useState(0);
    const [cost, setCost] = useState(0);
    const [stock, setStock] = useState(null);
    const username = useAuth().username;
    const navigate = useNavigate();
    const tickerName = useParams();


    const checkProfit = (change) => change < 0;
    const addorRemoveStock = (by) => {
        if(stockToSell === 0 && by === -1) return;
        if(stockToSell === shares && by === 1) return;
        setCost((stockToSell+by) * quote["05. price"]);
        setStockToSell(stockToSell + by);
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
        return stockToSell > shares && stockToSell > 0 || stockToSell == 0;
    }
    useEffect(()=> {
            getQuote(tickerName).then(res => {
                setQuote(res.data["Global Quote"]);
                getStockDetailsOwnedByUser(username,res.data["Global Quote"]["01. symbol"]).then(
                    res => {
                        setStock(res.data);
                        if(res.data.shares !== null)
                            setShares(res.data.shares);
                            setPrice(res.data.price);   
                    }
            );
        }).catch(err => console.log(err));
    },[]);

    const onSubmit = () => {
        withdrawCash(username,{cash:cost}).then(res => {
            updateStock(username, stock.id,{shares:-stockToSell}).then( res => {
                if(shares === stockToSell) deleteStock(username, stock.id);
                }
            );
            navigate("/portfolio")
        });
    }
    return (
        <div className="container">
        {quote &&
            <div>  
                <h3>{quote["01. symbol"]}</h3>
                <div className="ticker-container">
                    <div className="ticker-info">
                        <b>Bought At:</b>
                        <span>${price}</span>
                    </div>
                    <div className="ticker-info">
                        <b>Current price:</b>
                        <span>${quote["05. price"]}</span>
                    </div>
                    <div className="ticker-info">
                        <b>% Profit</b>
                        <span>
                            <FontAwesomeIcon className={stylePercent(parseFloat(quote["05. price"]) - price)} 
                            icon={styleArrow(quote["10. change percent"])}/>
                            {((parseFloat(quote["05. price"]) - price) / price) * 100}
                        </span>
                    </div>
                    <div className="ticker-info">
                        <b>Profit</b>
                        <span>
                            <span>${parseFloat(quote["05. price"]) * shares - (price * shares)}</span>
                        </span>
                    </div>  
                </div>
            </div>}
            <div className="buyingOption">
                <div>
                    <b>Shares Owned: </b><span>{shares}</span>
                    <br/>
                    <b>Total shares:</b><span>{stockToSell}</span>
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
                <button className="btn btn-danger"
                disabled={checkBalance()}
                onClick={()=> onSubmit()}
                >sell</button>
            </div>
        </div>
        
    );
}
export default SellStock;