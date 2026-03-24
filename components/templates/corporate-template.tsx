import type { CVSections } from "@/types/cv"
import { formatDateRange } from "@/lib/cv-utils"

interface CorporateTemplateProps {
  sections: CVSections
}

const levelLabels: Record<string, string> = {
  native: "Langue maternelle",
  fluent: "Courant (C1-C2)",
  advanced: "Avancé (B2)",
  intermediate: "Intermédiaire (B1)",
  basic: "Basique (A1-A2)",
}

export function CorporateTemplate({ sections }: CorporateTemplateProps) {
  const { profile, experiences, education, skills, languages, projects, certifications } = sections

  return (
    <div className="p-10 font-sans text-gray-700 text-sm leading-relaxed bg-white">
      {/* Header with blue accent bar */}
      <header className="mb-8">
        <div className="h-1 bg-blue-700 mb-6" />
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {profile.name || "Votre Nom"}
            </h1>
            {profile.title && (
              <p className="text-lg text-blue-700 font-semibold mt-1">{profile.title}</p>
            )}
          </div>
          <div className="text-right text-sm text-gray-600">
            {profile.email && <p>{profile.email}</p>}
            {profile.phone && <p>{profile.phone}</p>}
            {profile.location && <p>{profile.location}</p>}
            {profile.linkedin && <p className="text-blue-700">{profile.linkedin}</p>}
          </div>
        </div>
      </header>

      {/* Summary */}
      {profile.summary && (
        <section className="mb-6 p-4 bg-gray-50 border-l-4 border-blue-700">
          <p className="text-gray-700">{profile.summary}</p>
        </section>
      )}

      <div className="grid grid-cols-3 gap-8">
        {/* Main content - 2 columns */}
        <div className="col-span-2 space-y-6">
          {/* Experience */}
          {experiences.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-blue-700" />
                EXPÉRIENCE PROFESSIONNELLE
              </h2>
              <div className="space-y-5">
                {experiences.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-gray-200 pl-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-900">{exp.position}</h3>
                        <p className="text-blue-700 font-medium">{exp.company}</p>
                        {exp.location && (
                          <p className="text-sm text-gray-500">{exp.location}</p>
                        )}
                      </div>
                      {exp.startDate && (
                        <span className="text-sm font-medium text-gray-500">
                          {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                        </span>
                      )}
                    </div>
                    {exp.description && (
                      <p className="text-gray-600 mt-2">{exp.description}</p>
                    )}
                    {exp.highlights.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {exp.highlights.map((highlight, i) => (
                          <li key={i} className="text-gray-600 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-blue-700 rounded-full mt-1.5 shrink-0" />
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
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-blue-700" />
                FORMATION
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="border-l-2 border-gray-200 pl-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-900">
                          {edu.degree}
                          {edu.field && ` — ${edu.field}`}
                        </h3>
                        <p className="text-blue-700">{edu.institution}</p>
                        {edu.gpa && (
                          <p className="text-sm text-gray-500">{edu.gpa}</p>
                        )}
                      </div>
                      {edu.startDate && (
                        <span className="text-sm font-medium text-gray-500">
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
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-blue-700" />
                PROJETS
              </h2>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="border-l-2 border-gray-200 pl-4">
                    <h3 className="font-bold text-gray-900">{project.name}</h3>
                    {project.description && (
                      <p className="text-gray-600 mt-1">{project.description}</p>
                    )}
                    {project.technologies.length > 0 && (
                      <p className="text-sm text-gray-500 mt-1">
                        <span className="font-medium">Technologies:</span> {project.technologies.join(", ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-6">
          {/* Skills */}
          {skills.length > 0 && (
            <section className="bg-gray-50 p-4 rounded">
              <h2 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                Compétences
              </h2>
              <div className="space-y-3">
                {skills.map((group) => (
                  <div key={group.id}>
                    {group.name && (
                      <h3 className="font-semibold text-blue-700 text-xs mb-1">{group.name}</h3>
                    )}
                    <div className="flex flex-wrap gap-1">
                      {group.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-0.5 bg-white border border-gray-200 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <section className="bg-gray-50 p-4 rounded">
              <h2 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                Langues
              </h2>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <div key={lang.id}>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-800">{lang.name}</span>
                    </div>
                    <p className="text-xs text-gray-500">{levelLabels[lang.level]}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section className="bg-gray-50 p-4 rounded">
              <h2 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                Certifications
              </h2>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <p className="font-medium text-gray-800 text-sm">{cert.name}</p>
                    <p className="text-xs text-gray-500">{cert.issuer}</p>
                    {cert.date && (
                      <p className="text-xs text-gray-400">
                        {new Date(cert.date).toLocaleDateString("fr-FR", { 
                          month: "long", 
                          year: "numeric" 
                        })}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
