import Hero from "@/components/Hero";
import LinkCards from "@/components/LinkCards";
import Welcome from "@/components/Welcome";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <div className="relative z-10 flex w-full flex-col items-center pb-16 pt-3 sm:pt-5">
        <Welcome />
        <Hero />
        <LinkCards />
      </div>
    </main>
  );
}