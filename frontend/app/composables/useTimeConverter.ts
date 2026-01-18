export const useTimeConverter = () => {
  const convertMinutesToTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    
    return {
      hours,
      minutes: remainingMinutes,
      formatted: `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}`,
      totalHours: minutes / 60
    }
  }
  
  return {
    convertMinutesToTime,
  }
}