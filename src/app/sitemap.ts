import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://ecommerce-demo-orpin.vercel.app/",
      lastModified: new Date(),
    },
    {
      url: "https://ecommerce-demo-orpin.vercel.app/cart",
      lastModified: new Date(),
    },
    {
      url: "https://ecommerce-demo-orpin.vercel.app/admin",
      lastModified: new Date(),
    },
  ];
}
