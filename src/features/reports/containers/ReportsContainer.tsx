import { ReportsProvider } from '../context/Reports.context';
import ReportsFilters from '../components/ReportsFilters';

const ReportsContainer = () => {
  return (
    <ReportsProvider>
      <ReportsFilters />
    </ReportsProvider>
  );
};

export default ReportsContainer;
