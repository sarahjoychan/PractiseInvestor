
import { useState, useEffect } from 'react';
import { CanvasJSChart } from 'canvasjs-react-charts';
import { getUser } from '../../../../../api/backendApi';
// attempted to also graph the totalValueHistory But it just never came out quitw right

interface EarningsHistory {
  earningsObj: EarningsObj[];
}
interface EarningsObj {
  totalValue: number;
  date: string;
}

export const UserChart = () => {
  //const { user } = useSelector((state: any) => state.);
  const [earnings, setEarnings] = useState<any[]>([])
  //const { holdings } = useSelector((state: any) => state.holdings);

  useEffect(() => {
    let isMounted:boolean = true;
    const getUserHistoy = async () => {
      const user = await getUser();
      const userHistory:EarningsHistory = user.data.  totalValueHistory;
      const result = formatUserData(userHistory);
      if (isMounted) {
        setEarnings(result);
      }
    }
    getUserHistoy();
  }, []);

  function formatUserData(earnings:EarningsHistory) {
    return Object.values(earnings)?.map(entries => {
      return entries; 
    }) 
  } 
     
  return (
    <div> 
			<CanvasJSChart options={{
        theme: "light2",
        zoomEnabled: true,
        title: {
          text: "Total Earnings History"
        },
        xAxis: {
          title: "Past 11 weeks",
          titleFontColor: "#2683e2",
          titleFontWeight: "lighter",
          titleFontSize: 16,
          labelFontColor: "#007FFF",
          interval: 100,
        },
        axisY: {
          labelFontColor: "#71BC78",
          title: "Amount",
          titleFontColor: "#71BC78",    
        },
        data: [
          {
            type: "line",
            xValueFormatString: "week",
            yValueFormatString: '',
            dataPoints: earnings?.map(data => 
                ( 
                   {x: new Date(data.date.substring(data.date.length)), y:(data.totalValue.toFixed(2))}
                ))
          }
          ]
      }}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
  )
}


