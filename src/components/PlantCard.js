import React, { useState } from "react";

function PlantCard({ plant, onDeletePlant, onUpdatePrice }) {
  const [isSoldOut, setIsSoldOut] = useState(false);

  function handleToggleStock() {
    setIsSoldOut(!isSoldOut);
  }

  function handleDelete() {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "DELETE"
    }).then(() => onDeletePlant(plant.id));
  }

  function handlePriceUpdate(e) {
    const newPrice = parseFloat(e.target.value);
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ price: newPrice })
    })
      .then((response) => response.json())
      .then((updatedPlant) => {
        onUpdatePrice(updatedPlant);
      });
  } 
  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      <input
        type="number"
        step="0.01"
        defaultValue={plant.price}
        onBlur={handlePriceUpdate}
      />
      {true ? (
        <button onClick={handleToggleStock} className={isSoldOut ? "" :"primary"}> {isSoldOut ? "Out of Stock" : "In Stock"}</button>
      ) : (
        <button onClick={handleDelete} className="delete-button">Delete</button>
      )}
    </li>
  );
}

export default PlantCard;
