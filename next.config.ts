import type { NextConfig } from "next";
// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

try {
  initOpenNextCloudflareForDev();
} catch (e) {
  console.error("Error initializing OpenNext Cloudflare for dev:", e);
}

const nextConfig: NextConfig = {
  /* config options here */
  rewrites: async () => {
    return {
      beforeFiles: [
        {
          source: "/:path(.*)",
          has: [
            {
              type: "query",
              key: "secret",
              value: "(?<secret>.+)",
            },
          ],
          destination: "/api/redirect",
        },
      ],
    };
  },
};

export default nextConfig;
