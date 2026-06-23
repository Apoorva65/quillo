import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { use, useEffect, useState } from 'react';
import { Box, TextField, Button, Typography,Divider } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Navbar from '../components/Navbar';
import { addPosts, getOnePost, updatePost } from '../api/posts';
import { useNavigate, useParams } from 'react-router-dom';

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    [{ header: 1 }, { header: 2 }, 'blockquote'],
    [{ list: 'bullet' }, { list: 'ordered' }],
    ['link', 'code-block'],
  ],
};

function EditPost({toggle,setToggle}) {

  const naviagte = useNavigate();
  const {id} = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  useEffect(()=>{
    async function fetchThisPost() {
        const post = await getOnePost(id);
        setTitle(post.title||'');
        setImage(post.image||'');
        setContent(post.content||'');
    }
    fetchThisPost();
  },[id])

  const handleUpdate = async () => {
      await updatePost(id,{title,image,content});
      setToggle(!toggle)
      naviagte('/my-posts')
  };

  return (
    <>
    <Navbar/>
    <Box sx={{ maxWidth: 680, margin: '0 auto', px: 3, py: 6 }}>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
          Writing as <strong>You</strong>
        </Typography>
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleUpdate}
          sx={{ borderRadius: 99, textTransform: 'none' }}
        >
          Publish
        </Button>
      </Box>

      <TextField
        fullWidth variant="standard" placeholder="Title"
        value={title} onChange={e => setTitle(e.target.value)}
        slotProps={{ input: { disableUnderline: true, style: { fontSize: '2rem', fontWeight: 600 } } }}
        sx={{ mb: 3 }}
      />

      <Divider sx={{ mb: 3 }} />

      {/* <Box
        component="label"
        sx={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          border: '1px dashed', borderColor: 'divider', borderRadius: 2,
          py: 3, mb: 3, cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' }
        }}
      >
        <input type="file" hidden accept="image/*" onChange={e => setImage(e.target.files[0])} />
        <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
          {image ? image.name : 'Add a cover image'}
        </Typography>
      </Box> */}

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Cover image URL (optional)"
        value={image}
        onChange={e => setImage(e.target.value)}
        sx={{ mb: 3 }}
      />

      <ReactQuill
        value={content}
        onChange={setContent}
        modules={modules}
        placeholder="Tell your story…"
      />
    </Box>
    </>
  );
}

export default EditPost;