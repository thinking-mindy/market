// ** React Import
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import Link from 'next/link'

// ** Third Party Imports
import { usePopper } from 'react-popper'

const BuyNowButton = () => {
  // ** States
  const [open, setOpen] = useState(false)
  const [popperElement, setPopperElement] = useState(null)
  const [referenceElement, setReferenceElement] = useState(null)

  const { styles, attributes, update } = usePopper(referenceElement, popperElement, {
    placement: 'top-end'
  })

  const handleOpen: any = () => {
    setOpen(true)
    update ? update() : null
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Box
      className='upgrade-to-pro-button mui-fixed'
      sx={{ right: theme => theme.spacing(30), bottom: theme => theme.spacing(10), zIndex: 11, position: 'fixed' }}
    >
      <Button
        component='a'
        target='_blank'
        variant='contained'
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        ref={(e: any) => setReferenceElement(e)}
        href='https://www.paynow.co.zw/Payment/Link/?q=c2VhcmNoPXRhbGVudGphaHRhbGUlNDBnbWFpbC5jb20mYW1vdW50PTUwMDAuMDAmcmVmZXJlbmNlPURvbmF0aW9ucyZsPTA%3d'
        sx={{
          backgroundColor: 'primary.main',
          boxShadow: '0 1px 20px 1px primary.main',
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: 'primary.main'
          }
        }}
      >
        <VolunteerActivismIcon />
      </Button>
      <Fade in={open} timeout={700}>
        <Box
          style={styles.popper}
          ref={setPopperElement}
          {...attributes.popper}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
          sx={{ pb: 4, minWidth: theme => (theme.breakpoints.down('sm') ? 400 : 300) }}
        >
          <Paper elevation={9} sx={{ borderRadius: 1, overflow: 'hidden' }}>
            <Link
              target='_blank'
              rel='noreferrer'
              href='https://www.paynow.co.zw/Payment/Link/?q=c2VhcmNoPXRhbGVudGphaHRhbGUlNDBnbWFpbC5jb20mYW1vdW50PTUwMDAuMDAmcmVmZXJlbmNlPURvbmF0aW9ucyZsPTA%3d'
            >
              <img width='100%' alt='thevalley' src='/images/apple-touch-icon.png' />
            </Link>
            <CardContent>
              <Typography sx={{ mb: 4 }} variant='h6'>
                Donate to help us finance the help of those in need
              </Typography>
              <Typography sx={{ mb: 4 }} variant='body2'>
                This donation is not for our own benefit but for the help of those in need, especially kids
                who can&prime;t afford Tuition. You aren&prime;t expected to pay, you can get any help here
                for free but if you have an extra $1 and you are willing then go on to donate.
              </Typography>
              <Typography sx={{ mb: 4 }} variant='body2'>
                Click the button below to donate
              </Typography>
              <Button
                component='a'
                sx={{ mr: 4 }}
                target='_blank'
                variant='contained'
                href='https://www.paynow.co.zw/Payment/Link/?q=c2VhcmNoPXRhbGVudGphaHRhbGUlNDBnbWFpbC5jb20mYW1vdW50PTUwMDAuMDAmcmVmZXJlbmNlPURvbmF0aW9ucyZsPTA%3d'
              >
                Donate
              </Button>
              <Button
                component='a'
                target='_blank'
                variant='outlined'
                href='/to/joinus'
              >
                Join US
              </Button>
            </CardContent>
          </Paper>
        </Box>
      </Fade>
    </Box>
  )
}

export default BuyNowButton
