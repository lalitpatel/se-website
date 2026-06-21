import React from 'react';
import { withPrefix } from 'gatsby';
import SchemaOrg from './schema-org';
import useSiteMetadata from '../../hooks/use-site-config';
import useSiteImages from '../../hooks/use-site-images';

const SEO = props => {
  const { isBlogPost, path = '', lang = 'en', datePublished } = props;
  const { siteTitle, siteUrl, urlShareImage, siteDescription, twitterUsername, authorName } = useSiteMetadata();

  const title = props.title ? `${props.title} | ${siteTitle}` : `${siteTitle} - ${siteDescription}`;
  const formattedSiteUrl = siteUrl.endsWith('/') ? siteUrl.substring(0, siteUrl.length - 1) : siteUrl;
  const defaultShareImage = withPrefix(useSiteImages(urlShareImage).src);
  const imagePath = props.imageShare || props.cover || defaultShareImage;
  const image = `${formattedSiteUrl}${imagePath}`;
  const description = props.description || siteDescription;
  const internalTranslations = (props.translations || []).filter(t => !t.link.startsWith('http'));
  const url = formattedSiteUrl + withPrefix(path);

  return (
    <>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {internalTranslations.length > 0 && <link rel="alternate" hrefLang={lang} href={url} />}
      {internalTranslations.map(translation => (
        <link
          key={`head-translation-${translation.hreflang}`}
          rel="alternate"
          hrefLang={translation.hreflang}
          href={formattedSiteUrl + withPrefix(translation.link)}
        />
      ))}

      <meta property="og:url" content={url} />
      <meta property="og:type" content={isBlogPost ? 'article' : 'website'} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterUsername} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <SchemaOrg
        isBlogPost={isBlogPost}
        url={url}
        title={title}
        image={image}
        description={description}
        datePublished={datePublished}
        canonicalUrl={url}
        author={authorName}
        organization={{
          name: siteTitle,
          url: formattedSiteUrl,
          logo: image
        }}
        defaultTitle={title}
      />
    </>
  );
};

export default SEO;
