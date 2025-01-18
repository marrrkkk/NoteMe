"use client";

import { useState, useEffect } from "react";
import { Link, Calendar } from "lucide-react";
import Image from "next/image";

interface UserProfileProps {
  name: string;
  nickname: string;
  email: string;
  userId: string;
  createdAt: string;
  avatar_url?: string;
  bio?: string;
}

const UserProfile = ({
  name,
  nickname,
  userId,
  createdAt,
  avatar_url,
  bio,
}: UserProfileProps) => {
  const [copied, setCopied] = useState(false);
  const [userLink, setUserLink] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentOrigin = window.location.origin;
      setUserLink(`${currentOrigin}/${name}`);
    }
  }, [userId, name]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(userLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy link: ", error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex space-x-6 items-center">
        <div className="w-24 h-24 rounded-full overflow-hidden">
          {avatar_url ? (
            <Image
              src={avatar_url}
              alt={`${name}'s avatar`}
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-black" />
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-gray-600">@{nickname}</p>
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex items-center">
          <Link className="w-4 h-4 mr-1" />
          <div
            className="bg-[#ffe379] text-sm text-gray-800 p-1 rounded-md cursor-pointer inline-block"
            onClick={copyToClipboard}
          >
            {userLink || "Loading..."}
          </div>
        </div>
        {copied && <p className="text-green-600 text-sm mt-1">Link copied!</p>}

        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          <p className="text-gray-600">Joined {createdAt}</p>
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-semibold">Bio</h3>
        <p className="text-gray-600">
          {bio || "This user has not set a bio yet."}
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
