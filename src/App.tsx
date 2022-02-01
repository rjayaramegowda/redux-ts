import React, { useEffect, useState } from "react";
import Cars from "./api/availableCars.json";

function App() {
  const [carList, setCarList] = useState<any>([]);
  const [priceList, setPriceList] = useState<any>([]);
  const [carType, setCarType] = useState<any>([]);
  const [capacityPassengers, setCapacityPassengers] = useState<any>([]);
  const [capacityBags, setCapacityBags] = useState<any>([]);

  useEffect(() => {
    setCarList([...Cars]);
    setPriceList([{ min: 0, max: 110 }]);
    setCarType(["ECAR", "MVAR"]);
    setCapacityPassengers([{ min: 3, max: 10 }]);
    setCapacityBags([{ min: 3, max: 7 }]);
  }, []);

  function filterCars() {
    var a = carList.filter((item: any) => {
      let byPrice = filterByPrice(item);
      let byCarType = filterByCarType(item);
      let byCapacityPassengers = filterByCapacityPassengers(item);
      let byCapacityBags = filterByCapacityBags(item);

      let isMatching =
        !byPrice || !byCarType || !byCapacityPassengers || !byCapacityBags
          ? false
          : true;
      return isMatching;
    });
    setCarList(a);
  }

  function filterByPrice(item: any) {
    let isFound = priceList.length > 0 ? false : true;
    priceList.forEach((element: any) => {
      if (!isFound) {
        isFound =
          item.availableCore.totalCharge.estimatedTotal >= element.min &&
          item.availableCore.totalCharge.estimatedTotal <= element.max;
      }
    });
    return isFound;
  }

  function filterByCarType(item: any) {
    let isFound = carType.length > 0 ? false : true;
    carType.forEach((element: string) => {
      if (!isFound) {
        isFound = element === item.availableCore.vehicle.carType;
      }
    });
    return isFound;
  }

  function filterByCapacityPassengers(item: any) {
    let isFound = capacityPassengers.length > 0 ? false : true;
    capacityPassengers.forEach((element: any) => {
      if (!isFound) {
        isFound =
          parseInt(item.availableCore.vehicle.passengerQuantity) >=
            element.min &&
          parseInt(item.availableCore.vehicle.passengerQuantity) <= element.max;
      }
    });
    return isFound;
  }

  function filterByCapacityBags(item: any) {
    let isFound = capacityBags.length > 0 ? false : true;
    capacityBags.forEach((element: any) => {
      if (!isFound) {
        isFound =
          parseInt(item.availableCore.vehicle.baggageQuantity) >= element.min &&
          parseInt(item.availableCore.vehicle.baggageQuantity) <= element.max;
      }
    });
    return isFound;
  }

  return (
    <div className="container mt-5">
      <h1>{carList.length} cars found</h1>
      <p>{carType.length}</p>
      <button onClick={filterCars}>Filter BY Price</button>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Total Price</th>
            <th scope="col">Rental Agency</th>
            <th scope="col">Policies</th>
            <th scope="col">Capacity : Passengers</th>
            <th scope="col">Capacity : Bags</th>
            <th scope="col">Car Type</th>
          </tr>
        </thead>
        capacityPassengers capacityBags
        {carList.map((item: any, index: number) => (
          <tr key={index}>
            <td>{item.availableCore.vehicle.carName}</td>
            <td>{item.availableCore.totalCharge.estimatedTotal}</td>
            <td>{item.availableCore.vendor?.name}</td>
            <td>{item.availableInfo.coverages.map((item:any) => (<li>{item.type}</li>))}</td>
            <td>{item.availableCore.vehicle.passengerQuantity}</td>
            <td>{item.availableCore.vehicle.baggageQuantity}</td>
            <td>{item.availableCore.vehicle.carType}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default App;
