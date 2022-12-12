import Head from "next/head";

const MetaTags = ({ title, desc, img, keywords }) => {
  return (
    <Head>
      {title && (
        <>
          <title>{title}</title>
          <meta itemProp="name" content={title} />
          <meta name="og:title" property="og:title" content={title} />
          <meta name="twitter:title" property="twitter:title" content={title} />
        </>
      )}

      {desc && (
        <>
          <meta name="description" content={desc} />
          <meta itemProp="description" content={desc} />
          <meta
            name="og:description"
            property="og:description"
            content={desc}
          />
          <meta
            name="twitter:description"
            property="twitter:description"
            content={desc}
          />
        </>
      )}

      {img && (
        <>
          <meta itemProp="image" content={img} />
          <meta name="og:image" property="og:image" content={img} />
          <meta name="twitter:image" property="twitter:image" content={img} />
        </>
      )}

      {/* {url && (
        <>
          <meta itemProp="url" content={url} />
          <meta name="og:url" property="og:url" content={url} />
          <meta name="twitter:url" property="twitter:url" content={url} />
        </>
      )} */}

      {keywords && <meta name="keywords" content={keywords} />}
    </Head>
  );
};

export default MetaTags;
