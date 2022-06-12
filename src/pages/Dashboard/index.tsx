import { useEffect, useState } from "react";
import { Food } from "../../components/Food";
import { Header } from "../../components/Header";
import { ModalAddFood } from "../../components/ModalAddFood";
import { ModalEditFood } from "../../components/ModalEditFood";
import api from "../../services/api";
import { FoodsContainer } from "./styles";

export type FoodType = {
  id?: string;
  name: string;
  image: string;
  description: string;
  price: string;
  available: boolean;
};

export function Dashboard() {
  const [foods, setFoods] = useState<FoodType[]>([]);
  const [editingFood, setEditingFood] = useState({} as FoodType);
  const [isNewFoodModalOpen, setIsNewFoodModalOpen] = useState(false);
  const [isEditFoodModalOpen, setIsEditFoodModalOpen] = useState(false);

  useEffect(() => {
    api.get("/foods").then((result) => setFoods(result.data));
  }, []);

  function handleOpenNewFoodModal() {
    setIsNewFoodModalOpen(true);
  }

  function handleCloseNewFoodModal() {
    setIsNewFoodModalOpen(false);
  }

  function handleOpenEditFoodModal() {
    setIsEditFoodModalOpen(true);
  }

  function handleCloseEditFoodModal() {
    setIsEditFoodModalOpen(false);
  }

  async function handleAddFood(food: FoodType) {
    try {
      const response = await api.post("/foods", {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteFood(id: string) {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter((food) => food.id !== id);

    setFoods(foodsFiltered);
  }

  const handleUpdateFood = async (food: FoodType) => {
    try {
      const foodUpdated = await api.put(`/foods/${editingFood.id}`, {
        ...editingFood,
        ...food,
      });

      const foodsUpdated = foods.map((food) =>
        food.id !== foodUpdated.data.id ? food : foodUpdated.data
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditFood = (food: FoodType) => {
    setEditingFood(food);
    handleOpenEditFoodModal();
  };

  return (
    <>
      <Header onRequestOpen={handleOpenNewFoodModal} />
      <ModalAddFood
        isOpen={isNewFoodModalOpen}
        onRequestClose={handleCloseNewFoodModal}
        onRequestAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={isEditFoodModalOpen}
        onRequestClose={handleCloseEditFoodModal}
        onRequestEditFood={handleUpdateFood}
        editingFood={editingFood}
      />
      <FoodsContainer data-testid="foods-list">
        {foods.map((food) => (
          <Food
            key={food.id}
            food={food}
            onRequestDeleteFood={handleDeleteFood}
            onRequestOpenEditFoodModal={handleOpenEditFoodModal}
            onRequestEditFood={handleEditFood}
          />
        ))}
      </FoodsContainer>
    </>
  );
}
