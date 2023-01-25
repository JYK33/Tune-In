const newCommentHandler = async (event)=>{
    event.preventDefault();
    const content = document.querySelector('#comment_edit').value
    const postId = document.querySelector('#postId').value
    const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({ content, postId}),
        headers: { 'Content-Type': 'application/json' },
      }).catch(err => console.log(err));
      
      document.location.replace('/dashboard')
}
document.querySelector('#makeComment')?.addEventListener('click', newCommentHandler)