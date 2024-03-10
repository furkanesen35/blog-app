import React,{useEffect,useState,useContext} from 'react'
import axios from 'axios'
import { UserContext } from '../context/UserContext';

const PostEdit = ({ slug }) => {
 const { userToken } = useContext(UserContext);
 const [data, setData] = useState([])
 const [categories, setCategories] = useState([]);

 function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : '';
 }
 const csrftoken = getCookie('csrftoken');
 const headers = {
  'Content-Type': 'application/json',
  'X-CSRFToken': csrftoken,
  Authorization : `Bearer ${userToken}`,
 };

// edit part
 useEffect(() => {
  axios.get('http://localhost:8000/get_category/')
   .then(response => {
    setCategories(response.data);
   })
   .catch(error => {
    console.error('Error fetching categories:', error);
   });
 },[]);

 useEffect(() => {
  const fetchedDetail = async () => {
   try {
    const response = await axios.get(`http://localhost:8000/${slug}/post_detail`)
    setData(response.data)
   } catch (error) {
    console.log(error);
   }
  }
  fetchedDetail()
 }, [slug])

 const submitChanges = (e) => {
  e.preventDefault();
 
  const data = {
   title: e.target.title.value,
   content: e.target.content.value,
   status: e.target.status.value,
   category: {id:e.target.category.value, name:e.target.category.value2},
  };
 
  axios.put(`http://localhost:8000/${slug}/post_edit`, data, {headers} )
   .catch(error => {
    console.error('Error submitting post:', error);
   });
 };
// edit part


// comment part
 const submitComment = (e) => {
  e.preventDefault();

  const comment = { 
   content: e.target.content.value,
  }

  axios.post(`http://localhost:8000/${slug}/post_comment`, comment, {headers} )
   .catch(error => {
    console.error('Error submitting post:', error);
   });
  // console.log(comment);
 };
 // comment part

 return (
  <>
   {userToken ? 
    <div className='flex justify-center bg-black h-[100vh] text-white'>
     <form className='flex flex-col w-[300px]' action="" method='POST' onSubmit={submitChanges}>
      <label htmlFor="title">Title</label>
      <input type="text" name='title' id='title' className='text-black' />
      <label htmlFor="content">Content</label>
      <textarea name="content" id="content" cols="30" rows="10" className='text-black' />
      <label htmlFor="status" >Status</label>
      <select name="status" id="status"  className='text-black'>
       <option value="d" className='text-black'>Draft</option>
       <option value="p" className='text-black'>Published</option>
      </select>
      <label htmlFor="category">Category</label>
      <select name="category" id="category" value={data.category} className='text-black'>
       {categories.map((category, index) => (
        <option key={index} value={category.id} className='text-black' value2={category.name}>{category.name} {category.id}</option>
       ))}
      </select>
      <input type="submit"/>
     </form>
    </div> : 
    <div className='flex flex-col items-center bg-black h-[100vh] text-white'>
     <div>Title: {data.title}</div>
     <div>Content: {data.content}</div>
     {/* <div>Category: {data.category?.name}</div>
      {data.comments.length ? <div>Comments: {data.comments.map((e, index) => ( <div key={index}>{e.content}</div>))}</div> : <></>}
     <div>Likes: {data.likes.length}</div> */}
     <div>
      Leave a comment:
      <form action="" className='flex flex-col text-black' onSubmit={submitComment}>
       <textarea name="content" id="" cols="30" rows="10"/>
       <input type="submit" className='text-white'/>
      </form>
     </div>
    </div>
   }
  </>
 )
}

export default PostEdit