import type { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCity, filtersActions } from "../../filters/model/filtersSlice";
import { CityFilterUI } from "./cityFilterUI";
import mockdata from "../../../api/mockData.json";

export const CityFilter: FC = () => {
  const dispatch = useDispatch();
  const selectedCities = useSelector(selectCity);

  const handleChange = (selectedCity: string) => {
    if (selectedCities.includes(selectedCity)) {
      dispatch(filtersActions.removeCity(selectedCity));
    } else {
      dispatch(filtersActions.addCity(selectedCity));
    }
  };

  return <CityFilterUI cities={mockdata.cities} value={selectedCities} onChange={handleChange} />;
};
