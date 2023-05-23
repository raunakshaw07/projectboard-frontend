export const host = "http://localhost:5000/api"

export const getUser = `${host}/user/get-user`;
export const registerRoute = `${host}/user/create`;
export const updateUser = `${host}/user/update`;
export const loginRoute = `${host}/user/login`;
export const logout = `${host}/user/logout`;

export const allProjectRoute = `${host}/project/all-projects`;
export const singleProjectRoute = `${host}/project`;
export const createProjectRoute = `${host}/project/create`;
export const updateProjectRoute = `${host}/project/update`;
export const deleteProjectRoute = `${host}/project/delete`;

export const allTaskRoute = `${host}/task/all-tasks/`
export const createTaskRoute = `${host}/task/create`;
export const updateTaskRoute = `${host}/task/update`;
export const deleteTaskRoute = `${host}/task/delete`;