import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/plants")
      .then((response) => response.json())
      .then((data) => setPlants(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const addPlant = (newPlant) => {
    setPlants([...plants, newPlant]);
  };

  const toggleSoldOut = (id) => {
    setPlants(
      plants.map((plant) =>
        plant.id === id ? { ...plant, isSoldOut: !plant.isSoldOut } : plant
      )
    );
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm)
  );

  return (
    <main>
      <NewPlantForm addPlant={addPlant} />
      <Search onSearchChange={handleSearchChange} />
      <PlantList plants={filteredPlants} toggleSoldOut={toggleSoldOut} />
    </main>
  );
}

export default PlantPage;
