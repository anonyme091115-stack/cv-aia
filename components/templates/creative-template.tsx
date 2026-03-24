import type { CVSections } from "@/types/cv"
import { formatDateRange } from "@/lib/cv-utils"

interface CreativeTemplateProps {
  sections: CVSections
}

const levelLabels: Record<string, string> = {
  native: "Natif",
  fluent: "Courant",
  advanced: "Avancé",
  intermediate: "Intermédiaire",
  basic: "Basique",
}

export function CreativeTemplate({ sections }: CreativeTemplateProps) {
  const { profile, experiences, education, skills, languages, projects, certifications } = sections

  return (
    <div className="flex min-h-full font-sans text-sm">
      {/* Sidebar */}
      <div className="w-1/3 bg-slate-800 text-white p-8">
        {/* Profile Photo Placeholder */}
        <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-slate-700 flex items-center justify-center">
          <span className="text-4xl font-bold text-slate-500">
            {profile.name?.split(" ").map(n => n[0]).join("").slice(0, 2) || "CV"}
          </span>
        </div>

        {/* Contact */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4 text-cyan-400 uppercase tracking-wider">
            Contact
          </h2>
          <div className="space-y-2 text-sm text-slate-300">
            {profile.email && (
              <p className="break-all">{profile.email}</p>
            )}
            {profile.phone && <p>{profile.phone}</p>}
            {profile.location && <p>{profile.location}</p>}
            {profile.linkedin && (
              <p className="text-cyan-400 break-all">{profile.linkedin}</p>
            )}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4 text-cyan-400 uppercase tracking-wider">
              Compétences
            </h2>
            <div className="space-y-4">
              {skills.map((group) => (
                <div key={group.id}>
                  {group.name && (
                    <h3 className="font-semibold text-slate-200 mb-2">{group.name}</h3>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4 text-cyan-400 uppercase tracking-wider">
              Langues
            </h2>
            <div className="space-y-2">
              {languages.map((lang) => (
                <div key={lang.id} className="flex justify-between">
                  <span className="text-slate-200">{lang.name}</span>
                  <span className="text-slate-400 text-xs">{levelLabels[lang.level]}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-4 text-cyan-400 uppercase tracking-wider">
              Certifications
            </h2>
            <div className="space-y-3">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <p className="font-semibold text-slate-200">{cert.name}</p>
                  <p className="text-xs text-slate-400">{cert.issuer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-white">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            {profile.name || "Votre Nom"}
          </h1>
          {profile.title && (
            <p className="text-xl text-cyan-600 font-medium">{profile.title}</p>
          )}
          {profile.summary && (
            <p className="mt-4 text-slate-600 leading-relaxed">{profile.summary}</p>
          )}
        </header>

        {/* Experience */}
        {experiences.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b-2 border-cyan-400">
              Expérience
            </h2>
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-cyan-400 before:rounded-full">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold text-slate-800">{exp.position}</h3>
                      <p className="text-cyan-600 font-medium">{exp.company}</p>
                    </div>
                    {exp.startDate && (
                      <span className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded">
                        {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                      </span>
                    )}
                  </div>
                  {exp.location && (
                    <p className="text-sm text-slate-500">{exp.location}</p>
                  )}
                  {exp.description && (
                    <p className="text-slate-600 mt-2">{exp.description}</p>
                  )}
                  {exp.highlights.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="text-slate-600 pl-4 relative before:content-['→'] before:absolute before:left-0 before:text-cyan-400">
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b-2 border-cyan-400">
              Formation
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-cyan-400 before:rounded-full">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-slate-800">
                        {edu.degree}
                        {edu.field && ` — ${edu.field}`}
                      </h3>
                      <p className="text-cyan-600">{edu.institution}</p>
                    </div>
                    {edu.startDate && (
                      <span className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded">
                        {formatDateRange(edu.startDate, edu.endDate)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b-2 border-cyan-400">
              Projets
            </h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-cyan-400 before:rounded-full">
                  <h3 className="font-bold text-slate-800">{project.name}</h3>
                  {project.description && (
                    <p className="text-slate-600 mt-1">{project.description}</p>
                  )}
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
