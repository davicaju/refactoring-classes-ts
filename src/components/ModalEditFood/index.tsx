import { useEffect, useState } from "react";
import { FiCheckSquare } from "react-icons/fi";

import { FoodType } from "../../pages/Dashboard";
import { Input } from "../Input";
import Modal from "../Modal";
import { Form } from "./styles";

interface ModalEditFoodProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onRequestEditFood: (food: FoodType) => void;
  editingFood: FoodType;
}

export function ModalEditFood({
  isOpen,
  onRequestClose,
  onRequestEditFood,
  editingFood,
}: ModalEditFoodProps) {
  const [name, setName] = useState(editingFood.name);
  const [description, setDescription] = useState(editingFood.description);
  const [image, setImage] = useState(editingFood.image);
  const [price, setPrice] = useState(editingFood.price);

  useEffect(() => {
    setName(editingFood.name);
    setDescription(editingFood.description);
    setImage(editingFood.image);
    setPrice(editingFood.price);
  }, [editingFood]);

  const handleSubmit = async () => {
    const data = {
      name,
      description,
      image,
      price,
      available: true,
    };
    onRequestEditFood(data);
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={onRequestClose}>
      <Form onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Edit Dish</h1>
        <Input
          name="image"
          placeholder="Enter your image link"
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

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Edit dish</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}
