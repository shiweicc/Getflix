import React from 'react';
import "../details.css";

const WatchProvider = (props) => {
  const data = props.providers;

  const service = {
    apple: "Apple TV",
    peacock: "peacock",
    disney: "Disney+",
    hbo: "HBO Max",
    netflix: "Netflix",
    paramount: "paramount+",
    amazon: "prime video"
  }

  if (data === undefined) {
    return (
      <h1 className='watchNow'>no watch providers</h1>
    )
  } else if (data.paramount) {
    var link = data.paramount[0].link;
    var type = data.paramount[0].type;
    var price = '4.99';
    var serviceName = service.paramount;

    return (
      <div className='watchNow'>
        <a target="_blank" href={`${link}`}>
            <button>Watch on {serviceName}</button>
          </a>
          <h2 className='price'>${price}/mo</h2>
      </div>
    )
  } else if (data.peacock) {
    var link = data.peacock[0].link;
    var type = data.peacock[0].type;
    var price = '4.99';
    var serviceName = service.peacock;

    return (
      <div className='watchNow'>
        <a target="_blank" href={`${link}`}>
            <button>Watch on {serviceName}</button>
          </a>
          <h2 className='price'>${price}/mo</h2>
      </div>
    )
  } else if (data.disney) {
    var link = data.disney[0].link;
    var type = data.disney[0].type;
    var price = '7.99';
    var serviceName = service.disney;

    return (
      <div className='watchNow'>
        <a target="_blank" href={`${link}`}>
            <button>Watch on {serviceName}</button>
          </a>
          <h2 className='price'>${price}/mo</h2>
      </div>
    )
  } else if (data.apple) {
    var i = 1;
    if (!data.apple[1]) {
      i--;
    }
    var link = data.apple[i].link;
    var type = data.apple[i].type;
    var price = data.apple[i].price.amount;
    var serviceName = service.apple;

    return (
      <div className='watchNow'>
        <a target="_blank" href={`${link}`}>
            <button>Watch on {serviceName}</button>
          </a>
        <h2 className='price'>${price}</h2>
      </div>
    )

  } else if (data.hbo) {
    var link = data.hbo[0].link;
    var type = data.hbo[0].type;
    var price = '9.99';
    var serviceName = service.hbo;

    return (
      <div className='watchNow'>
        <a target="_blank" href={`${link}`}>
            <button>Watch on {serviceName}</button>
          </a>
          <h2 className='price'>${price}/mo</h2>
      </div>
    )
  }
}

export default WatchProvider;