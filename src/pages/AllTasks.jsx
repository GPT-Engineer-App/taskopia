import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", dueDate: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const handleAddTask = () => {
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
    setNewTask({ title: "", description: "", dueDate: "" });
  };

  const handleEditTask = (task) => {
    setTasks(tasks.map(t => t.id === task.id ? task : t));
    setIsEditing(false);
    setCurrentTask(null);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Tasks</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Task</Button>
          </DialogTrigger>
          <DialogContent>
            <h2 className="text-xl font-bold mb-4">Add New Task</h2>
            <Input
              placeholder="Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="mb-2"
            />
            <Textarea
              placeholder="Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="mb-2"
            />
            <Input
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              className="mb-2"
            />
            <Button onClick={handleAddTask}>Add Task</Button>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-4">
        {tasks.map(task => (
          <Card key={task.id}>
            <CardHeader>
              <CardTitle>{task.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{task.description}</p>
              <p>Due: {format(new Date(task.dueDate), "PPP")}</p>
              <div className="flex space-x-2 mt-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => { setIsEditing(true); setCurrentTask(task); }}>Edit</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <h2 className="text-xl font-bold mb-4">Edit Task</h2>
                    <Input
                      placeholder="Title"
                      value={currentTask?.title || ""}
                      onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
                      className="mb-2"
                    />
                    <Textarea
                      placeholder="Description"
                      value={currentTask?.description || ""}
                      onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
                      className="mb-2"
                    />
                    <Input
                      type="date"
                      value={currentTask?.dueDate || ""}
                      onChange={(e) => setCurrentTask({ ...currentTask, dueDate: e.target.value })}
                      className="mb-2"
                    />
                    <Button onClick={() => handleEditTask(currentTask)}>Save Changes</Button>
                  </DialogContent>
                </Dialog>
                <Button variant="destructive" onClick={() => handleDeleteTask(task.id)}>Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllTasks;