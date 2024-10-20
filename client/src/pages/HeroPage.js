import { useState } from "react";
import HeroList from "../components/heroes/HeroList";
import HeroDetail from "../components/heroes/HeroDetail";
import heroes from "../data/Heroes";

function HeroPage() {
  const [selectedHero, setSelectedHero] = useState(null);

  return (
    <div>
      <HeroList heroes={heroes} onSelect={(hero) => setSelectedHero(hero)} />
      {selectedHero && <HeroDetail hero={selectedHero} />}
    </div>
  );
}

export default HeroPage;
