// Set a cookie
export function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));  // Set expiration time
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";  // Save cookie with path "/"
}

// Get a cookie value
export function getCookie(name) {
  const nameEq = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(nameEq) == 0) {
      return c.substring(nameEq.length, c.length);
    }
  }
  return null;  // Return null if the cookie is not found
}

// Delete a cookie
export function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
