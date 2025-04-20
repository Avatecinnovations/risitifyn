import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";

interface Project {
  id: string;
  name: string;
  description: string | null;
  client_id: string;
  status: string;
  start_date: string;
  end_date: string | null;
  budget: number | null;
  created_at: string;
}

interface ProjectSelectProps {
  value: string;
  onChange: (value: string) => void;
  onProjectSelect?: (project: Project) => void;
}

export function ProjectSelect({
  value,
  onChange,
  onProjectSelect,
}: ProjectSelectProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("No authenticated user found");

      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  const handleProjectSelect = (projectId: string) => {
    onChange(projectId);
    if (onProjectSelect) {
      const selectedProject = projects.find(
        (project) => project.id === projectId
      );
      if (selectedProject) {
        onProjectSelect(selectedProject);
      }
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="project">Project</Label>
      <Select value={value} onValueChange={handleProjectSelect}>
        <SelectTrigger>
          <SelectValue placeholder="Select a project" />
        </SelectTrigger>
        <SelectContent>
          {loading ? (
            <SelectItem value="loading" disabled>
              Loading...
            </SelectItem>
          ) : projects.length === 0 ? (
            <SelectItem value="empty" disabled>
              No projects found
            </SelectItem>
          ) : (
            projects.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                {project.name}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
