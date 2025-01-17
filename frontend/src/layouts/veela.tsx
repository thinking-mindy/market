
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { ChatBubble } from '@mui/icons-material';

const BuyNowButton = () => {

  return (
    <Box
      className='upgrade-to-pro-button mui-fixed'
      sx={{ right: theme => theme.spacing(11), bottom: theme => theme.spacing(10), zIndex: 11, position: 'fixed' }}
    >
      <Button
        component='a'
        target='_blank'
        variant='contained'
        href='https://www.paynow.co.zw/Payment/Link/?q=c2VhcmNoPXRhbGVudGphaHRhbGUlNDBnbWFpbC5jb20mYW1vdW50PTUwMDAuMDAmcmVmZXJlbmNlPURvbmF0aW9ucyZsPTA%3d'
        sx={{
          backgroundColor: '#ff3e1d',
          boxShadow: '0 1px 20px 1px #ff3e1d',
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: '#e6381a'
          }
        }}
      >
        <ChatBubble />
      </Button>
    </Box>
  )
}

export default BuyNowButton
