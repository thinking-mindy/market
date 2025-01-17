import Head from 'next/head';
import { Container,Stack,Paper,Typography,TextField,Button,FormControl,InputLabel,MenuItem,Select,Dialog, DialogActions, DialogContentText, DialogContent, DialogTitle, Alert, AlertTitle, Box, Grid} from '@mui/material'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Reg = () => {
  const go=useRouter();
  const [title,setTitle]=useState<string>("");const [des,setDes]=useState<string>("");const [id,setId]=useState<string>("");
  const [state,setState]=useState<string>("software");const [img,setImg]=useState<any>([]);const [uname,setUname]=useState<string>("");
  const [pass,setPass]=useState<string>("");const [name,setName]=useState<string>("");const [number,setNumber]=useState<string>("");
  const [addr,setAddr]=useState<string>("");const [price,setPrice]=useState<string>("");const [currency,setCurrency]=useState<string>("usd");
  const [pass1,setPass1]=useState<string>("");

  const [open, setOpen]=useState<boolean>(false);const [openS, setOpenS]=useState<boolean>(false);
  const handleClose=()=>{setOpen(false);};const handleCloseS=()=>{setOpenS(false);}
  const onConfirm=async()=>{
    if(title&&des&&addr&&number&&name&&state&&uname&&pass&&pass1){
      setOpenS(true);
      const myWeb={id,title,des,state,img:img.join("=>"),uname,pass,pass1,name,number,addr,price,cur:currency}
      setTitle("");setDes("");setState("software");setImg([]);setUname("");setPass("");setPass1("");setName("");setNumber("");setAddr("");setPrice("");setCurrency("");
      await axios.post('your_api_url/uproduct',myWeb)
        .then((res)=>{console.log('success');go.back()})
        .catch(()=>{console.log("error")})
    } else{setOpen(true)}

  }

  const [limErr, setLimErr]=useState<boolean>(false);

  const onChange = (file:any) => {
    if(img.length<4){
      const reader = new FileReader()
      const { files } = file.target
      if (files && files.length !== 0) {
        reader.onload = () => setImg((p:any)=>[...p,reader.result])
        console.log(img)
        reader.readAsDataURL(files[0])
      }
    }else{setLimErr(true)}
    
  }
  const getDetails=async(a:any)=>{
    await axios.post('your_api_url/gproduct',{id:a})
        .then((res)=>{
          const data=res.data.data;
          setId(data.id);setTitle(data.title);setDes(data.des);setState(data.state);setImg(data.img.split("=>"));setUname(data.uname);setPass(data.pass);
          setPass1(data.pass1);setName(data.name);setNumber(data.number);setAddr(data.addr);setPrice(data.price);setCurrency(data.cur);
        })
        .catch(()=>{console.log("error")})
  }

  useEffect(()=>{
    getDetails(go.query.id)
  },[go.query])

  return(
    <>
    <Head><title>Edit Product</title></Head>
      <Container>
        <Stack mt={5} direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h5" gutterBottom>
            Edit Product
          </Typography>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="body2" gutterBottom>
            Market your products for free.
          </Typography>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="body2" gutterBottom>
            <b>WARNING:</b> If you add scam or illegal products, you will be blocked and The Thinking Pen-Testers will hunt you down and hurt you.
          </Typography>
        </Stack>

        <Paper sx={{padding:5,marginTop:5,marginBottom:3}}>
          <Stack direction="column" alignItems="center" justifyContent="center" mb={5}>
          <Stack sx={{width:"100%"}} direction="row" alignItems="stretch" justifyContent="space-between" mb={5} p={1} alignSelf="flex-start">
              <TextField
                fullWidth
                sx={{margin:1}}
                value={name}
                onChange={(event)=>{setName(event.target.value);}}
                variant="filled"
                autoComplete="name"
                type="text"
                label="Company/Full Name"
                error={!name}
                helperText={name ? "" : "Please provide your Company name/ Your Full name."}
              />
              <TextField
                fullWidth
                sx={{margin:1}}
                value={number}
                multiline
                onChange={(event)=>{setNumber(event.target.value);}}
                variant="filled"
                autoComplete="address"
                type="number"
                label="Whatsapp/Call Number"
                error={!number}
                helperText={number ? "" : "Please provide your mobile number."}
              />
          </Stack>

          <TextField
            fullWidth
            value={addr}
            multiline
            onChange={(event)=>{setAddr(event.target.value);}}
            variant="filled"
            sx={{ marginTop: 1, marginBottom: 7}}
            autoComplete="address"
            type="text"
            label="Your Address"
            error={!addr}
            helperText={addr ? "" : "Please provide your physical address."}
          />
          <Stack sx={{width:"100%"}} direction="row" alignItems="stretch" justifyContent="space-between" mb={5} p={1} alignSelf="flex-start">
              <TextField
                fullWidth
                sx={{margin:1}}
                value={title}
                onChange={(event)=>{setTitle(event.target.value);}}
                variant="filled"
                autoComplete="name"
                type="text"
                label="Product Name"
                error={!title}
                helperText={title ? "" : "Please provide your product name."}
              />
              <TextField
                sx={{margin:1}}
                value={price}
                onChange={(event)=>{setPrice(event.target.value);}}
                variant="filled"
                autoComplete="name"
                type="number"
                label="Price"
                error={!price}
                helperText={price? "" : "Please provide your product price."}
              />
              <FormControl sx={{m:1,minWidth:150 }} variant="filled">
              <InputLabel id="demo-simple-select-error-label">Currency</InputLabel>
              <Select error={!currency} value={currency} autoWidth placeholder="USD, ZWG, etc" label="Currency" onChange={(event)=>{setCurrency(event.target.value);}}>
                  <MenuItem value="usd">USD</MenuItem>
                  <MenuItem value="zwg">ZWG</MenuItem>
              </Select>
          </FormControl>
          <FormControl sx={{m:1,minWidth:150 }} variant="filled">
              <InputLabel id="demo-simple-select-error-label">Product Status:</InputLabel>
              <Select error={!state} value={state} autoWidth placeholder="Idea or Beta or Alpha or Other" label="Status:" onChange={(event)=>{setState(event.target.value);}}>
                  <MenuItem value="software">Software</MenuItem>
                  <MenuItem value="service">Service</MenuItem>
                  <MenuItem value="food">Food</MenuItem>
                  <MenuItem value="clothes">Clothes</MenuItem>
                  <MenuItem value="footwear">Footwear</MenuItem>
                  <MenuItem value="tools">Tools</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
              </Select>
          </FormControl>
          </Stack>
          <TextField
            fullWidth multiline maxRows={3}
            value={des}
            onChange={(event)=>{setDes(event.target.value);}}
            variant="filled"
            sx={{ marginTop: 1, marginBottom: 10}}
            autoComplete="description"
            type="text"
            label="Product Description"
            error={!des}
            helperText={des?"":"Please provide your description"}
          />
            <Grid container sx={{ display: 'flex', alignItems: 'center',marginY:5 }}>

              {img.map((x:any)=><Grid item><img style={{width: 120,height: 120,marginRight: 2,borderRadius: 5}} src={x} alt='Product Pictures' /></Grid>)}
              <Grid item>
                <Button component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Edit product photos
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    multiple
                    id='account-settings-upload-image'
                  />
                </Button>
                <Button color='error' variant='outlined' onClick={() => setImg([])}>
                  Remove all
                </Button>
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K. Max number of 4.
                </Typography>
              </Grid>
            </Grid>
          <Alert>
            <AlertTitle>NOTICE</AlertTitle>
            <Typography variant='body2'>Kindly note that these details are important and should not be shared. If you don't have an account one will automatically be created for you and if you already have one, the product will be added to your existing account.</Typography>
          </Alert>

          <Paper sx={{padding:5,marginTop:5,marginBottom:3}}>
          <TextField
                fullWidth
                sx={{margin:1}}
                value={uname}
                onChange={(event)=>{setUname(event.target.value);}}
                variant="filled"
                autoComplete="name"
                type="text"
                label="Username"
                error={!uname}
                helperText={uname?"":"Please provide your username"}
              />
          <Stack sx={{width:"100%"}} direction="row" alignItems="stretch" justifyContent="space-between" mb={5} p={1} alignSelf="flex-start">
              <TextField
                fullWidth
                sx={{margin:1}}
                value={pass}
                onChange={(event)=>{setPass(event.target.value);}}
                variant="filled"
                autoComplete="address"
                type="password"
                label="Password"
                error={!pass}
                helperText={pass?"":"Please provide your password."}
              />

              <TextField
                fullWidth
                sx={{margin:1}}
                value={pass1}
                onChange={(event)=>{setPass1(event.target.value);}}
                variant="filled"
                autoComplete="address"
                type="password"
                label="Confirm Password"
                error={!(pass1===pass)}
                helperText={!(pass1===pass)?"Passwords doesn't match":"Please provide your password."}
              />
          </Stack>
          </Paper>
          
          </Stack>
          <Stack mt={10} alignItems="center" justifyContent="flex-start">
            <Button sx={{width:'60%'}} variant="contained" onClick={onConfirm}>Update Product</Button>
          </Stack>
        </Paper>
        <Dialog
        open={open}
        sx={{backdropFilter: "blur(10px)"}}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Error
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You need to provide all the details.<br/><br/>
            <b>Kindly check if all the required details are provided.</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Okay</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openS}
        sx={{backdropFilter: "blur(10px)"}}
        onClose={handleCloseS}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Success
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your product has been succesfully added. Check out the market.<b/><b/>
            Thank you.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseS}>Okay</Button>
        </DialogActions>
      </Dialog>
      </Container>
    </>
  );
}

export default Reg