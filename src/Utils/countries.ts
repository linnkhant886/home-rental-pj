import countries from 'world-countries';

export const formattedCountries = countries.map((item) => {
  return {
    code: item.cca2,
    name: item.name.common,
    flag: item.flag,
    location: item.latlng,
    region: item.region,
  };
});

export const findCountryByCode = (code: string) => {
  return formattedCountries.find((item) => item.code === code);
};

export const findCountryByName = (name: string) => {
    return formattedCountries.find(
      (item) => item.name === name
    );
  };


  export const formatCurrency = (amount: number | null) => {
    const value = amount || 0;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  