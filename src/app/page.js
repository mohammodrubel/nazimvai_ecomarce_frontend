import Banner from "@/components/Banner/Banner";
import Brand from "@/components/Brand/Brand";
import Category from "@/components/Category/Category";
import ProductCard from "@/components/ProductCard/ProductCard";
import RecentProduct from "@/components/ProductCard/RecentProduct";
import SkinCareBanner from "@/components/SkinCareBanner/SkinCareBanner";
import Subscribe from "@/components/Subscribe/Subscribe";
import ReduxProvider from "@/lib/ReduxProvider";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <ReduxProvider>
      <Banner />
      <Category/>
      <SkinCareBanner/>
      <ProductCard/>
      <RecentProduct/>
      <Brand/>
      <Subscribe/>
    </ReduxProvider>
  );
}
