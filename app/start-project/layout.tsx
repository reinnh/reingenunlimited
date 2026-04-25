import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start a Project",
  description: "Ready to build something incredible? Let's discuss your next big digital infrastructure or web application project.",
};

export default function StartProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
