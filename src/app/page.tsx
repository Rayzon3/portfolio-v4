import { Header } from "@/components/Header";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Song } from "@/components/Song";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-10">
      <Header
        name="Rahul Bhardwaj"
        description="I am a software engineer based in Gurgaon, India."
        avatarUrl1="https://api.dicebear.com/9.x/big-smile/svg?skinColor=f5d7b1&mouth=openedSmile&hairColor=220f00&hair=shortHair&eyes=winking&backgroundColor=b6e3f4"
        avatarUrl2="https://api.dicebear.com/9.x/big-smile/svg?skinColor=f5d7b1&mouth=kawaii&hairColor=220f00&hair=shortHair&eyes=starstruck&backgroundColor=b6e3f4"
        isAvailable={true}
      />

      <section className="grid md:grid-cols-2 gap-4">
        <Skills />
        <Experience />
        <Song />
        <Contact />
      </section>
    </main>
  );
}
