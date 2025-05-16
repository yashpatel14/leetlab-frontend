import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, User, Shield, Image } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

import ProfileSubmission from "../components/ProfileSubmission";
import ProblemSolvedByUser from "../components/ProblemSolvedByUser";
import PlaylistProfile from "../components/PlaylistProfile";

const Profile = () => {
  const { authUser } = useAuthStore();

  return (
    <div className="min-h-screen bg-muted flex flex-col items-center py-10 px-4 md:px-8 w-full">
      {/* Header with back button */}
      <div className="flex flex-row justify-between items-center w-full max-w-4xl mb-6">
        <div className="flex items-center gap-3">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-primary">Profile</h1>
        </div>
      </div>

      {/* Profile Card */}
      <div className="w-full max-w-4xl">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Avatar */}
              <Avatar className="w-24 h-24 ring ring-primary ring-offset-background ring-offset-2">
                {authUser.image ? (
                  <AvatarImage src={authUser.image} alt={authUser.name} />
                ) : (
                  <AvatarFallback className="text-3xl">
                    {authUser.name ? authUser.name.charAt(0) : "U"}
                  </AvatarFallback>
                )}
              </Avatar>

              {/* Name and Role Badge */}
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold">{authUser.name}</h2>
                <Badge variant="default" className="mt-2">
                  {authUser.role}
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Separator className="my-4" />

            {/* User Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div className="rounded-lg bg-muted p-4 space-y-1">
                <div className="flex items-center gap-2 text-primary">
                  <Mail className="w-5 h-5" />
                  <span className="font-semibold">Email</span>
                </div>
                <div className="text-sm break-words">{authUser.email}</div>
              </div>

              {/* User ID */}
              <div className="rounded-lg bg-muted p-4 space-y-1">
                <div className="flex items-center gap-2 text-primary">
                  <User className="w-5 h-5" />
                  <span className="font-semibold">User ID</span>
                </div>
                <div className="text-sm break-all">{authUser.id}</div>
              </div>

              {/* Role */}
              <div className="rounded-lg bg-muted p-4 space-y-1">
                <div className="flex items-center gap-2 text-primary">
                  <Shield className="w-5 h-5" />
                  <span className="font-semibold">Role</span>
                </div>
                <div className="text-sm">{authUser.role}</div>
                <div className="text-xs text-muted-foreground">
                  {authUser.role === "ADMIN"
                    ? "Full system access"
                    : "Limited access"}
                </div>
              </div>

              {/* Image status */}
              <div className="rounded-lg bg-muted p-4 space-y-1">
                <div className="flex items-center gap-2 text-primary">
                  <Image className="w-5 h-5" />
                  <span className="font-semibold">Profile Image</span>
                </div>
                <div className="text-sm">
                  {authUser.image ? "Uploaded" : "Not Set"}
                </div>
                <div className="text-xs text-muted-foreground">
                  {authUser.image ? "Image available" : "Upload a profile picture"}
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline">Edit Profile</Button>
            <Button>Change Password</Button>
          </CardFooter>
        </Card>

        {/* Additional Sections */}
        <div className="mt-10 space-y-6">
          <ProfileSubmission />
          <ProblemSolvedByUser />
          <PlaylistProfile />
        </div>
      </div>
    </div>
  );
};

export default Profile;
