import fs from "fs";
import { SitemapStream, streamToPromise } from "sitemap";

export async function GET(req: Request) {
  // Create a Sitemap stream
  const sitemapStream = new SitemapStream({
    hostname: "https://wp-boke.work",
  });

  // Add URLs to the Sitemap stream
  const pages = [
    "/pages/blog-details/38",
    "/pages/secret",
    "/pages/blog-details/45",
  ];
  pages?.map((v) => sitemapStream.write({ url: `${v}` }));
  // ...

  // End the stream
  sitemapStream.end();

  // Generate the XML
  const sitemap = await streamToPromise(sitemapStream);

  const serverName = process.env.SERVER_NAME;
  if (serverName !== "vercel") {
    const sitemapPath = "./public/dead-chain.xml";
    fs.writeFileSync(sitemapPath, sitemap);
  }

  // Write the XML to the response
  let myResponse = new Response(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=0.1, must-revalidate",
    },
  });

  return myResponse;
}
