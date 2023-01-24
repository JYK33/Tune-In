const newPostHandler = async (event)=>{
    event.preventDefault();
    const title = document.querySelector('#title').value
    const content = document.querySelector('#body').value
    console.log(title, content)
    const response = await fetch('/dashboard/create', {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            body: content,
        }),
        headers: { 'Content-Type': 'application/json' },
      }).catch(err => console.log(err));
      
      document.location.replace('/dashboard')
}
document.querySelector('#submit')?.addEventListener('click', newPostHandler)



const deletePostHandler = async (event)=>{
    event.preventDefault();
    const title = document.querySelector('#title')
    const content = document.querySelector('#body')
    const id = document.querySelector('#postId').value
    console.log(title, content)
    const response = await fetch(`/api/delete/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({
            title: title,
            body: content,
        }),
        headers: { 'Content-Type': 'application/json' },
      }).catch(err => console.log(err));
      
    //   document.location.replace('/dashboard')
}
document.querySelector('#delete')?.addEventListener('click', deletePostHandler)
