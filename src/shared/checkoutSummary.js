import { toFarsiNumber } from "./toFarsiNumber";
import React from "react";
import { MoneySeparator } from "./moneySeparator";

export function CheckoutSummary({data}){
  return(
    <div>
      <div className="divider" style={{marginTop: "40px", marginBottom: "40px",}}></div>
      <div className="checkout-container">
        {data.map((item, index) => {

            if(!item.divider){
              return(
                <div key={index} className="checkout-line">
                  <div className="line-part">
                    <span className={`title ${item.bold ? 'bold' : ''}`}>{item.key}</span>
                    <div className="dotted-line"></div>
                    <span className={`value ${item.bold ? 'bold' : ''}`}>{toFarsiNumber(MoneySeparator(item.value))} {item.suffix} </span>
                  </div>
                </div>
              )
            }else{
              return (
                <div className="divider">
                </div>
              )
            }
          }
        )}
      </div>
    </div>
  )
}
