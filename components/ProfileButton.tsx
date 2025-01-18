"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { getUserById } from "@/actions/user";
import { Button } from "./ui/button";
import Link from "next/link";

interface UserData {
  id: string;
  name: string;
  avatarUrl: string | null;
  nickname?: string;
  bio: string | null;
  email?: string;
}

const ProfileButton = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!isSignedIn || !user) {
        setLoading(false);
        return;
      }

      const userData = await getUserById(user.id);
      if ("error" in userData) {
        setLoading(false);
        return;
      }

      setUserData(userData);
      setLoading(false);
    };

    if (isLoaded) {
      fetchUserData();
    }
  }, [isLoaded, isSignedIn, user]);

  if (loading || !isLoaded) {
    return <Button disabled>Loading...</Button>;
  }

  if (!userData) {
    return null;
  }

  return (
    <Button>
      <Link href={`/${userData.name}`}>My Profile</Link>
    </Button>
  );
};

export default ProfileButton;
