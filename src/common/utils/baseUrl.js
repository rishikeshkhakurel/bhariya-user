const testingUrl = window.location.origin;

let baseUrl = "";

if (testingUrl.includes("bhariya")) {
  baseUrl = `${window.location.origin}/api/`;
} else {
  baseUrl = "http://127.0.0.1:8000/api/";
}

export default baseUrl;
