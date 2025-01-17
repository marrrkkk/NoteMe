"use server";

import { db, users } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export async function createUser(
  name: string,
  nickname?: string,
  bio?: string
) {
  try {
    const user = await currentUser();
    if (!user) return { success: false, error: "No user found" };

    await db.insert(users).values({
      id: user.id,
      name,
      nickname: nickname || name,
      email: user.emailAddresses[0].emailAddress,
      avatarUrl: user.imageUrl,
      bio,
      createdAt: new Date(),
    });

    revalidatePath("/");
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to create user" };
  }
}

export async function getUserByName(username: string) {
  try {
    console.log("Fetching user data for username:", username);

    const user = await db
      .select()
      .from(users)
      .where(eq(users.name, username))
      .limit(1);

    console.log("User data fetched:", user);

    if (!user || user.length === 0) {
      return { success: false, error: "No user found" };
    }

    return user[0];
  } catch (error) {
    console.error("Error fetching user:", error);
    return { success: false, error: "Failed to fetch user" };
  }
}

export async function getUserById(userId: string) {
  try {
    console.log("Fetching user data for userId:", userId);

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    console.log("User data fetched:", user);

    if (!user || user.length === 0) {
      return { success: false, error: "No user found" };
    }

    return user[0];
  } catch (error) {
    console.error("Error fetching user:", error);
    return { success: false, error: "Failed to fetch user" };
  }
}

export async function updateUser(
  id: string,
  nickname?: string,
  username?: string,
  bio?: string
) {
  try {
    const updates: { nickname?: string; name?: string; bio?: string } = {};
    if (nickname) updates.nickname = nickname;
    if (username) updates.name = username;
    if (bio) updates.bio = bio;

    if (Object.keys(updates).length === 0) {
      return { success: false, error: "No fields to update" };
    }

    await db.update(users).set(updates).where(eq(users.id, id));

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to update user" };
  }
}
