
import React from 'react';
import Box from "../assets/icons/empty-box.png"

const SolanaEmpty = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}  >
        <img style={{ margin: '20px auto 0px', minHeight: '260px'}} 
            src={Box}
            alt="Mi SVG" />
            <span>Select a collection in the search field</span>
    </div>
  );
};

export default SolanaEmpty;