// app/page.js
import Banner from "@/components/Banner/Banner";
import Navigation from "@/components/Navigation/Navigation";
import ReduxProvider from "@/lib/ReduxProvider";

export default function Home() {
  return (
    <ReduxProvider>
      <Navigation />
      <Banner />
    </ReduxProvider>
  );
}
