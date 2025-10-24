import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, canonical }) => {
  const siteName = "Khokhar Motors";
  const fullTitle = `${title} | ${siteName}`;
  
  // Use the provided canonical URL, or construct one from the current window location
  const canonicalUrl = canonical || window.location.href;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />

      {/* --- ADDED CANONICAL TAG --- */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook tags */}
      <meta property="og:type" content={'website'} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:url" content={canonicalUrl} />
      
      {/* Twitter tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEO;