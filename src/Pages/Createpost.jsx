import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { use, useState } from 'react';
import { Box, TextField, Button, Typography,Divider } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Navbar from '../components/Navbar';
import { addPosts } from '../api/posts';
import { useNavigate } from 'react-router-dom';

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    [{ header: 1 }, { header: 2 }, 'blockquote'],
    [{ list: 'bullet' }, { list: 'ordered' }],
    ['link', 'code-block'],
  ],
};

function Createpost({toggle,setToggle}) {

  const naviagte = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [uploading, setUploading] = useState(false)

  const handleSubmit = async () => {
    let imageUrl = ''
    if (imageFile) {
      setUploading(true)
      imageUrl = await uploadToCloudinary(imageFile)
      setUploading(false)
    }
      await addPosts({title,image:imageUrl,content});
      setToggle(!toggle)
      naviagte('/my-posts')
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file)) // local preview
  }

  const uploadToCloudinary = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'blog_quillo') // from Cloudinary dashboard

    const res = await fetch('https://api.cloudinary.com/v1_1/dl9hvgkbm/image/upload', {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    return data.secure_url // this is the URL you save to DB
  }

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
          onClick={handleSubmit}
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

      <Box
        component="label"
        sx={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          border: '1px dashed', borderColor: 'divider', borderRadius: 2,
          py: 3, mb: 3, cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' },
          overflow: 'hidden',
        }}
      >
        <input type="file" hidden accept="image/*" onChange={handleImageChange} />
        {imagePreview
          ? <Box component="img" src={imagePreview} sx={{ width: '100%', maxHeight: 200, objectFit: 'cover' }} />
          : <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>Add a cover image</Typography>
        }
      </Box>

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

export default Createpost;