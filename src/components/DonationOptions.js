import React from 'react';
import { CircleProgressBar, getDonationStats } from './DonationProgressBar';
import WireTransferTile from './WireTransferTile';
import { Link } from 'gatsby';
import { StripePaymentLink } from './StripePaymentLink';

const DonationOptions = props => {
  const useTestProducts = process.env.GATSBY_STRIPE_ENV === 'test';
  const liveProducts = [
    {
      priceId: 'price_1JOLLNF5HGMIMfioh3leVjGl',
      amount: 11,
      paymentLink: 'https://buy.stripe.com/4gw5kGcx12606Bi3ch'
    },
    {
      priceId: 'price_1JOLLNF5HGMIMfioIR6UOOgF',
      amount: 14,
      paymentLink: 'https://buy.stripe.com/fZe6oK40v8uobVC006'
    },
    // {
    //   priceId: 'price_1JOLLNF5HGMIMfioDsO9ddXd',
    //   amount: 24,
    //   paymentLink: 'https://buy.stripe.com/fZecN88gL3a48Jq148'
    // },
    {
      priceId: 'price_1JOLLNF5HGMIMfio4xmb8KRL',
      amount: 30,
      paymentLink: 'https://buy.stripe.com/6oEcN81Sn3a43p6dQT'
    },
    {
      priceId: 'price_1JOLLNF5HGMIMfioFF2t5e7w',
      amount: 69,
      paymentLink: 'https://buy.stripe.com/3cs28u68DeSMbVC6oo'
    },
    {
      priceId: 'price_1JOLLNF5HGMIMfio5ARKJb4X',
      amount: 105,
      paymentLink: 'https://buy.stripe.com/bIYaF00Oj9ys4ta28a'
    },
    {
      priceId: 'price_1JOLLNF5HGMIMfioPYR2kwZv',
      amount: 420,
      paymentLink: 'https://buy.stripe.com/00g3cygNh11W5xe289'
    }
  ];
  const testProducts = [
    {
      priceId: 'price_1JOMcaF5HGMIMfioJGFS0Tva',
      amount: 11,
      paymentLink: 'https://buy.stripe.com/test_fZe5of2S74cvfBK5ks'
    },
    {
      priceId: 'price_1JOMcaF5HGMIMfio30zff08c',
      amount: 14,
      paymentLink: 'https://buy.stripe.com/test_4gwg2TeAPbEX89i4gn'
    },
    // {
    //   priceId: 'price_1JOMcaF5HGMIMfio8yTItE5I',
    //   amount: 24,
    //   paymentLink: 'https://buy.stripe.com/test_dR69Ev3Wb8sL3T2dQW'
    // },
    {
      priceId: 'price_1JOMcbF5HGMIMfiox4TXHrAD',
      amount: 30,
      paymentLink: 'https://buy.stripe.com/test_cN2cQH50ffVdfBK7sx'
    },
    {
      priceId: 'price_1JOMcbF5HGMIMfiozQ7If5It',
      amount: 69,
      paymentLink: 'https://buy.stripe.com/test_9AQ7wneAP5gz61a3cg'
    },
    {
      priceId: 'price_1JOMcbF5HGMIMfioQnAMic0M',
      amount: 105,
      paymentLink: 'https://buy.stripe.com/test_cN27wnboD10jgFO7sv'
    },
    {
      priceId: 'price_1JOMcbF5HGMIMfioIg4J88AM',
      amount: 420,
      paymentLink: 'https://buy.stripe.com/test_6oEdUL50f38rahqbIK'
    }
  ];
  const paymentButtons = (useTestProducts ? testProducts : liveProducts).map(product => (
    <StripePaymentLink
      label={`Donate € ${product.amount}`}
      priceId={product.priceId}
      className="is-info"
      key={product.priceId}
      paymentLink={product.paymentLink}
      style={{
        width: 130
      }}
    />
  ));

  const { annualCost, availableFunds } = getDonationStats();
  const percent2026 = Math.round((availableFunds[0] / annualCost) * 100);
  const percent2027 = Math.round((availableFunds[1] / annualCost) * 100);
  const percent2028 = Math.round((availableFunds[2] / annualCost) * 100);

  return (
    <div className="tile is-ancestor">
      <div className="tile">
        <div className="tile is-parent is-vertical">
          <article className="tile is-child notification se-dark-neutral-tile se-payment-tile">
            <h4>Donate Now</h4>
            <p className="buttons ">{paymentButtons}</p>
            <p>These buttons will lead you to stripe.com where you can donate to us by paying with your credit card.</p>
          </article>
          <article className="tile is-child notification">
            <h4>Donation Goal & Progress</h4>
            <p>
              If the cost estimations on our <Link to={'/projects'}>projects page</Link> are accurate and no projects
              are added or removed, we would need about <strong>€&nbsp;{(annualCost - availableFunds[1]).toFixed(2)}</strong> more to
              cover our costs for 2027.
            </p>
            <div className="columns is-mobile">
              <div className="column is-one-third has-text-centered">
                <figure className="image is-96x96 m-auto">
                  <CircleProgressBar percent={percent2026} />
                </figure>
                <p className="subtitle mt-2">2026</p>
              </div>
              <div className="column is-one-third has-text-centered">
                <figure className="image is-96x96 m-auto">
                  <CircleProgressBar percent={percent2027} />
                </figure>
                <p className="subtitle mt-2">2027</p>
              </div>
              <div className="column is-one-third has-text-centered">
                <figure className="image is-96x96 m-auto">
                  <CircleProgressBar percent={percent2028} />
                </figure>
                <p className="subtitle mt-2">2028</p>
              </div>
            </div>
            <p className="has-text-grey has-text-right">
              <small>
                <small>
                  Last updated on <time dateTime="2026-04-28">Apr 28, 2026</time>
                </small>
              </small>
            </p>
          </article>
        </div>
        <div className="tile is-parent is-vertical">
          <WireTransferTile info="You can also wire an amount of your choice directly to our Bank Account." />
        </div>
      </div>
    </div>
  );
};

export default DonationOptions;
