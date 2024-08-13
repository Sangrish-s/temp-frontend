/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/recent_filings",
        destination: "https://api.smartfilings.net/recent_filings",
      },
      {
        source: "/get_filing_html",
        destination: "https://api.smartfilings.net/get_filing_html",
      },
      {
        source: "/get_summary",
        destination: "https://api.smartfilings.net/get_summary",
      },
      {
        source: "/get_key_points",
        destination: "https://api.smartfilings.net/get_key_points",
      },
      {
        source: "/get_red_flags",
        destination: "https://api.smartfilings.net/get_red_flags",
      },
      {
        source: "/get_who_is_involved",
        destination: "https://api.smartfilings.net/get_who_is_involved",
      },
      {
        source: "/get_who_is_impacted",
        destination: "https://api.smartfilings.net/get_who_is_impacted",
      }
    ]
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
};

export default nextConfig;
