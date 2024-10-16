import { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import LoadingSpinner from './LoadingSpinner';

function ProgressChart({ sessionData, loading }) {
     
    const [chartDataObjects, setChartDataObjects] = useState(null);

    useEffect(() => {
        setDataObjects();
    }, [sessionData]);


    function setDataObjects() {
        const chartData = []
        for (let i = 0; i < 30; i++) {
            chartData.push({
                "name": `${i+1}. nov`,
                "Økter": 0,
            })
        }

        if (sessionData) {
            for (let i = 0; i < sessionData.length; i++) {
                chartData[sessionData[i].day - 1]["Økter"]++;
            }
        }

        setChartDataObjects(chartData)
    }

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
          return (
            <div className="bg-accent-color-secondary p-1 rounded-lg bg-opacity-80">
              <p className="">{label}</p>
              <p className="">{`${payload[0].value} registrerte økter`}</p>
            </div>
          );
        }
      
        return null;
      };

    return (
        <>
            {
                loading ? (
                    <LoadingSpinner />
                ) : (
                    <AreaChart width={1024} height={250} data={chartDataObjects && chartDataObjects} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#EB6B44" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#EB6B44" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Area type="monotone" dataKey="Økter" stroke="#EB6B44" fillOpacity={1} fill="url(#colorUv)" />
                        <Tooltip content={<CustomTooltip />} />
                    </AreaChart>
                )
            }
        </>
    );
}

export default ProgressChart;