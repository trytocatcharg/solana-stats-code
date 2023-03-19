import React, { useEffect, useState } from 'react'
import './HeaderMarket.scss';

function HeaderMarket() {
    const [state, setState]  = useState({
        price: 0,
        marketCap: 0,
        tps: 0
      });

    useEffect(() => {
        fetch('https://api.coingecko.com/api/v3/coins/solana')
        .then((response) => {
            const { market_data } = response as any;
            setState({
              price: market_data.current_price.usd,
              marketCap: market_data.market_cap.usd,
              tps: market_data.tps
            });
          })
          .catch((error) => {
            console.log(error);
          });
        
    }, []);

  return (
    <div>
        <span>Solana Price: ${state.price}</span>
        <span>TPS: ${state.tps}</span>
    </div>
  )
}

export default HeaderMarket
