import type { CVSections } from "@/types/cv"
import { formatDateRange } from "@/lib/cv-utils"

interface MinimalTemplateProps {
  sections: CVSections
}

const levelLabels: Record<string, string> = {
  native: "Langue maternelle",
  fluent: "Courant",
  advanced: "Avancé",
  intermediate: "Intermédiaire",
  basic: "Basique",
}

export function MinimalTemplate({ sections }: MinimalTemplateProps) {
  const { profile, experiences, education, skills, languages, projects, certifications } = sections

  return (
    <div className="p-12 font-sans text-gray-800 text-sm leading-relaxed">
      {/* Header */}
      <header className="text-center mb-8 pb-6 border-b-2 border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">
          {profile.name || "Votre Nom"}
        </h1>
        {profile.title && (
          <p className="text-lg text-gray-600 mb-3">{profile.title}</p>
        )}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {profile.email && <span>{profile.email}</span>}
          {profile.phone && <span>{profile.phone}</span>}
          {profile.location && <span>{profile.location}</span>}
          {profile.linkedin && (
            <span className="text-blue-600">{profile.linkedin}</span>
          )}
        </div>
      </header>

      {/* Summary */}
      {profile.summary && (
        <section className="mb-6">
          <p className="text-gray-700 text-center italic">{profile.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-1 border-b border-gray-300 uppercase tracking-wide">
            Expérience professionnelle
          </h2>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-gray-600">
                      {exp.company}
                      {exp.location && ` • ${exp.location}`}
                    </p>
                  </div>
                  {exp.startDate && (
                    <span className="text-sm text-gray-500 shrink-0">
                      {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                    </span>
                  )}
                </div>
                {exp.description && (
                  <p className="text-gray-700 text-sm mt-1">{exp.description}</p>
                )}
                {exp.highlights.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="text-sm text-gray-700 pl-4 relative before:content-['•'] before:absolute before:left-0">
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
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-1 border-b border-gray-300 uppercase tracking-wide">
            Formation
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {edu.degree}
                    {edu.field && ` en ${edu.field}`}
                  </h3>
                  <p className="text-gray-600">
                    {edu.institution}
                    {edu.location && ` • ${edu.location}`}
                  </p>
                  {edu.gpa && (
                    <p className="text-sm text-gray-500">{edu.gpa}</p>
                  )}
                </div>
                {edu.startDate && (
                  <span className="text-sm text-gray-500 shrink-0">
                    {formatDateRange(edu.startDate, edu.endDate)}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-1 border-b border-gray-300 uppercase tracking-wide">
            Compétences
          </h2>
          <div className="space-y-2">
            {skills.map((group) => (
              <div key={group.id}>
                {group.name && (
                  <span className="font-semibold text-gray-900">{group.name}: </span>
                )}
                <span className="text-gray-700">{group.skills.join(", ")}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-1 border-b border-gray-300 uppercase tracking-wide">
            Langues
          </h2>
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            {languages.map((lang) => (
              <div key={lang.id}>
                <span className="font-semibold text-gray-900">{lang.name}</span>
                <span className="text-gray-600"> — {levelLabels[lang.level]}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-1 border-b border-gray-300 uppercase tracking-wide">
            Projets
          </h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-900">
                    {project.name}
                    {project.url && (
                      <span className="text-blue-600 font-normal text-sm ml-2">
                        {project.url}
                      </span>
                    )}
                  </h3>
                  {project.startDate && (
                    <span className="text-sm text-gray-500 shrink-0">
                      {formatDateRange(project.startDate, project.endDate)}
                    </span>
                  )}
                </div>
                {project.description && (
                  <p className="text-sm text-gray-700 mt-1">{project.description}</p>
                )}
                {project.technologies.length > 0 && (
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Technologies:</span> {project.technologies.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-1 border-b border-gray-300 uppercase tracking-wide">
            Certifications
          </h2>
          <div className="space-y-2">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-start">
                <div>
                  <span className="font-semibold text-gray-900">{cert.name}</span>
                  {cert.issuer && (
                    <span className="text-gray-600"> — {cert.issuer}</span>
                  )}
                </div>
                {cert.date && (
                  <span className="text-sm text-gray-500">
                    {new Date(cert.date).toLocaleDateString("fr-FR", { 
                      month: "short", 
                      year: "numeric" 
                    })}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
