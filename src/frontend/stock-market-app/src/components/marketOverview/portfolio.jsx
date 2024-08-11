import { useEffect, useState } from "react";
import { getAllOwnedStocksByUser } from "../../api/userApi";
import { useAuth } from "../../security/auth";
import { useNavigate } from "react-router-dom";

const Portfolio = () => {

    const [stocks, setStocks] = useState(null);
    const authContext = useAuth();
    const username = authContext.username;
    const navigate = useNavigate();

    useEffect(()=> {
        getAllOwnedStocksByUser(username).then(
            res => setStocks(res.data)
        );

    },[]);
    return(
        <>
        { stocks
            ?
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>SNO.</th>
                        <th>Ticker</th>
                        <th>price</th>
                        <th>shares</th>
                        <th>Sell</th>
                    </tr>
                    {console.log(stocks)}
                </thead>
                <tbody>
                    {stocks &&
                        stocks.map((item,index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.tickerName}</td>
                                <td>{item.price}</td>
                                <td>{item.shares}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={()=> navigate(`/sellstock/:${item.tickerName}`)}>
                                        Sell
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            :
            <h3>"No data available"</h3>
        }

        </>
    );
}
export default Portfolio;