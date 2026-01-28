"use client";

import { useState } from "react";
import Image from "next/image";

export default function RocketImage() {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div className="w-24 h-24 flex items-center justify-center">
        <span className="text-6xl">🚀</span>
      </div>
    );
  }

  return (
    <Image
      src="/assets/rocket.png"
      alt="Rocket"
      width={96}
      height={96}
      className="object-contain"
      onError={() => setImageError(true)}
    />
  );
}
