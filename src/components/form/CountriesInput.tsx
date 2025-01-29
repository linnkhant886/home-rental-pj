import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import { formattedCountries } from "@/Utils/countries";

export default function CategoriesInput({ country }: { country: string }) {
  const defaultCountry =
    formattedCountries.find((c) => c.name === country)?.name ||
    formattedCountries[0].name;
  return (
    <div className="space-y-2">
      <Label className="capitalize ">Country </Label>
      <Select defaultValue={defaultCountry} name="country" required>
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
