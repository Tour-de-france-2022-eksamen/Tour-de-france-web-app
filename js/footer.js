console.log("Footer loaded");

async function loadFooter() {
  let footer = document.querySelector("footer");
  footer.innerHTML = `<div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
    © 2020 Copyright:
    <a class="text-white" href="https://mdbootstrap.com/">Tour De France 2022</a>
  </div>`;
}
