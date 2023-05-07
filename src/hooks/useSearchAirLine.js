import { useMemo } from 'react';

const useSearchAirLine = (searchValue, data) => {
  return useMemo(() => {
    return data?.filter(
      item =>
        item.nameAirLine.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.country.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.city.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [data, searchValue]);
};

export default useSearchAirLine;
