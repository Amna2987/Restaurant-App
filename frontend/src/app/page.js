import HeroSlider from "@/components/HeroSlider";
import LatestItems from "@/components/LatestItems";
import MenuTabs from "@/components/MenuTabs";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-black text-white">
      <HeroSlider />
      <MenuTabs />
      <LatestItems />
    </main>
  );
}
