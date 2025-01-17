/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { TrashIcon } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";
import { deleteNote } from "@/actions/note";
import { toPng } from "html-to-image";

const Note = ({
  id,
  userId,
  title,
  content,
  from,
}: {
  id: string;
  userId: string;
  title: string;
  content: string;
  from: string;
}) => {
  const { user } = useUser();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isDeleteDrawerOpen, setIsDeleteDrawerOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const noteRef = useRef<HTMLDivElement>(null);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await deleteNote(userId, id);

      if (!response.success) {
        throw new Error(response.error);
      }

      toast({
        title: "Note deleted",
        description: "Your note has been successfully deleted.",
      });

      setIsDeleteDrawerOpen(false);
      setOpen(false);
    } catch (error: any) {
      console.error(error); // Log the error for debugging
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete note. Please try again.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSave = async () => {
    try {
      const randomPastelColor = `hsl(${Math.random() * 360}, 70%, 90%)`;

      const card = document.createElement("div");
      card.style.width = "300px";
      card.style.border = "1px solid #e5e7eb";
      card.style.borderRadius = "8px";
      card.style.padding = "16px";
      card.style.backgroundColor = randomPastelColor;
      card.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
      card.style.fontFamily = "Arial, sans-serif";

      card.innerHTML = ` 
        <div style="margin-bottom: 12px; font-weight: bold; font-size: 16px; word-wrap: break-word;">
          ${title}
        </div>
        <div style="margin-bottom: 8px; font-size: 14px; word-wrap: break-word;">
          ${content}
        </div>
        <div style="font-size: 12px; color: #6b7280;">
          <strong>From:</strong> ${from}
        </div>
      `;

      document.body.appendChild(card);

      const dataUrl = await toPng(card, { pixelRatio: 2 });

      document.body.removeChild(card);

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `note_${id}.png`;
      link.click();
    } catch (error: any) {
      console.error(error); // Log the error for debugging
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save note as an image. Please try again.",
      });
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Card className="w-[80%] lg:w-48 mx-auto cursor-pointer">
            <CardHeader>
              <CardTitle className="truncate">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold truncate">{content}</p>
              <p className="text-sm text-gray-500 truncate">From: {from}</p>
            </CardContent>
          </Card>
        </DialogTrigger>

        <DialogContent className="max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="whitespace-normal break-words break-all">
              {title}
            </DialogTitle>
          </DialogHeader>
          <div ref={noteRef} className="space-y-4">
            <p className="whitespace-normal break-words break-all">{content}</p>
            <p className="break-words break-all">
              <strong>From:</strong> {from}
            </p>
          </div>
          {user?.id === userId && (
            <div className="flex justify-between mt-4">
              <Button variant="default" onClick={handleSave}>
                Save
              </Button>{" "}
              <Button
                variant="destructive"
                onClick={() => setIsDeleteDrawerOpen(true)}
              >
                <TrashIcon className="mr-2" /> Delete
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Drawer open={isDeleteDrawerOpen} onOpenChange={setIsDeleteDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              Are you sure you want to delete this note?
            </DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="sm:flex-row sm:justify-end sm:space-x-2">
            <DrawerClose asChild>
              <Button>Cancel</Button>
            </DrawerClose>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Note"}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Note;
