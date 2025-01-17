"use server";

import { db, notes } from "@/db";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from 'uuid';

export async function createNote(userId: string, title: string, content: string, from: string){
  try {
    if(!userId) return { success: false, error: "No user found" }

    await db.insert(notes).values({
      id: uuidv4(),
      userId,
      title,
      content,
      from,
      createdAt: new Date()
    })

    revalidatePath("/");
  } catch (error) {
    console.error(error)
    return { success: false, error: "Error creating note" }
  }
}

export async function getNotes(userId: string){
  try {
    if(!userId) return { success: false, error: "No user found" }
    const note = await db.select().from(notes).where(eq(notes.userId, userId))
    return note
  } catch (error) {
    console.error(error)
    return { success: false, error: "Error fetching notes" }
  }
}

export async function deleteNote(userId: string, noteId: string) {
  try {
    if(!userId) return { success: false, error: "No user found" }
    if(!noteId) return { success: false, error: "No note ID provided" }

    await db.delete(notes)
      .where(
        and(
          eq(notes.id, noteId),
          eq(notes.userId, userId)
        )
      );

    revalidatePath("/");
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false, error: "Error deleting note" }
  }
}