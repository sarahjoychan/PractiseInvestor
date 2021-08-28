import { useState, useEffect } from 'react'
import { CanvasJSChart } from 'canvasjs-react-charts';
import { useSelector } from 'react-redux';
import { getDataForCompanyWithSymbol } from '../../../../api/stockchartApi';
import { HoldingI } from '../../../../interfaces/Holding';

export const StockChart = ({selectedStock, holdingSelected}) =>  {
  const [stockData, setStockData] = useState<any>([]);
  const [stock, setStock] = useState<string>('');
  const { holdings } = useSelector((state: any) => state.holdings);
  
  useEffect(() => {
    //stock-graph by default displays the stock you have invested the most money into
    const fet = async () => {
      let holding: HoldingI[] = await Promise.all(holdings);
      let maxInvestStock;
      let j = 0;
      maxInvestStock = holding[j];
      for (let i = 0; i < holding.length; i++) {
        if (holding[i+1] && maxInvestStock && (maxInvestStock.quantity * maxInvestStock.avgCost) < (holding[i+1].quantity * holding[i+1].avgCost)) {
          maxInvestStock = holding[i+1];
        } 
      }
      setStock(maxInvestStock.company);
      const result = await getDataForCompanyWithSymbol(maxInvestStock.ticker);
      if (result.data['Time Series (Daily)']){
        setStockData(formatStockData(result.data['Time Series (Daily)']))
      };
    }
    fet() 
  }, [])
  useEffect(() => {
    if (selectedStock) {
      const fet = async () => {
        const result = await getDataForCompanyWithSymbol(selectedStock);
        if (result.data['Time Series (Daily)']) {
          setStockData(formatStockData(result.data['Time Series (Daily)']));
          setStock(holdingSelected);
        }
      }
      fet() 
    }
  }, [selectedStock])

  function formatStockData(stockData) {
    return Object.entries(stockData)?.map(entries => {
      const [date, value]: any = entries;
      return {
        date,
        open: Number(value['1. open']),
        high: Number(value['2. high']),
        low: Number(value['3. low']),
        close: Number(value['4. close']),
        volume: Number(value['5. volume'])
      }  
    }) 
  } 

  return (
    <div style={{ padding: "1.5rem 0 1.5rem 5rem", display: 'flex', justifyContent: 'center' }}>
      <CanvasJSChart
        options={ {
          zoomEnabled: true,
          colorSet:  "customColorSet1",
          theme: "light2", // "light1", "light2", "dark1", "dark2"
	        title: {
		        text: `${stock}`,
            fontColor: "#b5b5c6",
	        },
          width: 1000,
          height: 350,
          backgroundColor: "#ffffff",
          data: [
            {
              type: 'candlestick',
              dataPoints: stockData?.map(stockData => 
                ({
                x: new Date (stockData.date),
                y: [
                  stockData.open,
                  stockData.high,
                  stockData.low,
                  stockData.close,
                  stockData.volume
                ]
              }))
            }
          ],
          axisY: {
            labelFontColor: "#71BC78",
            title: "",
            prefix: "$",
            titleFontColor: "#71BC78",
            minimum: Math.min(...stockData.map(data => data.low)) / 1.1,
            maximum: Math.max(...stockData.map(data => data.high)) * 1.1,
            crosshair: {
              enabled: true,
              snapToDataPoint: true,
            }
          }, 
          axisX: {
            title: "Past 11 weeks",
            titleFontColor: "#2683e2",
            titleFontWeight: "lighter",
            titleFontSize: 16,
            labelFontColor: "#007FFF",
            interval: 1,
          },
        } }
      />  
    </div>
  )
}
