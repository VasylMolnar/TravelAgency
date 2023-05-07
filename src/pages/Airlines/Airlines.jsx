import { useState, React } from 'react';
import Card from '../../components/Card/Card';
import { useSelector } from 'react-redux';
import {
  useGetAllAirLinesQuery,
  selectAllAirLines,
} from '../../features/airLine/airLineApiSlice';
import { Report, Loading } from 'notiflix';
import useSearchAirLine from '../../hooks/useSearchAirLine';
import Search from '../../components/Search/Search';

const Airlines = () => {
  //for user other style
  const [search, setSearch] = useState('');

  //fetch AirLine data used RTK Query
  const { isLoading, isSuccess, isError, error } = useGetAllAirLinesQuery();

  //select All AirLine
  const dataAllAirLine = useSelector(selectAllAirLines);

  //sort by SearchValue, Min, Max
  const sorterData = useSearchAirLine(search, dataAllAirLine);

  return (
    <main className="section airLine">
      <div className="container">
        <Search setSearch={setSearch} />

        {isLoading ? Loading.dots('Завантаження') : Loading.remove(300)}

        {sorterData.length === 0 ? (
          <div className="missing">
            <section className="section">
              <p className="title" style={{ color: 'red' }}>
                Список порожній
              </p>
            </section>
          </div>
        ) : (
          <>
            {error && (Report.failure('Error', `${error.data}`), Loading.remove())}

            {isSuccess && !isError && (
              <div className="content">
                {sorterData.map(airLine => (
                  <Card element={airLine} key={airLine.id} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Airlines;
