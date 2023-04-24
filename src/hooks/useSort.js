import { useMemo } from 'react';

const useSort = (options, data) => {
  const { searchValue, min, max } = options;

  return useMemo(() => {
    return data.filter(item => {
      if (min || max) {
        return (
          item.price >= Number(min) &&
          item.price <= Number(max) &&
          (item.country.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.city.toLowerCase().includes(searchValue.toLowerCase()))
        );
      } else {
        return (
          item.country.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.city.toLowerCase().includes(searchValue.toLowerCase())
        );
      }
    });
  }, [data, searchValue, min, max]);
};

export default useSort;
