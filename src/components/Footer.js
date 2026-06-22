import React from 'react';
import { Link } from 'gatsby';

const Footer = () => {
  return (
    <>
      <footer className="footer has-background-white-ter p-6">
        <div className="content has-text-centered">
          <p>
            <Link className="footer-link" to="/imprint">
              Imprint
            </Link>
          </p>
          <p className="is-size-7 footer-note">
            Age of Empires II © Microsoft Corporation. Siege Engineers e.&#8239;V. is not endorsed by or affiliated with
            Microsoft.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
