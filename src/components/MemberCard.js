import React from 'react';
import SiteImage from './SiteImage';

const MemberCard = props => {
  return (
    <article className="media">
      <figure className="media-left mb-0 mx-4 image is-64x64">
        <a href={`https://discordapp.com/users/${props.discordId}`} target="_blank" rel="noreferrer">
          <SiteImage src={props.avatarUrl} imgClassName="is-rounded" alt={props.name} width={64} height={64} />
        </a>
      </figure>
      <div className="media-content">
        <div className="content pt-1">
          <a href={`https://discordapp.com/users/${props.discordId}`} target="_blank" rel="noreferrer">
            <span className="se-member-name is-size-5">{props.name}</span><span> </span>
          </a>
          <p className="has-text-grey mt-1">{props.children}</p>
        </div>
      </div>
    </article>
  );
};

export default MemberCard;
