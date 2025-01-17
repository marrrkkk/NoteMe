"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "./ui/dialog";
import { updateUser } from "@/actions/user";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Bolt, Loader2 } from "lucide-react";
import { useClerk } from "@clerk/nextjs";

interface SettingsProps {
  userId: string;
  currentNickname: string;
  currentUsername: string;
  currentBio: string;
}

const Settings = ({
  userId,
  currentNickname,
  currentUsername,
  currentBio,
}: SettingsProps) => {
  const [nickname, setNickname] = useState(currentNickname);
  const [username, setUsername] = useState(currentUsername);
  const [bio, setBio] = useState(currentBio);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signOut } = useClerk();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedNickname = nickname.trim() !== "" ? nickname : currentNickname;
    const updatedUsername = username.trim() !== "" ? username : currentUsername;
    const updatedBio = bio.trim() === "" ? undefined : bio;

    setLoading(true);
    const result = await updateUser(
      userId,
      updatedNickname,
      updatedUsername,
      updatedBio
    );
    setLoading(false);

    if (result.success) {
      setOpen(false);

      if (updatedUsername !== currentUsername) {
        router.push(`/${updatedUsername}`);
      }
    } else {
      alert(result.error);
    }
  };

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="fixed top-5 right-8">
          <Bolt />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Your Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <textarea
              placeholder="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
        <div className="mt-4">
          <Button onClick={handleLogout} variant="destructive">
            Log Out
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Settings;
