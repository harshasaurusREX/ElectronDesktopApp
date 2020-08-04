

function chartfun()
{
    //alert(__dirname);
    require("electron").remote.getCurrentWindow().loadFile('./views/chart.html');
}

function bootfun()
{
    //alert(__dirname);
    require("electron").remote.getCurrentWindow().loadFile('./views/boot.html');
}

function fun()
{
  var v = document.getElementById("username");
  var p = document.getElementById("password");

  if(v.value == "")
  {
    alert("provide username");
    return ;
  }
  if(p.value =="")
  {
    alert("provide password");
    return ;
  }

  if(v.value == "harsh" && p.value == "123456")
  {
    //alert(__dirname);
    require("electron").remote.getCurrentWindow().loadFile('./views/index.html');
  }
  else
  {
    window.alert("UserName or password is invalid please contact admin !");
    return ;
  }
}

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}
