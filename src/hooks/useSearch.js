import { useMemo } from 'react';

const useSearch = (searchValue, data) => {
  return useMemo(() => {
    return data?.filter(
      item =>
        item.userName.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [data, searchValue]);
};

export default useSearch;
