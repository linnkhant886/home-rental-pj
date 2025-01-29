"use client";

import { IconType } from "react-icons";
import { MdCabin } from "react-icons/md";

import { TbCaravan, TbTent, TbBuildingCottage } from "react-icons/tb";

import { GiWoodCabin, GiMushroomHouse } from "react-icons/gi";
import { PiWarehouse, PiLighthouse, PiVan } from "react-icons/pi";

import { GoContainer } from "react-icons/go";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";

export type Category = {
  label: CategoryLabel;
  icon: IconType;
};

export type CategoryLabel =
  | "cabin"
  | "tent"
  | "airstream"
  | "cottage"
  | "container"
  | "caravan"
  | "tiny"
  | "magic"
  | "warehouse"
  | "lodge";

export const categories: Category[] = [
  {
    label: "cabin",
    icon: MdCabin,
  },
  {
    label: "airstream",
    icon: PiVan,
  },
  {
    label: "tent",
    icon: TbTent,
  },
  {
    label: "warehouse",
    icon: PiWarehouse,
  },
  {
    label: "cottage",
    icon: TbBuildingCottage,
  },
  {
    label: "magic",
    icon: GiMushroomHouse,
  },
  {
    label: "container",
    icon: GoContainer,
  },
  {
    label: "caravan",
    icon: TbCaravan,
  },

  {
    label: "tiny",
    icon: PiLighthouse,
  },
  {
    label: "lodge",
    icon: GiWoodCabin,
  },
];

export default function CategoriesInput({ category }: { category: string }) {
  const defaultCategory =
    categories.find((item) => item.label === category)?.label ||
    categories[0].label;
  return (
    <div className="space-y-2">
      <Label className="capitalize ">Categories </Label>
      <Select defaultValue={defaultCategory} name="category" required>
        <SelectTrigger id="category">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {categories.map((item: Category) => (
            <SelectItem key={item.label} value={item.label}>
              <span className="flex">
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
