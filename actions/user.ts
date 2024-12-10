"use server";

import { db, users } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export async function createUser(name: string){
  try {
    const user = await currentUser()
    if(!user) return { success: false, error: "No user found" }

    await db.insert(users).values({
      id: user.id,
      name,
      email: user.emailAddresses[0].emailAddress,
      avatarUrl: user.imageUrl,
      createdAt: new Date(),
    })

    revalidatePath("/");
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to create user' }
  }
}

export async function getUser(name: string){
  try {
    const user = await db.select().from(users).where(eq(users.name, name)).limit(1);
    if(!user) return { success: false, error: "No user found" }
    return user[0];
  } catch (error) {
    console.error(error)
    return { success: false, error: 'Failed to fetch user' }
  }
}