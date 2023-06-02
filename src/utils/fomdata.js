export function toFromData(obj) {
  const formdata = new FormData();
  for (const [k, v] of Object.entries(obj)) {
    if (Array.isArray(v)) {
      for (var i = 0; i < v.length; i++) {
        formdata.append(k, v[i]);
      }
      formdata.append(k, v);
    } else {
      formdata.append(k, v);
    }
  }
  for (let [k, v] of formdata) {
    console.log('fromdata', k, v);
  }
  return formdata;
}
