import React from 'react'

const LikeButton = ({post}) => {
 const handleLike = () => {
  return console.log(post.slug);
 }
 return (
  <div>
   <div>Likes: {post.likes.length}</div>
   <button onClick={handleLike}>{post.slug}</button>
  </div>
 )
}

export default LikeButton