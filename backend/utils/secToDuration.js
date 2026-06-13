// Helper function to convert total seconds to the duration format
function parseDurationSeconds(duration) {
  const parsedDuration = Number.parseInt(duration, 10)
  return Number.isFinite(parsedDuration) && parsedDuration > 0 ? parsedDuration : 0
}

function getCourseTotalDuration(courseContent = []) {
  const totalSeconds = courseContent.reduce((courseTotal, content) => {
    const sectionSeconds = Array.isArray(content?.subSection)
      ? content.subSection.reduce(
          (sectionTotal, subSection) => sectionTotal + parseDurationSeconds(subSection?.timeDuration),
          0
        )
      : 0

    return courseTotal + sectionSeconds
  }, 0)

  return convertSecondsToDuration(totalSeconds)
}

function convertSecondsToDuration(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = Math.floor(totalSeconds % 60)

  if (hours > 0) {
    return seconds > 0 ? `${hours}h ${minutes}m ${seconds}s` : `${hours}h ${minutes}m`
  } else if (minutes > 0) {
    return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`
  } else {
    return `${seconds}s`
  }
}

module.exports = {
  convertSecondsToDuration,
  parseDurationSeconds,
  getCourseTotalDuration,
}