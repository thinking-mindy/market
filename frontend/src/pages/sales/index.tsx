import {Grid,Dialog,Container,Typography,Stack,DialogActions,TextField,Paper,Rating,DialogContentText,Link,DialogContent,Tooltip, DialogTitle,Box,Card,Button,Divider,Collapse,CardMedia,IconButton,CardContent,CardActions, Backdrop, Alert, FormControl, InputLabel, Select, MenuItem, Chip, Popover} from '@mui/material';
import { useState,useEffect } from 'react';
import {CommentOutlined, Add, ShareOutlined, ShoppingCartOutlined,SettingsOutlined, ViewModule, InfoOutlined} from '@mui/icons-material'
import axios from 'axios';
import { useRouter } from 'next/router';
import Head from 'next/head';

const Home = () => {
  const go=useRouter();
  const [openR, setOpenR] = useState(false);const [addr,setAddr]=useState<string>();const [uname,setUname]=useState<string>();
  const [rating,setRating]=useState<number|null>();const handleCloseS2=()=>{setOpenR(false);setAddr("");setRating(0);setUname("")}
  const [capp,setApp]=useState<string>();const [projects, setProjects] = useState<any>([]);const [rsv, setRsv] = useState<any>([]);
  const [openAdmin, setAdmin] = useState(false);const [aname,setAname]=useState<string>();const [apass,setApass]=useState<string>();
  const [aerr, setAerr] = useState(false);const [fcat, setFcat] = useState<string>("all")

  const handleCloseAdmin=()=>{setAdmin(false);setAname("");setApass("")}

  const onFeedB=async()=>{
    const userR={id:capp,comment:addr,uname:uname,rating:rating?.toString()}
    setOpenR(false);setAddr("");setRating(0);setUname("");
    await axios.post('your_api_url/addcomment',userR).then(()=>{alert("Comment successfully send")}).catch(()=>{console.log("none")})
  }

  const onAdmin=async()=>{
    const userR={user:aname,pass:apass}
    setAdmin(false);setApass("");setAname("");
    await axios.post('your_api_url/vseller',userR).then((res)=>{
      console.log(res.data)
      if(res.data.aye){setAdmin(false);setApass("");setAname("");go.push({pathname:'/sales/manage',query:{aname:userR.user}})}else{setAerr(true)}
   }).catch(()=>{console.log("none")})
  }
  
  const getProjects=async()=>{
    await axios.get('your_api_url/getsales').then((res)=>{setProjects(res.data.data);setRsv(res.data.data);}).catch(()=>{console.log("none")})
  }

  const onSearch=(event:any)=>{
    if(event.target.value){
    let stxt=event.target.value.split(' ');
    let tmpres:any=[]
    let result:any=[]

    projects.forEach((x:any)=>{
      let sc=x.title+x.des; let rate=0;
      stxt.forEach((s:string)=>{if(sc.toLowerCase().match(s.toLowerCase())){rate=rate+1}})
      tmpres.push({rate:rate,prod:x})
    })
    tmpres.sort((a:any,b:any)=>parseInt(b.rate)-parseInt(a.rate));
    tmpres.forEach((z:any)=>{if(z.rate){result.push(z.prod)}})
    setProjects(result);
  }else{setProjects(rsv);setFcat("all")}
  }

  const onFilterByCat=(fcat:any)=>{
    if(fcat!=='all'){
      let result=rsv.filter((x:any)=>x.state===fcat)
      setProjects(result);
    }else{
      setProjects(rsv)
    }
  }

  useEffect(()=>{
    getProjects();
   
  },[])

  const Cardy=(props:any)=>{

    const handleComment=(appname:string)=>{setApp(appname);setOpenR(true);}
    const [cimg, setCimg] = useState<any>(props.img?.split("=>"));
    const [cpos, setCpos] = useState<number>(0);

    setInterval(()=>{
      if(cpos<cimg?.length-1){
        setCpos(cpos+1)
      }else{
        setCpos(0)
      }
    },5000)

    
    return(
      <Card>
        <Link onClick={()=>{go.push({pathname:'/sales/app',query:{id:props.id}})}}>
          <CardMedia sx={{height:'5.5625rem',animation:'ease-in'}} image={cimg?.length?cimg[cpos]:'/images/cards/background-user.png'} /></Link>
        <Grid container display='flex' flexDirection='row' alignItems='center' justifyItems='center' spacing={0} p={2}>
          <Grid item xs={12} md={12}>
            <Typography variant='body2' sx={{fontWeight:800}}>{props.title}<Chip label={props.state} sx={{ml:2}} variant='outlined' clickable color='primary'/></Typography>
            <Typography variant='body2'>{props.des.slice(0,30)}{props.des.length>30&&'...'}</Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant='body2' sx={{fontWeight:800}}>Price: ${`${props.price} ${props.cur.toUpperCase()}`}</Typography>
          </Grid>
        </Grid>
        <Grid container flexDirection='row'>
          <Grid item><Rating readOnly precision={0.1} value={props.rating}/></Grid>
          <Grid item><Typography variant='body2' sx={{fontWeight:800}}>{props.rating}</Typography></Grid>
        </Grid>
        <Grid container flexDirection='row'  alignItems='center' justifyItems='center' spacing={1} mb={2}>
        <Grid item><Tooltip title="View"><IconButton size="small" color="primary" onClick={()=>{go.push({pathname:'/sales/app',query:{id:props.id}})}}><InfoOutlined/></IconButton></Tooltip></Grid>
        <Grid item><Tooltip title="Comment"><IconButton size="small" color="primary" onClick={()=>{handleComment(props.id)}}><CommentOutlined/></IconButton></Tooltip></Grid>
        <Grid item><Tooltip title="Buy"><IconButton size="small" color="primary" href={`https://wa.me/${props.number}?text=Good day, i would like to purchase ${props.title}`}><ShoppingCartOutlined/></IconButton></Tooltip></Grid>
        <Grid item><Tooltip title="Share"><IconButton size="small" color="primary" href={`https://wa.me/?text=Hey, did you see this product: https://thinkingminds.co.zw/sales/app/?id=${props.id}`}><ShareOutlined/></IconButton></Tooltip></Grid>
        </Grid>
    </Card>
    )
  }
  
 
  return (
    <>
    <Head>
      <title>Sales Market</title>
    </Head>
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant='h5' sx={{fontWeight:800}}>MARKETPLACE</Typography>
        <Typography variant='body2'>
          This our <Link>Open-Source</Link> selling community, where everyone is welcome to sell and market their product.
        </Typography>
        
      </Grid>
      <Grid item xs={12} md={12}>
        <Grid container display='flex' flexDirection='row' spacing={2}  alignItems='center' justifyContent='space-between'>
          <Grid item xs={12} md={2}>
            <FormControl sx={{m:1,minWidth:150 }} fullWidth variant="filled">
                <InputLabel id="demo-simple-select-error-label">Filter by category</InputLabel>
                <Select value={fcat} defaultValue='all' autoWidth placeholder="Idea or Beta or Alpha or Other" label="Status:" onChange={(event)=>{setFcat(event.target.value);onFilterByCat(event.target.value)}}>
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="service">Service</MenuItem>
                    <MenuItem value="software">Software</MenuItem>
                    <MenuItem value="food">Food</MenuItem>
                    <MenuItem value="clothes">Clothes</MenuItem>
                    <MenuItem value="footwear">Footwear</MenuItem>
                    <MenuItem value="tools">Tools</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField type='search' onChange={onSearch} focused fullWidth variant='filled' label="Filter by product name..." placeholder="Search a specific product...."/>
          </Grid>

          <Grid item xs={12} md={4}>
            <Tooltip title="Add My Product In the market">
              <Button color="primary" startIcon={<Add/>} onClick={()=>{go.push('/sales/reg')}}>New</Button>
            </Tooltip>
            <Tooltip title="Manage my products">
              <Button color="primary" startIcon={<SettingsOutlined/>} onClick={()=>{setAdmin(true)}}>Manage</Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid> 
      {projects.map((x:any)=>(
      <Grid key={x.id} item xs={12} sm={6} md={2.4}>
        <Cardy id={x.id} title={x.title} des={x.des} state={x.state} cur={x.cur} price={x.price} rating={parseFloat(x.rating)} number={x.number} img={x.img}/>
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
          {`Your experience with this product or seller`}
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
              {
                aerr&&<Alert><Typography variant='body2' >Error loggin in, kindly check your details and try again.</Typography></Alert>
              }
            </Container>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={!(apass&&aname)?true:false} variant="text" color="primary" onClick={onAdmin}>Login</Button>
          <Button variant="text" color="error" onClick={handleCloseAdmin}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Grid>
    </>
  )
}

export default Home
