import { useEffect, useState } from "react";
import {Line} from "react-chartjs-2";
import { Chart as ChartJs } from "chart.js/auto";
import { CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, scales } from "chart.js";

const LineChart =({newdata}) => {
    const [lineData, setLineData] = useState([]);
    const [timeData, setTimeData] = useState([]);
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
    useEffect(() =>{
        const yData = [];
        const xData = [];
        Object.values(newdata).map((d,i) => {
            if(i < 10)
                yData.push(d["4. close"]);
        });
        Object.keys(newdata).map((d,i)=> {
            if(i < 10) {
                const date = new Date(d);
                xData.push(monthNames[date.getMonth()]+ "-" + date.getFullYear());
            }
        });
        setLineData(yData);
        setTimeData(xData);
    },[]);

    const labels = timeData;
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'closed at',
                data: lineData,
                borderColor:"black",
                fill:true,
            }
        ]
    };
   
    return(
        <>
        { 
             lineData.length > 0
                      &&
             <Line options={{}} data={data}/>
        }
        </>
    );
};

export default LineChart;