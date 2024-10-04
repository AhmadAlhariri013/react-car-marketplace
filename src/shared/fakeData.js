import { faker } from "@faker-js/faker";
function createRandomeCarList() {
  return {
    name: faker.vehicle.vehicle(),
    fuelType: faker.vehicle.fuel(),
    model: faker.vehicle.model(),
    type: faker.vehicle.type(),

    image:
      "https://www.topgear.com/sites/default/files/2024/04/TopGear%20-%20First%20Drive%20-%20BMW%205%20Series%202024-031.jpg",
    miles: 1000,
    gearType: "Automatic",
    price: faker.finance.amount({ min: 4000, max: 20000 }),
  };
}

const carList = faker.helpers.multiple(createRandomeCarList, {
  count: 7,
});

export default {
  carList,
};
