"use client";

import { useEffect, useState } from "react";

interface GoogleMapProps {
  mapUrl: string;
  title?: string;
}

export default function GoogleMap({ mapUrl, title = "Google Map" }: GoogleMapProps) {
  const [isClient, setIsClient] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleMapLoad = () => {
    setHasError(false);
  };

  const handleMapError = () => {
    setHasError(true);
  };

  const getFallbackMapUrl = () =>
    "https://www.google.com/maps?q=Indonesia&output=embed";

  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden">
      {isClient && (
        <iframe
          src={hasError ? getFallbackMapUrl() : mapUrl}
          title={title}
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={handleMapLoad}
          onError={handleMapError}
        />
      )}
    </div>
  );
}
