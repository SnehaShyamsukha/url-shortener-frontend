import React, { useState } from "react";
import { shortenUrl } from "../services/api";

function UrlForm() {
  const [url, setUrl] = useState("");

  const handleSubmit = async () => {
    const res = await shortenUrl({ originalUrl: url });
    alert("Short URL: " + res.data.shortUrl);
  };

  return (
    <div>
      <input placeholder="Enter URL" onChange={(e)=>setUrl(e.target.value)} />
      <button onClick={handleSubmit}>Shorten</button>
    </div>
  );
}

export default UrlForm;