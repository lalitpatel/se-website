import React from 'react';
import useSiteMetadata from '../hooks/use-site-config';
import SiteImage from './SiteImage';

const AuthorInfo = () => {
  const { authorAvatar, authorName, authorDescription } = useSiteMetadata();

  return (
    <div className="content has-text-centered container is-max-desktop pt-6">
      <hr size="1" style={{ width: '50%', marginBottom: '-67px' }} className="mx-auto" />
      <figure className="image is-64x64 author-image mx-auto mb-4">
        <SiteImage src={authorAvatar} imgClassName="is-rounded" alt={authorName} width={64} height={64} />
      </figure>
      <h4>{authorName}</h4>
      <p dangerouslySetInnerHTML={{ __html: authorDescription }} />
    </div>
  );
};

export default AuthorInfo;
