export const ROUTES = {
  HOME: "/",
  AUTH: "/auth",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  DASHBOARD: "/dashboard",
  TASKS: "/dashboard/tasks",
  USERS: "/dashboard/users",

  // Dynamic routes
  TASK_DETAILS(id: string) {
    return `${this.TASKS}/${id}`;
  },
};

export default ROUTES;
