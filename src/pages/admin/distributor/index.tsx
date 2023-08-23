import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAppBarTitle } from '@/redux/slices/app.slice';

import { AdminLayout } from '@/features/commons';
import DistributorsContainer from '@/features/distributor/containers/DistributorsContainer';
import { TITLE_MODULE_DISTRIBUTOR } from '@/constants/title.constants';

const DistributorsPage: React.FC = () => {
  const dispatcher = useDispatch();

  useEffect(() => {
    dispatcher(setAppBarTitle(TITLE_MODULE_DISTRIBUTOR));
  }, [dispatcher]);

  return (
    <AdminLayout>
      <DistributorsContainer />
    </AdminLayout>
  );
};

export default DistributorsPage;
