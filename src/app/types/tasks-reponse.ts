export interface TasksResponse {
  hasMoreResults: boolean;
  results: Task[];
}

export interface Task {
  taskId: string;
  calendarId: string;
  contactId: string;
  assignedTo: string;
  name: string;
  description: string;
  dueDate: string;
  dateCreated: string;
  dateCompleted: string | null;
  isCompleted: boolean;
  assignedToMetaData: AssignedToMetaData;
  contactMetaData: ContactMetaData;
}

export interface AssignedToMetaData {
  firstName: string;
  lastName: string;
}

export interface ContactMetaData {
  assignedTo: string;
  name: string;
}
