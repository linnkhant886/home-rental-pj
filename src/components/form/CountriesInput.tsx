import countries from "world-countries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
const formattedCountries = countries.map((item) => ({
  code: item.cca2,
  name: item.name.common,
  flag: item.flag,
  location: item.latlng,
  region: item.region,
}));

// const findCountryByCode = (code: string) =>
//   formattedCountries.find((item) => item.code === code);

export default function CategoriesInput() {
  return (
    <div className="space-y-2">
      <Label className="capitalize ">Country </Label>
      <Select defaultValue={formattedCountries[0].name} name="country" required>
        <SelectTrigger id="country">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {formattedCountries.map((country) => (
            <SelectItem key={country.code} value={country.name}>
              <div className=" flex items-center gap-2">
                <span>{country.flag}</span>
                {country.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
