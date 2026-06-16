import React from 'react';
import SiteImage from './SiteImage';

const WireTransferTile = props => {
  return (
    <article className="tile is-child notification ">
      <h4>Wire Transfer Details</h4>
      {props.info && <p>{props.info}</p>}
      <div className="columns">
        <div className="column is-three-fifths">
          <dl className="description">
            <dt>Account Name</dt>
            <dd>Siege Engineers e. V.</dd>
            <dt>Account Number / IBAN</dt>
            <dd>
              <span className="mr-1">BE12</span>
              <span className="mr-1">9672</span>
              <span className="mr-1">0660</span>
              <span className="mr-1">3292</span>
            </dd>
            <dt>SWIFT Code / BIC</dt>
            <dd>TRWIBEB1XXX</dd>
            <dt>Bank Address</dt>
            <dd>
              Wise Europe SA, <br />
              Rue du Trone 100, <br />
              1050 Brussels, Belgium
            </dd>
          </dl>
        </div>
        <div className="column is-two-fifths">
          <SiteImage src="qr2.png" alt="EPC-QR-Code" />
        </div>
      </div>
    </article>
  );
};

export default WireTransferTile;
