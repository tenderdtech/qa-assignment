import { useEffect, useState } from "react";
import EquipmentTable from "./components/EquipmentTable";

export default function App() {
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    fetch("/api/get-equipment")
      .then(res => res.json())
      .then(setEquipment);
  }, []);

  return (
    <div>
      <h1>Tenderd Equipment Tracker</h1>
      <EquipmentTable data={equipment} />
    </div>
  );
}