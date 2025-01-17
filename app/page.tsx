import { Card } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import ProfileButton from "@/components/ProfileButton";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const LandingPage = async () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-3xl mx-auto space-y-8">
        <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-8">
          <MessageSquare className="h-8 w-8 text-primary" />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Anonymous Messages
          <span className="block text-primary">Made Simple</span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Send notes, ask questions, and share feedback anonymously. No sign-up
          required, start sending messages instantly.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <SignedOut>
            <SignInButton>
              <Button>Login</Button>
            </SignInButton>
            <SignUpButton>
              <Button>Sign up</Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <ProfileButton />
          </SignedIn>
        </div>

        <Card className="mt-16 max-w-xl mx-auto p-6 bg-card/50 backdrop-blur">
          <div className="flex items-center justify-between mb-4">
            <div className="text-smF">
              From: <span className="font-medium">Someone Special</span>
            </div>
            <div className="text-sm text-muted-foreground">NoteMe</div>
          </div>
          <div className="text-muted-foreground text-sm">
            Write your anonymous message here...
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LandingPage;
