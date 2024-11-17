"use client";

import Image from "next/image";
import { PlayIcon } from "@radix-ui/react-icons";

export const Song = () => {
  return (
    <div className="border border-gray-300 rounded-lg bg-gray-50 p-6 shadow-lg bg-opacity-80">
      <div className="flex items-center align-middle justify-between">
        {/* Vinyl Animation with Album Cover */}
        <div className="relative flex items-center space-x-4">
          <div className="vinyl-spinner">
            <Image
              src="/images/coverArt.jpeg"
              alt="Album Cover"
              className="rounded-full z-10"
              width={32}
              height={32}
            />
          </div>

          {/* Song name */}
          <div>Let You Down - Dawid Podsiadło</div>
        </div>

        {/* Play Icon */}
        <a
          href="https://open.spotify.com/track/1qpGMJi0ippCaMUOs7cz2q?si=16203e184fe648f9"
          target="_blank"
          rel="noopener noreferrer"
          className="items-center align-middle border border-gray-300 rounded-lg p-2"
        >
          <PlayIcon />
        </a>
      </div>

      {/* Vinyl Animation Styling */}
      <style jsx>{`
        .vinyl-spinner {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          border: 4px solid #ccc;
          border-radius: 50%;
          animation: spin 4s linear infinite;
        }

        .relative:hover .vinyl-spinner {
          animation-play-state: running;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};
