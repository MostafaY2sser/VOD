import Sidebar from "@/components/layout/Sidebar";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return <>
  <h1>Sidebar</h1>
  {children}
  <h1>Footer</h1>
  </>;
}
