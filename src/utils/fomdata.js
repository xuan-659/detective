export function toFromData(obj) {
  const formdata = new FormData();
  for (const [k, v] of Object.entries(obj)) {
    console.log(k, v);
    formdata.append(k, v);
  }
  for (let [k, v] of formdata) {
    console.log('fromdata', k, v);
  }
  return formdata;
}
