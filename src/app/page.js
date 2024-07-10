// app/page.js
import Banner from "@/components/Banner/Banner";
import Navigation from "@/components/Navigation/Navigation";
import ReduxProvider from "@/lib/ReduxProvider";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <ReduxProvider>
      <Navigation />
      <Banner />
      <Toaster position="top-center" />
    </ReduxProvider>
  );
}
