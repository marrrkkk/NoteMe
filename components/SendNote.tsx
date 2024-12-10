"use client";
import { createNote } from "@/actions/note";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

const SendNote = ({ userId }: { userId: string }) => {
  const [content, setContent] = useState("");
  const [from, setFrom] = useState("");
  const [open, setOpen] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sender = from.trim() === "" ? "Anonymous" : from;
    await createNote(userId, content, sender);
    setContent("");
    setFrom("");
    setOpen(false);
    console.log("done!");
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>Send Message</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send Note</DialogTitle>
          <DialogDescription>Test</DialogDescription>
        </DialogHeader>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Message</Label>
                <Input
                  id="name"
                  placeholder="Name of your project"
                  onChange={(e) => setContent(e.target.value)}
                  value={content}
                  required
                />
                <Label htmlFor="name">From</Label>
                <Input
                  id="name"
                  placeholder="Anonymous"
                  onChange={(e) => setFrom(e.target.value)}
                  value={from}
                />
              </div>
              <Button type="submit">Send</Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SendNote;
