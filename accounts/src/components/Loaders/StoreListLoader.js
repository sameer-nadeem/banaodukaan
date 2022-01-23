import React from "react"
import ContentLoader from "react-content-loader"

const StoreListLoader = (props) => (
  <ContentLoader
    speed={2}
    width={500}
    height={500}
    viewBox="0 0 400 400"
    backgroundColor="#d9d9d9"
    foregroundColor="#ededed"
    {...props}
  >
    <rect x="0" y="0" rx="4" ry="4" width="350" height="55" />
    {/* <rect x="8" y="6" rx="4" ry="4" width="35" height="38" /> */}
    <rect x="0" y="60" rx="4" ry="4" width="350" height="55" />
    {/* <rect x="8" y="55" rx="4" ry="4" width="35" height="38" /> */}
    <rect x="0" y="120" rx="4" ry="4" width="350" height="55" />
    {/* <rect x="8" y="104" rx="4" ry="4" width="35" height="38" /> */}
  </ContentLoader>
)

export default StoreListLoader

