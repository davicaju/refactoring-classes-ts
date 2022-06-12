import { useState } from "react";
import { FiCheckSquare } from "react-icons/fi";

import { FoodType } from "../../pages/Dashboard";
import { Input } from "../Input";
import Modal from "../Modal";
import { Form } from "./styles";

import { v4 as uuidv4 } from "uuid";

interface ModalAddFoodProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onRequestAddFood: (food: FoodType) => void;
}

export function ModalAddFood({
  isOpen,
  onRequestClose,
  onRequestAddFood,
}: ModalAddFoodProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  function handleAddFood() {
    console.log("opa");

    const data = {
      id: uuidv4(),
      name,
      description,
      image,
      price,
      available: true,
    };

    onRequestAddFood(data);
    onRequestClose();
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={onRequestClose}>
      <Form onSubmit={() => handleAddFood()}>
        <h1>Add Dish</h1>
        <Input
          name="image"
          placeholder="Enter your image link here"
          value={image}
          onchange={(e) => setImage(e.target.value)}
        />

        <Input
          name="name"
          placeholder="Ex: Moda Italiana"
          value={name}
          onchange={(e) => setName(e.target.value)}
        />
        <Input
          name="price"
          placeholder="Ex: 19.90"
          value={price}
          onchange={(e) => setPrice(e.target.value)}
        />

        <Input
          name="description"
          placeholder="Description"
          value={description}
          onchange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Add Dish</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}
