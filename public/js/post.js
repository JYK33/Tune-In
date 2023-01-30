// creating a new post
const newPostHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector("#title").value;
  // const email = document.querySelector("#email").value;
  const content = document.querySelector("#body").value;
  console.log(title, content);
  const response = await fetch("/dashboard/create", {
    method: "POST",
    body: JSON.stringify({
      title: title,
      // email: email,
      body: content,
    }),
    headers: { "Content-Type": "application/json" },
  }).catch((err) => console.log(err));

  document.location.replace("/dashboard");
};
document.querySelector("#submit")?.addEventListener("click", newPostHandler);

// deleting a post
const deletePostHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector("#title");
  const content = document.querySelector("#body");
  const id = event.target.dataset.id;
  console.log(title, content, id);
  const response = await fetch(`/api/post/delete/${id}`, {
    method: "DELETE",
    body: JSON.stringify({
      title: title,
      body: content,
    }),
    headers: { "Content-Type": "application/json" },
  }).catch((err) => console.log(err));

  document.location.replace("/dashboard/profile");
};

const deleteButtons = document.querySelectorAll(".delete");
for (let i = 0; i < deleteButtons.length; i++) {
  deleteButtons[i]?.addEventListener("click", deletePostHandler);
}

// leaving a comment
Array.from(document.querySelectorAll("#hideButton")).forEach((comButton) => {
  comButton.onclick = function () {
    console.log("I GOT CLICKED");
    var div = comButton.parentElement.nextElementSibling;
    if (div.style.display !== "none") {
      div.style.display = "none";
    } else {
      div.style.display = "block";
    }
  };
});


// editing a post
const editPostHandler = async (event) => {
  event.preventDefault();
  // const content = document.querySelector("#body");
  const id = document.querySelector("#postId").value;
  const title = document.querySelector(".title-"+id).innerHTML;;
  const content = document.querySelector(".body-"+id).value;
  // const id = event.target.dataset.id;
  console.log(title, content, );
  console.log(`/api/post/update/${id}`)

  fetch(`/api/post/update/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title: title,
      body: content,
      postID: id,
    }),
    headers: { "Content-Type": "application/json" },
  }).catch((err) => console.log(err));

  document.location.replace("/dashboard/profile");
};
Array.from(document.querySelectorAll(".saveEdit")).forEach((e)=>
  e.addEventListener('click', editPostHandler)
);
// const editButtons = document.querySelectorAll('.edit')
// for (let i = 0; i < editButtons.length; i++) {
//     editButtons[i]?.addEventListener('click', editPostHandler)
// }

//editing a post
// const handleClick = (event) => {
//   // event.target.textContent = "Save";
//   // document
//   //   .querySelector(`#post-${event.target.dataset.id}`)
//   //   .removeAttribute("disabled");
// };
// Array.from(document.querySelectorAll(".edit")).forEach((e) =>
//   e.addEventListener("click", handleClick)
// );
