
import React, { useEffect, useState } from 'react';
import { useStore } from '../../hooks/useStore';

export function MerchList() {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ merch, setMerch ] = useState([])

  useEffect(() => {
    const getMerch = async () => {
      setIsLoading(true);
      let response = await axios.GET('/merch', params);
      // response = JSON.parse(response.body);

      setMerch(response.merch);
      setIsLoading(false);
    }

    getMerch();
  })

  return(
    <div className="merch-list">
      {merch.map((item) => {
        return (
          <div className="merch-item">
            <img className="primary-image" src={item.defaultImage} />
            {item.colors.map((color) => {
              

            })}
          </div>
        )
      })}
    </div>
  );
}
