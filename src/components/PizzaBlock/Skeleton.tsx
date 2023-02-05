import React from "react";
import ContentLoader from "react-content-loader";

export const Skeleton: React.FC = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={480}
    viewBox="0 0 280 480"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="132" cy="112" r="105" />
    <rect x="4" y="237" rx="10" ry="10" width="264" height="27" />
    <rect x="4" y="288" rx="10" ry="10" width="266" height="94" />
    <rect x="5" y="409" rx="15" ry="15" width="93" height="45" />
    <rect x="128" y="399" rx="20" ry="20" width="141" height="60" />
  </ContentLoader>
);
