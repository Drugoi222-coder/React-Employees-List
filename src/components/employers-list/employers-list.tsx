import "./employers-list.css";
import EmployersListItem from "../employers-list-item/employers-list-item";
import { ChangeEvent, FC, MouseEvent } from "react";
import { Employee as Data } from "../../ts/interfaces";
import { togglingFilter } from "../../ts/types";

interface IProps {
  data: Data[];
  onDelete: (id: Data["id"]) => void;
  onToggleProp: (id: Data["id"], prop: togglingFilter) => void;
  onSalaryChange: (id: Data["id"], value: Data["salary"]) => void;
}

// Компонент со списком сотрудников
const EmployersList: FC<IProps> = ({
  data,
  onDelete,
  onToggleProp,
  onSalaryChange,
}) => {
  // Формирование массива сотрудников
  const elements = data.map((item) => {
    const { id, ...itemProps } = item;
    // Включение определенного свойства сотрудника (премирование/повышение)
    const toggleProp: (
      e: MouseEvent<HTMLSpanElement | HTMLButtonElement>
    ) => void = (e) => {
      const targetVal = e.currentTarget.getAttribute("data-toggle");
      if (targetVal === "rise" || targetVal === "increase") {
        onToggleProp(id, targetVal);
      }
    };
    // Отслеживание изменения зарплаты
    const changeSalary: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
      onSalaryChange(id, Number(e.target.value));
    };
    // Удаление сотрудника
    const deleteEmp: () => void = () => {
      onDelete(id);
    };

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
