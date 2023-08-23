import { Box, Typography } from '@mui/material';
import Image from 'next/image';

export default function Logo1() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', my: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Image src="/img/logo-classic.png" alt="Logo" width={220} height={95} loading="lazy" />
      </Box>
    </Box>
  );
}
