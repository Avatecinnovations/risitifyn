import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  start_date: string;
  end_date: string;
  client_id: string;
  client_name: string;
  created_at: string;
  updated_at: string;
}

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "active",
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select(
          `
          *,
          clients (
            name
          )
        `
        )
        .eq("id", id)
        .single();

      if (error) throw error;

      const formattedProject = {
        ...data,
        client_name: data.clients?.name || "N/A",
      };

      setProject(formattedProject);
      setFormData({
        name: formattedProject.name,
        description: formattedProject.description || "",
        status: formattedProject.status,
        start_date: formattedProject.start_date,
        end_date: formattedProject.end_date,
      });
    } catch (error) {
      console.error("Error fetching project:", error);
      toast.error("Failed to load project");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("projects")
        .update(formData)
        .eq("id", id);

      if (error) throw error;

      toast.success("Project updated successfully");
      setIsEditing(false);
      fetchProject();
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Failed to update project");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("projects").delete().eq("id", id);

      if (error) throw error;

      toast.success("Project deleted successfully");
      navigate("/projects");
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!project) {
    return <div className="p-4">Project not found</div>;
  }

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {isEditing ? "Edit Project" : project.name}
        </h1>
        <div className="flex space-x-2">
          {!isEditing && (
            <>
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </>
          )}
        </div>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Project Name
            </label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-medium">
              Status
            </label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="on_hold">On Hold</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="start_date" className="text-sm font-medium">
                Start Date
              </label>
              <Input
                id="start_date"
                type="date"
                value={formData.start_date}
                onChange={(e) =>
                  setFormData({ ...formData, start_date: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="end_date" className="text-sm font-medium">
                End Date
              </label>
              <Input
                id="end_date"
                type="date"
                value={formData.end_date}
                onChange={(e) =>
                  setFormData({ ...formData, end_date: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div>
            <h2 className="text-sm font-medium text-gray-500">Description</h2>
            <p className="mt-1">
              {project.description || "No description provided"}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-medium text-gray-500">Client</h2>
            <p className="mt-1">{project.client_name}</p>
          </div>

          <div>
            <h2 className="text-sm font-medium text-gray-500">Status</h2>
            <p className="mt-1 capitalize">{project.status}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h2 className="text-sm font-medium text-gray-500">Start Date</h2>
              <p className="mt-1">
                {format(new Date(project.start_date), "MMMM d, yyyy")}
              </p>
            </div>

            <div>
              <h2 className="text-sm font-medium text-gray-500">End Date</h2>
              <p className="mt-1">
                {format(new Date(project.end_date), "MMMM d, yyyy")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h2 className="text-sm font-medium text-gray-500">Created At</h2>
              <p className="mt-1">
                {format(new Date(project.created_at), "MMMM d, yyyy")}
              </p>
            </div>

            <div>
              <h2 className="text-sm font-medium text-gray-500">
                Last Updated
              </h2>
              <p className="mt-1">
                {format(new Date(project.updated_at), "MMMM d, yyyy")}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
