import { useState, useEffect } from "react";

export default function useCountries() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isCountryListLoading, setLoading] = useState<boolean>(true);

  const fetchCountries = async () => {
    try {
      const response = await fetch("http://localhost:4000/query/all-countries");
      const countries = await response.json();
      setCountries(countries);
    } catch (error: any) {
      throw new Error(`Failed to fetch countries`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return { countries, isCountryListLoading };
}
