
import React, {createContext, useState, useEffect} from 'react'
import ProductAPI from './apis/productAPI'
import UserAPI from './apis/userAPI'
import CategoryAPI from './apis/categoryAPI'
import CartAPI from './apis/cartAPI'
import OrderAPI from './apis/orderAPI'
import StatisticAPI from './apis/statisticAPI'

import axios from 'axios'
import { SettingsOverscanOutlined } from '@material-ui/icons'

export const GlobalState = createContext()


export const DataProvider = ({children}) =>{
    const [token, setToken] = useState(false)


    useEffect(() =>{
        const firstLogin = localStorage.getItem('firstLogin');
        if(firstLogin){
            const refreshToken = async () =>{
                const res = await axios.get('/api/user/refresh_token')
        
                setToken(res.data.accesstoken)
    
                setTimeout(() => {
                    refreshToken()
                }, 10 * 60 * 1000)
            }
            refreshToken()
        }
    },[]);

    const state = {
        token: [token, setToken],
        userAPI: UserAPI(token),
        productAPI: ProductAPI(),
        categoryAPI: CategoryAPI(),
        orderAPI: OrderAPI(token),
        statisticAPI: StatisticAPI(token),
        cartAPI: CartAPI(token)
    }



    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}
