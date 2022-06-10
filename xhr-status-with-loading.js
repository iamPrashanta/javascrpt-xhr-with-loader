$(document).ready(function () {
  document.getElementById("post_notice").addEventListener("submit", postNotice);
  var status_txt = document.getElementById("status_txt");

  function postNotice(e) {
    e.preventDefault();

    var notification_for = document.getElementById("notification_for").value;
    var notify_text = document.getElementById("notify_text").value;
    var params = `notification_for=${notification_for}&notify_text=${notify_text}`;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "notice_post_ajax.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    if (xhr.readyState == 1) {
      status_txt.innerHTML =
        "<img src='./assets/img/dribbble-spinner-800x600.gif' alt='loading gif'>";
    }
    // OPTIONAL - used for loaders
    xhr.onprogress = function () {
      console.log("READYSTATE: ", xhr.readyState);
      status_txt.innerHTML =
        "<img src='./assets/img/dribbble-spinner-800x600.gif' alt='loading gif'>";
      // or simple text
      //   status_txt.innerHTML = "Processing Please Wait";
    };
    xhr.onload = function () {
      console.log(this.responseText);
      if (this.status == 200 && this.responseText == "success") {
        status_txt.innerHTML = "";
        alert("Successful");
        window.location.reload();
      } else if ((this.status = 404)) {
        alert("Request Error...");
      }
    };

    xhr.onerror = function () {
      alert("Request Error...");
    };

    xhr.send(params);
  }
});
