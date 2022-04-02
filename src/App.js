import React, { useEffect, useState } from 'react';
import './App.css';
import Post from './Post';
import { db, auth } from './firebase';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import { Avatar } from '@material-ui/core'



const style = {
  position: 'absolute',
  top:'50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function App() {

  const[posts, setposts] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[user, setUser]= useState(null);
  const[openSignIn, setOpenSignIn]= useState(false);

  //because the state is not persistent, so this thing here, keeps me logged in.

  useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((authUser)=>{
    if(authUser)
    {
        console.log(authUser);
        setUser(authUser);
        if(authUser.displayName){

        }
        else{
          return authUser.updateProfile({
            displayName: username
          });
        }
    }
    else{
           setUser(null);
    }
  })

  return () => {
    unsubscribe();
  }

  },[user, username])

  useEffect(() => {
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setposts(snapshot.docs.map(doc=> ({
        id: doc.id,
        post:doc.data()
      })
        ));
    })
  }, []);

  const Signup = (event) => {
    event.preventDefault();

    auth.createUserWithEmailAndPassword(email, password).catch(
      (error) => alert(error.message)
    )

  }

  const Signin = (event) => {
    event.preventDefault();

    auth.signInWithEmailAndPassword(email, password).catch(
      (error) => alert(error.message)
    )

    setOpenSignIn(false);

  }

  

  return (
    <div className="App">
     
      
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
         <form className='app__signup'>
           <center>
            <img
              className='app__headerImage'
              src="http://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
         />
           </center>
            <Input
              type='text'
              placeholder='username'
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
         />

             <Input
             type='text'
             placeholder='Email'
             value={email}
             onChange={(e)=>setEmail(e.target.value)}
         />

             <Input
             type='text'
             placeholder='password'
             value={password}
             onChange={(e)=>setPassword(e.target.value)}
         />

             <Button type="submit" onClick={Signup}>Sign-up</Button>
          </form>
        </Box>
      </Modal>
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <Box sx={style}>
         <form className='app__signup'>
           <center>
            <img
              className='app__headerImage'
              src="http://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
         />
           </center>

             <Input
             type='text'
             placeholder='Email'
             value={email}
             onChange={(e)=>setEmail(e.target.value)}
         />

             <Input
             type='text'
             placeholder='password'
             value={password}
             onChange={(e)=>setPassword(e.target.value)}
         />

             <Button type="submit" onClick={Signin}>Sign-in</Button>
          </form>
        </Box>
      </Modal>
      <div className="app__header">
        <img
        className='app__headerImage'
        src="http://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        />
          {
       user ? (
      <div className='signed__in'>
        <Avatar
      className='display__avatar'
      src='/static/images/avatar/1.jpg'
      />
       <p className='loginname'>{user.displayName}</p>
       <Button onClick= {() => auth.signOut()}>Logout</Button>
       </div>
       ) :

        (
        <div className='app__loginContainer'>
        <Button onClick={() => setOpenSignIn(true)}>Sign in</Button>
        <Button onClick={handleOpen}>Sign up</Button>
        </div>
        )
     }
      </div>

     
   

      <div className='postcontainer'>
     {
       posts.map(({id, post}) => (
         <Post 
         key={id}
         postId={id}
         user={user}
         username={post.username}
         imageUrl={post.imageUrl}
         caption={post.caption}/>
       )
        )
     }
     </div>


{user?.displayName ? (<ImageUpload username={user.displayName}/>) : (<h3>You need to login</h3>)}
    
    </div>
  );
}

export default App;
