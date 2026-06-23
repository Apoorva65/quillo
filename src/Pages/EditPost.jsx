import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography, Divider } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Navbar from '../components/Navbar';
import { getOnePost, updatePost } from '../api/posts';
import { useNavigate, useParams } from 'react-router-dom';

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    [{ header: 1 }, { header: 2 }, 'blockquote'],
    [{ list: 'bullet' }, { list: 'ordered' }],
    ['link', 'code-block'],
  ],
};

function EditPost({ toggle, setToggle }) {

  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')  // will be pre-filled with existing image
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    async function fetchThisPost() {
      const post = await getOnePost(id);
      setTitle(post.title || '');
      setContent(post.content || '');
      setImagePreview(post.image || '')  // pre-fill existing image
    }
    fetchThisPost();
  }, [id])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const uploadToCloudinary = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'blog_quillo')

    const res = await fetch('https://api.cloudinary.com/v1_1/dl9hvgkbm/image/upload', {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    return data.secure_url
  }

  const handleUpdate = async () => {
    let imageUrl = imagePreview  // default to existing image URL
    if (imageFile) {
      // only upload if user picked a new file
      setUploading(true)
      imageUrl = await uploadToCloudinary(imageFile)
      setUploading(false)
    }
    await updatePost(id, { title, image: imageUrl, content });
    setToggle(!toggle)
    navigate('/my-posts')
  };

  return (
    <>
      <Navbar />
      <Box sx={{ maxWidth: 680, margin: '0 auto', px: 3, py: 6 }}>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
            Writing as <strong>You</strong>
          </Typography>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleUpdate}
            disabled={uploading}
            sx={{ borderRadius: 99, textTransform: 'none' }}
          >
            {uploading ? 'Uploading...' : 'Update'}
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

export default EditPost;