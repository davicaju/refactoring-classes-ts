import { useState } from "react";
import { FiEdit3, FiTrash } from "react-icons/fi";
import { FoodType } from "../../pages/Dashboard";
import api from "../../services/api";
import { Container } from "./styles";

export interface FoodProps {
  food: {
    id?: string;
    name: string;
    image: string;
    description: string;
    price: string;
    available: boolean;
  };
  onRequestDeleteFood: (id: string) => void;
  onRequestOpenEditFoodModal: () => void;
  onRequestEditFood: (food: FoodType) => void;
}

export function Food({
  food,
  onRequestDeleteFood,
  onRequestOpenEditFoodModal,
  onRequestEditFood,
}: FoodProps) {
  const [isAvailable, setIsAvailable] = useState(food.available);

  async function toggleAvailable() {
    await api.put(`/foods/${food.id}`, {
      ...food,
      available: !isAvailable,
    });

    setIsAvailable(!isAvailable);
  }

  async function setEditingFood() {
    onRequestEditFood(food);
    onRequestOpenEditFoodModal();
  }

  return (
    <Container available={isAvailable}>
      <header>
        <img width="400" height="200" src={food.image} alt={food.name} />
      </header>
      <section className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          R$ <b>{food.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            data-testid={`edit-food-${food.id}`}
            onClick={() => setEditingFood()}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            data-testid={`remove-food-${food.id}`}
            onClick={() => (food.id ? onRequestDeleteFood(food.id) : null)}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{isAvailable ? "Available" : "Unavailable"}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={isAvailable}
              data-testid={`change-status-food-${food.id}`}
              onChange={() => toggleAvailable()}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
}
