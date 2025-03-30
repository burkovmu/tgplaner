import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AppState, Action, Task } from '../types';

const initialState: AppState = {
  tasks: [],
  tags: [],
  projects: [],
  deletedTasks: [],
  currentCategory: 'all',
  searchTerm: '',
  selectedTags: [],
  selectedProject: null,
  viewMode: 'list',
  selectedDate: null
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.task]
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task => 
          task.id === action.task.id ? action.task : task
        )
      };
    case 'DELETE_TASK':
      const taskToDelete = state.tasks.find(task => task.id === action.id);
      if (!taskToDelete) return state;
      
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.id),
        deletedTasks: [...state.deletedTasks, { ...taskToDelete, deleted: true, deletedAt: new Date().toISOString() }]
      };
    case 'DELETE_TASK_PERMANENTLY':
      return {
        ...state,
        deletedTasks: state.deletedTasks.filter(task => task.id !== action.id)
      };
    case 'RESTORE_TASK':
      const taskToRestore = state.deletedTasks.find(task => task.id === action.id);
      if (!taskToRestore) return state;
      
      const restoredTask = { ...taskToRestore, deleted: false, deletedAt: undefined };
      return {
        ...state,
        tasks: [...state.tasks, restoredTask],
        deletedTasks: state.deletedTasks.filter(task => task.id !== action.id)
      };
    case 'RESTORE_ALL_TASKS':
      const restoredTasks = state.deletedTasks.map(task => ({
        ...task,
        deleted: false,
        deletedAt: undefined
      }));
      return {
        ...state,
        tasks: [...state.tasks, ...restoredTasks],
        deletedTasks: []
      };
    case 'EMPTY_TRASH':
      return {
        ...state,
        deletedTasks: []
      };
    case 'ADD_TAG':
      return {
        ...state,
        tags: [...state.tags, action.tag]
      };
    case 'UPDATE_TAG':
      return {
        ...state,
        tags: state.tags.map(tag =>
          tag.id === action.tag.id ? action.tag : tag
        )
      };
    case 'DELETE_TAG':
      return {
        ...state,
        tags: state.tags.filter(tag => tag.id !== action.id),
        tasks: state.tasks.map(task => ({
          ...task,
          tags: task.tags.filter(tagId => tagId !== action.id)
        }))
      };
    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [...state.projects, action.project]
      };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(project =>
          project.id === action.project.id ? action.project : project
        )
      };
    case 'DELETE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter(project => project.id !== action.id),
        tasks: state.tasks.map(task => ({
          ...task,
          project: task.project === action.id ? undefined : task.project
        }))
      };
    case 'SET_CATEGORY':
      return {
        ...state,
        currentCategory: action.category
      };
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.searchTerm
      };
    case 'SET_SELECTED_TAGS':
      return {
        ...state,
        selectedTags: action.tags
      };
    case 'SET_SELECTED_PROJECT':
      return {
        ...state,
        selectedProject: action.projectId
      };
    case 'SET_VIEW_MODE':
      return {
        ...state,
        viewMode: action.viewMode
      };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.id ? { ...task, completed: !task.completed } : task
        )
      };
    case 'SET_SELECTED_DATE':
      return {
        ...state,
        selectedDate: action.date
      };
    case 'RESTORE_STATE':
      return {
        ...action.state,
        selectedDate: action.state.selectedDate ? new Date(action.state.selectedDate) : null
      };
    default:
      return state;
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const savedState = localStorage.getItem('appState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      Object.keys(initialState).forEach(key => {
        if (!(key in parsedState)) {
          parsedState[key] = initialState[key as keyof AppState];
        }
      });
      dispatch({ type: 'RESTORE_STATE', state: parsedState });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('appState', JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}; 