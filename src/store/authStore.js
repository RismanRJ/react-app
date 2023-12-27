import {create} from 'zustand';


 const useAuthStore= create((set)=>({
    user:JSON.parse(localStorage.getItem('user')),
    
    login:(user)=>set({user}),
    userdata:(data)=>set(state=>{data:data}),
    logout:()=>set({user:null}),
   
    
   
   
}));




 export default useAuthStore;

