import { initViewer, loadModel } from "./viewer.js";
import { initTree } from "./sidebar.js";

const login = document.getElementById("login");
try {
  const resp = await fetch("/api/auth/profile");
  if (resp.ok) {
    const user = await resp.json();
    login.innerText = `Logout (${user.name})`;
    login.onclick = () => {
      const iframe = document.createElement("iframe");
      iframe.style.visibility = "hidden";
      iframe.src = "https://accounts.autodesk.com/Authentication/LogOut";
      document.body.appendChild(iframe);
      iframe.onload = () => {
        window.location.replace("/api/auth/logout");
        document.body.removeChild(iframe);
      };
    };
    const viewer = await initViewer(document.getElementById("preview"));

    loadModel(
      viewer,
      "dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLk1SVEJUcDB4UjVxeEloUjlTSzNJZ1E_dmVyc2lvbj0xNTU"
    );

    initTree("#tree", (id) =>
      loadModel(viewer, window.btoa(id).replace(/=/g, ""))
    );

    // "urn:dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLkZqQ1E2ZS1kVFl5cjdpanU2bXlUWFE_dmVyc2lvbj0z"
  } else {
    login.innerText = "Login";
    login.onclick = () => window.location.replace("/api/auth/login");
  }
  login.style.visibility = "visible";

  //load model here
} catch (err) {
  alert("Could not initialize the application. See console for more details.");
  console.error(err);
}
