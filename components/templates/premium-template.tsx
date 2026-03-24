import type { CVSections } from "@/types/cv"
import { formatDateRange } from "@/lib/cv-utils"

interface PremiumTemplateProps {
  sections: CVSections
}

const levelLabels: Record<string, string> = {
  native: "Natif",
  fluent: "Courant",
  advanced: "Avancé",
  intermediate: "Intermédiaire",
  basic: "Basique",
}

const levelWidth: Record<string, string> = {
  native: "w-full",
  fluent: "w-[90%]",
  advanced: "w-[75%]",
  intermediate: "w-[50%]",
  basic: "w-[25%]",
}

export function PremiumTemplate({ sections }: PremiumTemplateProps) {
  const { profile, experiences, education, skills, languages, projects, certifications } = sections

  return (
    <div className="min-h-full font-sans text-sm bg-gradient-to-br from-slate-50 to-white">
      {/* Premium Header with gradient */}
      <header className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white p-10">
        <h1 className="text-4xl font-bold mb-2">
          {profile.name || "Votre Nom"}
        </h1>
        {profile.title && (
          <p className="text-xl text-violet-200 font-medium mb-4">{profile.title}</p>
        )}
        <div className="flex flex-wrap gap-6 text-sm text-violet-100">
          {profile.email && (
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {profile.email}
            </span>
          )}
          {profile.phone && (
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {profile.phone}
            </span>
          )}
          {profile.location && (
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {profile.location}
            </span>
          )}
          {profile.linkedin && (
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              {profile.linkedin}
            </span>
          )}
        </div>
      </header>

      <div className="p-10">
        {/* Summary */}
        {profile.summary && (
          <section className="mb-8">
            <p className="text-gray-600 text-base leading-relaxed border-l-4 border-violet-300 pl-4 italic">
              {profile.summary}
            </p>
          </section>
        )}

        <div className="grid grid-cols-5 gap-10">
          {/* Main Content */}
          <div className="col-span-3 space-y-8">
            {/* Experience */}
            {experiences.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-violet-700 mb-4 flex items-center gap-3">
                  <span className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  Expérience Professionnelle
                </h2>
                <div className="space-y-6 ml-5 border-l-2 border-violet-100 pl-8">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="relative">
                      <span className="absolute -left-[41px] top-1 w-3 h-3 bg-violet-400 rounded-full border-2 border-white" />
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <h3 className="font-bold text-gray-800">{exp.position}</h3>
                          <p className="text-violet-600 font-medium">{exp.company}</p>
                          {exp.location && <p className="text-sm text-gray-500">{exp.location}</p>}
                        </div>
                        {exp.startDate && (
                          <span className="text-xs font-medium text-white bg-violet-500 px-2 py-1 rounded-full">
                            {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                          </span>
                        )}
                      </div>
                      {exp.description && (
                        <p className="text-gray-600 mt-2">{exp.description}</p>
                      )}
                      {exp.highlights.length > 0 && (
                        <ul className="mt-2 space-y-1">
                          {exp.highlights.map((hl, i) => (
                            <li key={i} className="text-gray-600 flex items-start gap-2">
                              <span className="text-violet-400 mt-0.5">✦</span>
                              {hl}
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
                <h2 className="text-lg font-bold text-violet-700 mb-4 flex items-center gap-3">
                  <span className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                  </span>
                  Formation
                </h2>
                <div className="space-y-4 ml-5 border-l-2 border-violet-100 pl-8">
                  {education.map((edu) => (
                    <div key={edu.id} className="relative">
                      <span className="absolute -left-[41px] top-1 w-3 h-3 bg-violet-400 rounded-full border-2 border-white" />
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-gray-800">
                            {edu.degree}{edu.field && ` — ${edu.field}`}
                          </h3>
                          <p className="text-violet-600">{edu.institution}</p>
                          {edu.gpa && <p className="text-sm text-gray-500">{edu.gpa}</p>}
                        </div>
                        {edu.startDate && (
                          <span className="text-xs font-medium text-white bg-violet-500 px-2 py-1 rounded-full">
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
                <h2 className="text-lg font-bold text-violet-700 mb-4 flex items-center gap-3">
                  <span className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                  </span>
                  Projets
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {projects.map((project) => (
                    <div key={project.id} className="p-4 bg-gradient-to-br from-violet-50 to-white rounded-lg border border-violet-100">
                      <h3 className="font-bold text-gray-800">{project.name}</h3>
                      {project.description && (
                        <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                      )}
                      {project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {project.technologies.map((tech, i) => (
                            <span key={i} className="text-xs px-2 py-0.5 bg-violet-100 text-violet-700 rounded-full">
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

          {/* Sidebar */}
          <div className="col-span-2 space-y-6">
            {/* Skills */}
            {skills.length > 0 && (
              <section className="p-5 bg-gradient-to-br from-violet-50 to-white rounded-xl border border-violet-100">
                <h2 className="font-bold text-violet-700 mb-4">Compétences</h2>
                <div className="space-y-4">
                  {skills.map((group) => (
                    <div key={group.id}>
                      {group.name && (
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">{group.name}</h3>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {group.skills.map((skill, i) => (
                          <span key={i} className="text-xs px-3 py-1 bg-white border border-violet-200 rounded-full text-gray-700">
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
              <section className="p-5 bg-gradient-to-br from-violet-50 to-white rounded-xl border border-violet-100">
                <h2 className="font-bold text-violet-700 mb-4">Langues</h2>
                <div className="space-y-3">
                  {languages.map((lang) => (
                    <div key={lang.id}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-gray-700">{lang.name}</span>
                        <span className="text-xs text-gray-500">{levelLabels[lang.level]}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className={`h-full bg-gradient-to-r from-violet-400 to-indigo-500 ${levelWidth[lang.level]}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <section className="p-5 bg-gradient-to-br from-violet-50 to-white rounded-xl border border-violet-100">
                <h2 className="font-bold text-violet-700 mb-4">Certifications</h2>
                <div className="space-y-3">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="flex items-start gap-3">
                      <span className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </span>
                      <div>
                        <p className="font-medium text-gray-800">{cert.name}</p>
                        <p className="text-xs text-gray-500">{cert.issuer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
