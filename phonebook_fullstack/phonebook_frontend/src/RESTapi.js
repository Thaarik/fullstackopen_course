import axios from "axios";

const baseURL = "/api/persons";

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseURL, newObject);
  return request.then((response) => response.data);
};

const update = (newObject,id)=>{
    const request = axios.put(`${baseURL}/${id}`, newObject);
    return request.then((response)=>response.data)
}

const deleteContact = (id)=>{
    axios.delete(`${baseURL}/${id}`);
}

export default { getAll: getAll, create: create, update:update, deleteContact:deleteContact };
