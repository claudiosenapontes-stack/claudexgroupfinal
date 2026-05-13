import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Process from "@/components/sections/Process";
import Sectors from "@/components/sections/Sectors";
import Operations from "@/components/sections/Operations";
import Showreel from "@/components/sections/Showreel";
import Atlas from "@/components/sections/Atlas";
import Values from "@/components/sections/Values";
import Contact from "@/components/sections/Contact";
import NetworkBand from "@/components/sections/NetworkBand";
import MapLocation from "@/components/sections/MapLocation";
import Footer from "@/components/sections/Footer";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <Process />
        <Sectors />
        <Showreel variant="ship" />
        <Operations />
        <Showreel variant="truck" />
        <Atlas />
        <Values />
        <Contact />
        <NetworkBand />
        <MapLocation />
      </main>
      <Footer />
    </>
  );
}
