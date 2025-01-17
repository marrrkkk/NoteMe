"use client";
import { createNote } from "@/actions/note";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const SendNote = ({ userId }: { userId: string }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [from, setFrom] = useState("Anonymous");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const header = title.trim() === "" ? "Note" : title.trim();
    const sender = from.trim() === "" ? "Anonymous" : from.trim();

    setLoading(true);
    await createNote(userId, header, content.trim(), sender);
    setLoading(false);

    setTitle("");
    setContent("");
    setFrom("Anonymous");
    setOpen(false);
    console.log("done!");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" disabled={loading}>
          {loading ? (
            <Loader2 className="animate-spin h-4 w-4 mr-2" />
          ) : (
            "Send Message"
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send Note</DialogTitle>
        </DialogHeader>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="title"
                  placeholder="Note Title (Optional)"
                  maxLength={64}
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />

                <Textarea
                  id="content"
                  placeholder="Write your note here"
                  maxLength={500}
                  onChange={(e) => setContent(e.target.value)}
                  value={content}
                  required
                  rows={4}
                />

                <Input
                  id="from"
                  placeholder="Your Name (Default: Anonymous)"
                  maxLength={64}
                  onChange={(e) => setFrom(e.target.value)}
                  value={from}
                />
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                ) : (
                  "Send"
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SendNote;
