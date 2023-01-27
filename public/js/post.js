const newPostHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector("#title").value;
  const content = document.querySelector("#body").value;
  console.log(title, content);
  const response = await fetch("/dashboard/create", {
    method: "POST",
    body: JSON.stringify({
      title: title,
      body: content,
    }),
    headers: { "Content-Type": "application/json" },
  }).catch((err) => console.log(err));

  document.location.replace("/dashboard");
};
document.querySelector("#submit")?.addEventListener("click", newPostHandler);

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

const comButton = document.getElementById("commentButton");
if (comButton) {
  comButton.onclick = function () {
    var div = document.getElementById("comments");
    if (div.style.display !== "none") {
      div.style.display = "none";
    } else {
      div.style.display = "block";
    }
  };
}

const editPostHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector("#title");
  const content = document.querySelector("#body");
  const id = event.target.dataset.id;
  console.log(title, content, id);

  fetch(`/api/post/update/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title: title.value,
      body: content.value,
    }),
    headers: { "Content-Type": "application/json" },
  }).catch((err) => console.log(err));

  document.location.replace("/dashboard/profile");
};
// const editButtons = document.querySelectorAll('.edit')
// for (let i = 0; i < editButtons.length; i++) {
//     editButtons[i]?.addEventListener('click', editPostHandler)
// }

const handleClick = (event) => {
  event.target.textContent = "save";
  document
    .querySelector(`#post-${event.target.dataset.id}`)
    .removeAttribute("disabled");
};
Array.from(document.querySelectorAll(".edit")).forEach((e) =>
  e.addEventListener("click", handleClick)
);
