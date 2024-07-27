import Banner from "@/components/Banner/Banner";
import Category from "@/components/Category/Category";
import ProductCard from "@/components/ProductCard/ProductCard";
import SkinCareBanner from "@/components/SkinCareBanner/SkinCareBanner";
import ReduxProvider from "@/lib/ReduxProvider";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <ReduxProvider>
      <Banner />
      <Category/>
      <SkinCareBanner/>
      <ProductCard/>
    </ReduxProvider>
  );
}
