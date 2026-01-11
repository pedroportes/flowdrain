import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    canonicalUrl?: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description, canonicalUrl }) => {
    const siteTitle = 'FlowDrain | Gestão Inteligente para Desentupidoras';

    return (
        <Helmet>
            <title>{`${title} | ${siteTitle}`}</title>
            <meta name="description" content={description} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:site_name" content="FlowDrain" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
        </Helmet>
    );
};
