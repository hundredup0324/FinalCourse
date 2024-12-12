 export const setCookie = (cname, cvalue, time)=> {
    const d = new Date();
    d.setTime(d.getTime() + (time * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  export const getCookie=(cname)=> {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    console.log(ca)
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
  export const checkCookie=()=> {
    let user = getCookie("username");
    console.log(user);
    if (user != "") {
      return "login";
    } else {
    // setCookie("username", "token", 365);
    return "logout";
      
    }
  }