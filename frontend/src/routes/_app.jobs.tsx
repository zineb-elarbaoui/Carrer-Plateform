import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Topbar } from "@/components/topbar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp } from "lucide-react";

const targetJobs = [
  { id: 1, title: "Data Engineer", icon: "⚙️", demand: "High", salary: "$85k–$120k", skills: 12 },
  { id: 2, title: "Data Scientist", icon: "🔬", demand: "High", salary: "$90k–$130k", skills: 14 },
  { id: 3, title: "Data Analyst", icon: "📊", demand: "Medium", salary: "$65k–$95k", skills: 10 },
  { id: 4, title: "ML Engineer", icon: "🤖", demand: "High", salary: "$95k–$140k", skills: 15 },
  { id: 5, title: "Cloud Engineer", icon: "☁️", demand: "High", salary: "$88k–$125k", skills: 13 },
  { id: 6, title: "DevOps Engineer", icon: "🔧", demand: "Medium", salary: "$80k–$115k", skills: 11 },
  { id: 7, title: "Backend Developer", icon: "💻", demand: "High", salary: "$75k–$110k", skills: 10 },
  { id: 8, title: "Fullstack Developer", icon: "🌐", demand: "Medium", salary: "$78k–$112k", skills: 14 },
];

export const Route = createFileRoute("/_app/jobs")({ component: Jobs });

function Jobs() {
  const nav = useNavigate();
  const [q, setQ] = useState("");
  const filtered = targetJobs.filter((j) =>
    j.title.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <>
      <Topbar title="Target Jobs" />
      <main className="space-y-6 p-4 md:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search for a target job role..."
              className="h-11 pl-10"
            />
          </div>
          <Button variant="outline" className="h-11">Browse trending roles</Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((job) => (
            <Card key={job.id} className="shadow-soft transition hover:-translate-y-0.5 hover:shadow-card">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="text-4xl">{job.icon}</div>
                  <Badge className="bg-secondary/15 text-secondary" variant="secondary">
                    <TrendingUp className="mr-1 h-3 w-3" />{job.demand}
                  </Badge>
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{job.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{job.salary} • {job.skills} required skills</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {["Python", "SQL", "ML"].map((s) => (
                    <Badge key={s} variant="outline" className="text-xs">{s}</Badge>
                  ))}
                </div>
                <Button className="mt-5 w-full" onClick={() => nav({ to: "/gap" })}>
                  Select target job
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
}
