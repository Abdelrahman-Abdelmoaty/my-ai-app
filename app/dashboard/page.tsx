import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div>
      <h1>Session</h1>
      <p>{JSON.stringify(session)}</p>
    </div>
  );
}
