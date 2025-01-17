import {Grid,Typography,Divider,CardContent,Paper, Button} from '@mui/material';
import { useState,useEffect} from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import CartPlus from 'mdi-material-ui/CartPlus';


const Home = () =>{
  const go=useRouter();
  const [app, setApp] = useState<any>({});

  const getDetails=async(a:any)=>{
    await axios.post('your_api_url/gproduct',{id:a})
        .then((res:any)=>{
          const data=res.data.data;
          setApp({title:data.title,des:data.des,state:data.state,img:data.img.split("=>"),name:data.name,number:data.number,addr:data.addr,price:data.price,cur:data.cur});
        })
        .catch(()=>{console.log("error")})
  }

  useEffect(() => {
    getDetails(go.query.id)
	}, [go.query]);

  return (
    <Paper sx={{padding:5}}>
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant='h5' sx={{fontWeight:800}}>{app.name}</Typography>
        <Divider />
      </Grid>
      <Grid item md={12}>
        <Grid container spacing={2}>
          {app.img?.map((x:any)=><Grid item><img style={{width: 220,height: 220,marginRight: 2,borderRadius: 5}} src={x} alt='Product Pictures' /></Grid>)}
        </Grid>
      </Grid>
      <Grid item md={6}>
        <Typography variant='h6' sx={{fontWeight:800}}>Product Details</Typography>
        <Divider />
        <CardContent>
          <Typography variant='body2'><b>Product name:</b> {app.title}</Typography>
          <Typography variant='body2'><b>Product description:</b> {app.des}</Typography>
          <Typography variant='body2'><b>Price:</b> ${`${app.price} ${app.cur}`}</Typography>
          <Typography variant='body2'><b>Catergory:</b> {app.state}</Typography>
        </CardContent>
      </Grid>
      <Grid item md={6}>
        <Typography variant='h6' sx={{fontWeight:800}}>Seller Details</Typography>
        <Divider />
        <CardContent>
          <Typography variant='body2'><b>Seller Name</b> {app.name||'None'}</Typography>
          <Typography variant='body2'><b>Phone number:</b> {app.number||'None'}</Typography>
          <Typography variant='body2'><b>Physical Address:</b> {app.addr||'None'}</Typography>
        </CardContent>
      </Grid>
      <Grid item md={12}>
        <Button variant="contained" startIcon={<CartPlus/>} href={`https://wa.me/${app.number}?text=Good day, i would like to purchase ${app.title}`}>Purchase this item</Button>
      </Grid>
    </Grid>
    </Paper>
  )
}

export default Home
