

import {useState, useEffect} from 'react'
import axios from 'axios'

function StatisticAPI() { 

    const [userStatistic, setUserStatistic] = useState(null);
    const [orderStatistic, setOrderStatistic] = useState(null);
    const [callback, setCallback] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
      if(token) {
        const getUserStatistic = async (token) => {
          try {
            const res = await axios.get("/api/statistic/user", {
                headers: {Authorization: token}
            });
            setUserStatistic(res.data);
          } catch (error) {
            console.log(error.response.data.message)
          }
        }

        const getOrderStatistic = async (token) => {
          try {
            const res = await axios.get("/api/statistic/order", {
                headers: {Authorization: token}
            });
            setOrderStatistic(res.data);
          } catch (error) {
            console.log(error.response.data.message)
          }
        }
        getUserStatistic(token);
        getOrderStatistic(token);
      }
    }, [token, callback]);



    return {
        userStatistic: [userStatistic],
        orderStatistic: [orderStatistic]
    }
}

export default StatisticAPI