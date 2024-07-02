/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          }
        ],
      },
      {
        source: "/",
        headers: [
          {
            "key": "Cache-Control",
            value: "s-maxage:320"
          }
        ]
      }
    ];
  },

  images: {
    domains: ["croucher-public.s3.ap-southeast-1.amazonaws.com"],
  },

  // assetPrefix: "https://cdn.my.com"

  async redirects() {
    return [
      {
        source: "/about",
        destination: "/editor",
        permanent: true
      }
    ]
  }
};

export default nextConfig;
