import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ChatWidget } from "./Chatbot/ChatWidget";
import { ScrollToTop } from "./ScrollToTop";

export const Layout = () => (
  <div className="flex min-h-screen flex-col bg-ink text-parchment">
    <ScrollToTop />
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
    <ChatWidget />
  </div>
);
