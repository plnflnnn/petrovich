import { AdminSidebar } from "@/app/admin/_components/admin-sidebar";

type AdminShellProps = {
  username: string;
  children: React.ReactNode;
};

export function AdminShell({ username, children }: AdminShellProps) {
  return (
    <div className="min-h-full bg-bg">
      <div className="mx-auto flex min-h-full w-full max-w-7xl flex-col lg:flex-row">
        <div className="lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:shrink-0">
          <AdminSidebar username={username} />
        </div>

        <main className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
