import "./employers-list.css";
import EmployersListItem from "../employers-list-item/employers-list-item";
import { ChangeEvent, FC, MouseEvent } from "react";

type Data = {
  name: string;
  salary: number;
  increase: boolean;
  id: number;
  rise: boolean;
};

interface IProps {
  data: Data[];
  onDelete: (id: Data["id"]) => void;
  onToggleProp: (id: Data["id"], prop: "rise" | "increase") => void;
  onSalaryChange: (id: Data["id"], value: Data["salary"]) => void;
}

const EmployersList: FC<IProps> = ({
  data,
  onDelete,
  onToggleProp,
  onSalaryChange,
}) => {
  const elements = data.map((item) => {
    const { id, ...itemProps } = item;

    const toggleProp: (
      e: MouseEvent<HTMLSpanElement | HTMLButtonElement>
    ) => void = (e) => {
      const targetVal = e.currentTarget.getAttribute("data-toggle");
      if (targetVal === "rise" || targetVal === "increase") {
        onToggleProp(id, targetVal);
      }
    };

    const changeSalary: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
      onSalaryChange(id, Number(e.target.value));
    };

    const deleteEmp: () => void = () => {
        onDelete(id);
    }

    return (
      <EmployersListItem
        key={id}
        {...itemProps}
        onDelete={deleteEmp}
        onToggleProp={toggleProp}
        onSalaryChange={changeSalary}
      />
    );
  });
  return <ul className="app-list list-group">{elements}</ul>;
};

export default EmployersList;
