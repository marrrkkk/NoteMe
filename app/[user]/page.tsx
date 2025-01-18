import SendNote from "@/components/SendNote";
import NotesList from "@/components/NoteList";
import { getUserByName } from "@/actions/user";
import { getNotes } from "@/actions/note";
import UserProfile from "@/components/UserProfile";
import Settings from "@/components/Settings";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";

interface PageProps {
  params: Promise<{
    user: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { user } = await params;
  const userData = await getUserByName(user);
  if (!userData || "error" in userData) {
    return { title: "User Not Found" };
  }
  return { title: userData.name };
}

const UserPage = async ({ params }: PageProps) => {
  const { user } = await params;
  const userData = await getUserByName(user);
  const currentUserData = await currentUser();

  if (!userData) {
    return <div>Error: No user data found</div>;
  }

  if ("error" in userData) {
    return <div>Error: {userData.error}</div>;
  }

  const noteData = await getNotes(userData.id);

  if (!noteData) {
    return <div>Error: No notes found</div>;
  }

  if ("error" in noteData) {
    return <div>Error: {noteData.error}</div>;
  }

  const joinedDate = new Date(userData.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <div className="flex justify-end p-3 space-x-3">
        <SignedOut>
          <SignInButton>
            <Button>Login</Button>
          </SignInButton>
          <SignUpButton>
            <Button>Sign up</Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <Settings
            userId={userData.id}
            currentNickname={userData.nickname}
            currentUsername={userData.name}
            currentBio={userData.bio || ""}
          />
        </SignedIn>
      </div>
      <main className="max-w-screen-xl mx-auto p-4 sm:p-8 mt-14">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1">
            <UserProfile
              name={userData.name}
              nickname={userData.nickname}
              bio={userData.bio || undefined}
              email={userData.email}
              userId={userData.id}
              avatar_url={userData.avatarUrl || undefined}
              createdAt={joinedDate}
            />
            {currentUserData?.id !== userData.id && (
              <div className="mt-8">
                <SendNote userId={userData.id} />
              </div>
            )}
          </div>
          <div className="flex-1">
            <NotesList notes={noteData} />
          </div>
        </div>
      </main>
    </>
  );
};

export default UserPage;
