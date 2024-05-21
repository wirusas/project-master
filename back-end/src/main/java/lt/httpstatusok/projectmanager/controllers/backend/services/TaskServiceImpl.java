package lt.httpstatusok.projectmanager.controllers.backend.services;

import lt.httpstatusok.projectmanager.controllers.backend.dto.TaskCreateRequest;
import lt.httpstatusok.projectmanager.controllers.backend.exceptions.TaskNotFoundException;
import lt.httpstatusok.projectmanager.controllers.backend.models.Project;
import lt.httpstatusok.projectmanager.controllers.backend.models.Task;
import lt.httpstatusok.projectmanager.controllers.backend.models.enums.TaskPriority;
import lt.httpstatusok.projectmanager.controllers.backend.models.enums.TaskStatus;
import lt.httpstatusok.projectmanager.controllers.backend.repositories.ProjectRepository;
import lt.httpstatusok.projectmanager.controllers.backend.repositories.TaskRepository;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.Writer;
import java.util.List;

@Service
public class TaskServiceImpl implements TaskService{


    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Override
    public Task createTask(String projectId, TaskCreateRequest taskCreateRequest) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new RuntimeException("Project not found"));
        Task task = new Task();
        task.setName(taskCreateRequest.getName());
        task.setDescription(taskCreateRequest.getDescription());
        task.setStatus(TaskStatus.valueOf(taskCreateRequest.getStatus()));
        task.setPriority(TaskPriority.valueOf(taskCreateRequest.getPriority()));
        task.setProject(project);
        return taskRepository.save(task);
    }

    @Override
    public List<Task> getTasksByProjectId(String projectId) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new RuntimeException("Project not found"));
        return taskRepository.findAllByProjectId(projectId);
    }

    public void deleteTask(Task task) {

        taskRepository.delete(task);
    }

    @Override
    public Task validateAndGetTask(Long id) {
        return taskRepository.findById(id).orElseThrow(() -> new TaskNotFoundException("Task not found with ID: " + id));
    }
    @Override
    public List<Task> findTasksByName(String name) {
        return taskRepository.findByNameContaining(name);
    }

    @Override
    public List<Task> findTasksByStatus(TaskStatus status) {
        return taskRepository.findByStatus(status);
    }

    @Override
    public void writeTasksToCsv(List<Task> tasks, Writer writer) throws IOException {
        // Initialize CSVPrinter with writer
        CSVPrinter printer = new CSVPrinter(writer, CSVFormat.DEFAULT);

        // Write headings
        printer.printRecord("CREATED_AT", "DESCRIPTION", "ID", "NAME", "STATUS", "PRIORITY", "LAST_UPDATE");

        // Write project data
        for (Task task : tasks) {
            printer.printRecord(
                    task.getDateCreated(),
                    task.getDescription(),
                    task.getId(),
                    task.getName(),
                    task.getStatus(),
                    task.getPriority(),
                    task.getLastUpdated()
            );
        }

        // Close the printer
        printer.close();
    }

    @Override
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @Override
    public Task getTaskById(Long id) {
            return taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        }

    @Override
    public Task updateTask(Long id, Task updatedTask) {
        return taskRepository.findById(id).map(task -> {
            task.setName(updatedTask.getName());
            task.setDescription(updatedTask.getDescription());
            task.setStatus(updatedTask.getStatus());
            task.setPriority(updatedTask.getPriority());
            // other fields to update
            return taskRepository.save(task);
        }).orElseThrow(() -> new RuntimeException("Task not updated"));
    }

}



