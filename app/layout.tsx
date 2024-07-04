import "./globals.css";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className="p-6 border-b">Main Navbar</nav>
        {children}
      </body>
    </html>
  );
}
