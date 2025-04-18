import api from './api';


export const getTasks = async ()=>{
    const response = await api.get("");
    return response.data;
};


export const createTask = async ({ title, startDate, endDate, description, status, priority }) => {
    const response = await api.post("", { title, startDate, endDate, description, status, priority });
    return response.data;
};



export const updateTask = async(taskId,updatedData)=>{
    const response = await api.put(`/${taskId}`,updatedData);
    return response.data;
}

export const deleteTask  = async (taskId)=>{
    await api.delete(`/${taskId}`);
}

export default {getTasks,createTask,updateTask,deleteTask};