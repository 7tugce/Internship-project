import apiAxios from "../libraries/apiAxios"

export const getRequests=()=>{
          return apiAxios.get("Requirements")
}

export const addRequest=(values)=>{
          return apiAxios.post("Requirements",values)
}

export const getRequestById=(id)=>{
          return apiAxios.get(`Requirements/${id}`)
}