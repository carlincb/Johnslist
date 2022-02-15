import React, { useState } from 'react';



return (
    <div className='productCards'>
        <div className="card" style={{ width: "10%" }}>
            < div>{username}</div>
            <img src={socialNetwork} className="product-image" alt="Product image" />
            <div className="body">
                <div className="title">{productName}</div>
                <div className='card-description'>{description}</div>
            </div>
        </div>
    </div>

)