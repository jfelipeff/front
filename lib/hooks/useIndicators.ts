import { useState, useEffect } from "react";

interface Indicator {
  value: string;
  label: string;
}

export default function useIndicators() {
  const [indicators, setIndicators] = useState<Indicator[]>([]);
  const [isIndicatorsListLoading, setLoading] = useState<boolean>(true);

  const fetchIndicators = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/query/all-indicators"
      );
      const indicators = await response.json();
      setIndicators(indicators);
    } catch (error: any) {
      throw new Error(`Failed to fetch indicators`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndicators();
  }, []);

  return { indicators, isIndicatorsListLoading };
}
