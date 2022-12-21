import Header from "../components/Header";
import Menu from "../components/Menu";
import "../styles/globals.css";
import NextAuthWrapper from "../wrappers/NextAuthWrapper";
import ReactQueryWrapper from "../wrappers/ReactQueryWrapper";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="w-full bg-slate-900">
        <NextAuthWrapper>
          <ReactQueryWrapper>
            <main className="flex flex-col md:flex-row w-full gap-2 md:gap-8 p-1 md:p-4 pt-2 pb-0">
              <nav className="sticky top-0 max-h-screen max-sm:hidden">
                <Menu />
              </nav>
              <div className="w-full">
                <Header />
                <div className="mt-8 mx-2 lg:mx-12 overflow-auto">{children}</div>
              </div>
            </main>
          </ReactQueryWrapper>
        </NextAuthWrapper>
      </body>
    </html>
  );
}
