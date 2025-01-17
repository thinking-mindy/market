import {Grid,Dialog,Container,Typography,Stack,DialogActions,TextField,Paper,Rating,DialogContentText,Link,DialogContent,Tooltip, DialogTitle,Box,Card,Button,Divider,Collapse,CardMedia,IconButton,CardContent,CardActions, Backdrop} from '@mui/material';
import { useState,useEffect } from 'react';
import {CommentOutlined, Add, ShareOutlined, ShoppingCartOutlined,SettingsOutlined, DeleteOutline, EditNoteOutlined} from '@mui/icons-material'
import axios from 'axios';
import { useRouter } from 'next/router';

const Home = () => {
  const go=useRouter();
  const [openR, setOpenR] = useState(false);const [addr,setAddr]=useState<string>();const [uname,setUname]=useState<string>();
  const [rating,setRating]=useState<number|null>();const handleCloseS2=()=>{setOpenR(false);setAddr("");setRating(0);setUname("")}
  const [capp,setApp]=useState<string>();const [projects, setProjects] = useState<any>([]);const [rsv, setRsv] = useState<any>([]);
  const [openAdmin, setAdmin] = useState(false);const [aname,setAname]=useState<string>();const [apass,setApass]=useState<string>();
  const [seller,setSeller]=useState<any>();

  const handleCloseAdmin=()=>{setAdmin(false);setAname("");setApass("")}

  const onFeedB=async()=>{
    const userR={user:uname,comment:addr,rating,app:capp}
    setOpenR(false);setAddr("");setRating(0);setUname("");
    await axios.post('your_api_url/updatecomments',userR).then(()=>{getProjects("")}).catch(()=>{console.log("none")})
  }

  const onAdmin=async()=>{
    const userR={user:uname,comment:addr,rating,app:capp}
    setOpenR(false);setAddr("");setRating(0);setUname("");
    await axios.post('your_api_url/updatecomments',userR).then(()=>{getProjects("")}).catch(()=>{console.log("none")})
  }
  
  const getProjects=async(a:any)=>{
    await axios.post('your_api_url/gseller',{a}).then((res)=>{setProjects(res.data.data);setRsv(res.data.data);}).catch(()=>{console.log("none")})
  }

  const onSearch=(event:any)=>{
    if(event.target.value){
    let stxt=event.target.value.split(' ');
    let tmpres:any=[]
    let result:any=[]

    projects.forEach((x:any)=>{
      let sc=x.title+x.des; let rate=0;
      stxt.forEach((s:string)=>{
        if(sc.toLowerCase().match(s.toLowerCase())){rate=rate+1}
      })
      tmpres.push({rate:rate,prod:x})
    })
    tmpres.sort((a:any,b:any)=>parseInt(b.rate)-parseInt(a.rate));

    tmpres.forEach((z:any)=>{if(z.rate){result.push(z.prod)}})
    setProjects(result);

  }else{
    setProjects(rsv)
  }
  }

  useEffect(()=>{
    getProjects(go.query.aname);
    setSeller(go.query.aname);
    localStorage.setItem("seller",seller)
  },[go.query])

  const Cardy=(props:any)=>{
    const [collapse, setCollapse] = useState<boolean>(false);
    const [cimg, setCimg] = useState<any>(props.img?.split("=>"));
    const handleRemove=async(id:any)=>{
      await axios.post('your_api_url/rmproduct',{id}).then((res)=>{getProjects(seller||localStorage.getItem("seller"))}).catch(()=>{console.log("none")})
    }
    
    return(
      <Card >
        <Link onClick={()=>{go.push({pathname:'/sales/edit',query:{id:props.id}})}}>
          <CardMedia sx={{height:'5.5625rem'}} image={cimg?.length?cimg[0]:'/images/cards/background-user.png'} /></Link>
        <Grid container display='flex' flexDirection='row' alignItems='center' justifyItems='center' spacing={1} p={2}>
          <Grid item xs={6} md={12}>
            <Typography variant='body2' sx={{fontWeight:800}}>{props.title}</Typography>
            <Typography variant='body2'>{props.des.slice(0,30)}{props.des.length>30&&'...'}</Typography>
          </Grid>
          <Grid item xs={6} md={12}>
            <Typography variant='body2' sx={{fontWeight:800}}>Price: {props.cur}{props.price}</Typography>
          </Grid>
        </Grid>
        <Grid container flexDirection='row'>
          <Grid item><Rating readOnly precision={0.1} value={props.rating}/></Grid>
          <Grid item><Typography variant='body2' sx={{fontWeight:800}}>{props.rating}</Typography></Grid>
        </Grid>
        <Grid container flexDirection='row'  alignItems='center' justifyItems='center' spacing={1} mb={2}>
        <Grid item><Tooltip title="Remove"><IconButton size="small" color="primary" onClick={()=>{handleRemove(props.id)}}><DeleteOutline/></IconButton></Tooltip></Grid>
        <Grid item><Tooltip title="Edit"><IconButton size="small" color="primary" onClick={()=>{go.push({pathname:'/sales/edit',query:{id:props.id}})}} href={props.code}><EditNoteOutlined/></IconButton></Tooltip></Grid>
        <Grid item><Tooltip title="Share"><IconButton size="small" color="primary" href={props.download}><ShareOutlined/></IconButton></Tooltip></Grid>
        </Grid>
    </Card>
    )
  }
  
 
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant='h5' sx={{fontWeight:800}}>MANAGE YOUR PRODUCTS</Typography>
      </Grid>
      <Grid item xs={12} md={12}>
        <Grid container display='flex' flexDirection='row' spacing={2}  alignItems='center' justifyContent='space-between'>
          <Grid item xs={12} md={8}>
            <TextField type='search' onChange={onSearch} focused fullWidth variant='filled' label="Search a product..." placeholder="Search a specific product...."/>
          </Grid>

          <Grid item xs={12} md={4}>
            <Tooltip title="Add My Product In the market">
              <Button color="primary" startIcon={<Add/>} onClick={()=>{go.push('/sales/reg')}}>Add</Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid> 
      {projects.map((x:any)=>(
      <Grid key={x.id} item xs={12} sm={6} md={2.4}>
        <Cardy id={x.id} title={x.title} des={x.des} cur={x.cur} price={x.price} rating={x.rating} code={x.code} download={x.down} img={x.img}/>
      </Grid>
      ))}

      <Dialog
        open={openR}
        sx={{ backdropFilter: "blur(2px)" }}
        onClose={handleCloseS2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" color="textSecondary" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          {`Comment on ${capp} app`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Container>
              <Stack mb={5} direction="row" alignItems="center" justifyContent="center">
                <Typography variant="body2" gutterBottom>
                  Hey again, kindly drop your comment below
                </Typography>
              </Stack>
              <Paper sx={{ padding: 2, marginTop: 1, marginBottom: 1 }}>
                <Stack direction="column" alignItems="center" justifyContent="center" mb={5}>
                  <TextField
                    fullWidth
                    value={uname}
                    onChange={(event) => { setUname(event.target.value); }}
                    variant="filled"
                    sx={{ marginTop: 1, marginBottom: 2 }}
                    autoComplete="uname"
                    type="text"
                    label="Username(Leave empty for anonymous review)"
                  />
                  <TextField
                    fullWidth maxRows={3} multiline
                    value={addr}
                    onChange={(event) => { setAddr(event.target.value); }}
                    variant="filled"
                    sx={{ marginTop: 1, marginBottom: 2 }}
                    autoComplete="comment"
                    type="text"
                    label="Comments on our service"
                    error={!addr}
                    helperText={addr ? "" : "Kindly give us reviews."}
                  />
                  <Stack alignItems="center" justifyContent="center">
                    <Typography component="h5">Rating</Typography>
                    <Rating
                      name="simple-controlled"
                      value={rating} precision={0.5}
                      onChange={(event, v: number | null) => { setRating(v) }}
                    />
                  </Stack>
                </Stack>
              </Paper>
            </Container>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={!(addr&&rating)?true:false} variant="text" color="primary" onClick={onFeedB}>Submit</Button>
          <Button variant="text" color="error" onClick={handleCloseS2}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openAdmin}
        sx={{ backdropFilter: "blur(2px)" }}
        onClose={handleCloseAdmin}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" color="textSecondary" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          {`Login as Seller`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Container>
              <Stack mb={5} direction="row" alignItems="center" justifyContent="center">
                <Typography variant="body2" gutterBottom>
                  Hello, i'm Veela, kindly provide the details below, so i can identify you. 
                </Typography>
              </Stack>
              <Paper sx={{ padding: 2, marginTop: 1, marginBottom: 1 }}>
                <Stack direction="column" alignItems="center" justifyContent="center" mb={5}>
                  <TextField
                    fullWidth
                    value={aname}
                    onChange={(event) => { setAname(event.target.value); }}
                    variant="filled"
                    sx={{ marginTop: 1, marginBottom: 2 }}
                    autoComplete="uname"
                    type="text"
                    error={!aname}
                    label="Username"
                    helperText={aname ? "" : "Enter your password."}
                  />
                  <TextField
                    fullWidth maxRows={3} multiline
                    value={apass}
                    onChange={(event) => { setApass(event.target.value); }}
                    variant="filled"
                    sx={{ marginTop: 1, marginBottom: 2 }}
                    autoComplete="comment"
                    type="text"
                    label="Enter your password"
                    error={!apass}
                    helperText={apass ? "" : "Enter your password."}
                  />
                </Stack>
              </Paper>
            </Container>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={!(apass&&aname)?true:false} variant="text" color="primary" onClick={onAdmin}>Login</Button>
          <Button variant="text" color="error" onClick={handleCloseAdmin}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default Home
