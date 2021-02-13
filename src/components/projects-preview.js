import React from 'react'
import Section from '../templates/section'
import PropTypes from 'prop-types'
import styles from './projects-preview.module.css'
import Button from './button'

function ProjectsPreview({ projects }) {
  return (
    <Section title="Projects">
      <div className={styles.projectsWrapper}>
        {projects.map((project) => {
          project = project.node
          return (
            <div
              className={styles.projectContainer}
              style={{
                backgroundImage: `url(${project.primaryImage.file.url})`,
              }}
              key={project.name}
            >
              <div className={styles.projectInfo}>
                <h3 className={styles.projectTitle}>{project.name}</h3>
                <p className={styles.projectDescription}>
                  {project.description}
                </p>
                <div className={styles.projectButtonContainer}>
                  <Button href={`/projects#${project.name}`}>Learn More</Button>
                  <Button href={`${project.projectUrl}`} target="_blank">
                    Demo
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className={styles.moreProjects}>
        <Button href="/projects" fontSize={20}>
          More Projects
        </Button>
      </div>
    </Section>
  )
}

ProjectsPreview.propTypes = {
  projects: PropTypes.array,
}
export default ProjectsPreview
