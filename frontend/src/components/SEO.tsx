import { Helmet, HelmetProvider } from "react-helmet-async";

export function SEOProvider({ children }: { children: React.ReactNode }) {
  return <HelmetProvider>{children}</HelmetProvider>;
}

export function SEO({ title, description, keywords }:{
  title?: string; description?: string; keywords?: string[];
}) {
  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
    </Helmet>
  );
}