import { useState } from "react";

import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import SideBar from "./components/SideBar";
import SelectedProject from "./components/SelectedProjects"

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  function handleAddTask(text){
    setProjectState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId
      };

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks]
      };
    });
  }

  function handleDeleteTask(id){
    setProjectState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id)
      };
    });
  }

  function handleSelectProject(id){
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  function handleStartAddProject(){
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  function handleCancelProject(){
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined
      };
    });
  }

  function handleDeleteProject(){
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectId)
      };
    });
  }

  function handleAddProject(projectData){
    setProjectState((prevState) => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId
      };

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      };
    })
  }

  const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId);

  let content;
  if(projectState.selectedProjectId === null){
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelProject} />
  } else if (projectState.selectedProjectId === undefined){
    content = <NoProjectSelected onStartAddProject = {handleStartAddProject} />
  } else  if (selectedProject){
    content = <SelectedProject 
                project={selectedProject} 
                onDelete={handleDeleteProject} 
                onAddTask={handleAddTask} 
                onDeleteTask={handleDeleteTask}
                tasks={projectState.tasks}
              />
  } else {
    content = <p className="text-3xl">No project found</p>
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar 
        onStartAddProject = {handleStartAddProject} 
        projects={projectState.projects} 
        onSelectProject={handleSelectProject}
        selectedProjectId={projectState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
