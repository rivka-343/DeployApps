// import axios from 'axios';

// const apiUrl = 'http://localhost:5151';
// axios.defaults.baseURL = apiUrl;


// axios.interceptors.response.use(
//   response => response, 
//   error => {
//     console.error('API Error:', error.response ? error.response.data : error.message);
//     return Promise.reject(error); 
//   }
// );

// export default {
//   getTasks: async () => {
//     const result = await axios.get(`/items`);    
//     return result.data;
//   },

//   addTask: async(name) => {
//     console.log('addTask', name);
//     const response = await axios.post(`/items/post`, { name: name, isComplete: false });
//     return response.data;
//   },

//   setCompleted: async(id, isComplete) => {
//     console.log('setCompleted', { id, isComplete });
//     const response = await axios.put(`/items/${id}`, { 
//       isComplete: isComplete 
//     });
  
//     return response.data;
//   },

//   deleteTask: async(id) => {
//     console.log('deleteTask');
//     const response = await axios.delete(`/items/${id}`);
//     return response.data; // החזרת נתוני התגובה במקרה של הצלחה
//   }
// };
import axios from 'axios';
// axios.defaults.baseURL = "http://localhost:5123/items";
axios.defaults.baseURL =process.env.REACT_APP_BASE_URL;
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  console.error("שגיאה בתגובה מהשרת:", error); // רישום השגיאה ללוג
  return Promise.reject(error);
})
const taskService ={

  getTasks: async () => {
    try {
      const result = await axios.get('/items')
      return result.data;
    } catch (error) {
      console.error("שגיאה בלקיחת משימות:", error);
    }
  },

  addTask: async (name) => {
    try {
      const result = await axios.post('/items', { name })
      return { result };
    } catch (error) {
      console.error("שגיאה בהוספת משימה:", error);
    }
  },

  setCompleted: async (todo, isComplete) => {
    try {
      const result = await axios.put(`/items/${todo.id}`, { id: todo.id, name: todo.name, isComplete: isComplete });
      return { result };
    } catch (error) {
      console.error("שגיאה בעידכון משימה:", error);
    }
  },

  deleteTask: async (id) => {
    try {
      const result = await axios.delete(`/items/${id}`)
      return { result };
    } catch (error) {
      console.error("שגיאה מחיקת משימה:", error);
    }

  }

};
  
export default taskService;


