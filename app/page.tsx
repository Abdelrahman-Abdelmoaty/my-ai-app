"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "@/components/auth/login-form";
import { RegisterForm } from "@/components/auth/register-form";
import { ProfileForm } from "@/components/profile/profile-form";
import { SettingsForm } from "@/components/settings/settings-form";
import { useState } from "react";

export default function Home() {
  const [selectedTab, setSelectedTab] = useState("login");

  return (
    <div className="p-4 sm:pt-10 md:pt-20 lg:pt-30 xl:pt-40">
      <Card className="mx-auto w-full sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[700px]">
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
          <CardDescription>Manage your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full" value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <LoginForm setSelectedTab={setSelectedTab} />
            </TabsContent>

            <TabsContent value="register">
              <RegisterForm setSelectedTab={setSelectedTab} />
            </TabsContent>

            <TabsContent value="profile">
              <ProfileForm />
            </TabsContent>

            <TabsContent value="settings">
              <SettingsForm />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
