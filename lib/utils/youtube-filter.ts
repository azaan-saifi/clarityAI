import { Video } from '../actions/youtube'
import { FilterPeriod } from '../../components/dashboard/date-filter'

/**
 * Parse published_at string to a Date object
 * Examples: "14 years ago", "2 months ago", "3 weeks ago", "1 day ago"
 */
function parsePublishedAt(publishedAt: string): Date {
  const now = new Date()
  const parts = publishedAt.toLowerCase().split(' ')
  
  if (parts.length < 3) return now // fallback
  
  const value = parseInt(parts[0])
  const unit = parts[1]
  
  if (isNaN(value)) return now // fallback
  
  const date = new Date(now)
  
  if (unit.startsWith('year')) {
    date.setFullYear(now.getFullYear() - value)
  } else if (unit.startsWith('month')) {
    date.setMonth(now.getMonth() - value)
  } else if (unit.startsWith('week')) {
    date.setDate(now.getDate() - (value * 7))
  } else if (unit.startsWith('day')) {
    date.setDate(now.getDate() - value)
  } else if (unit.startsWith('hour')) {
    date.setHours(now.getHours() - value)
  } else if (unit.startsWith('minute')) {
    date.setMinutes(now.getMinutes() - value)
  }
  
  return date
}

/**
 * Get the start date based on filter period
 */
function getFilterStartDate(period: FilterPeriod): Date {
  const now = new Date()
  const startDate = new Date(now)
  
  switch (period) {
    case 'current_month':
      startDate.setDate(1) // First day of current month
      startDate.setHours(0, 0, 0, 0)
      break
    case 'last_3_months':
      startDate.setMonth(now.getMonth() - 3)
      startDate.setDate(1)
      startDate.setHours(0, 0, 0, 0)
      break
    case 'last_6_months':
      startDate.setMonth(now.getMonth() - 6)
      startDate.setDate(1)
      startDate.setHours(0, 0, 0, 0)
      break
    case 'last_12_months':
      startDate.setMonth(now.getMonth() - 12)
      startDate.setDate(1)
      startDate.setHours(0, 0, 0, 0)
      break
    default:
      startDate.setDate(1)
      startDate.setHours(0, 0, 0, 0)
  }
  
  return startDate
}

/**
 * Calculate total view count for videos based on filter period
 */
export function calculateViewsByPeriod(videos: Video[], period: FilterPeriod): number {
  const filterStartDate = getFilterStartDate(period)
  
  return videos
    .filter(video => {
      const videoPublishedDate = parsePublishedAt(video.published_at)
      return videoPublishedDate >= filterStartDate
    })
    .reduce((total, video) => total + video.view_count, 0)
}

/**
 * Get week-wise view breakdown for current month
 */
function getWeeklyViewBreakdown(videos: Video[]): { labels: string[], data: number[] } {
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()
  
  // Get first day of current month
  const firstDay = new Date(currentYear, currentMonth, 1)
  const weeksInMonth: { start: Date, end: Date, label: string }[] = []
  
  // Generate weeks for current month
  let weekStart = new Date(firstDay)
  let weekNumber = 1
  
  while (weekStart.getMonth() === currentMonth && weekStart <= now) {
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 6)
    
    // Ensure week end doesn't go beyond current month or current date
    if (weekEnd.getMonth() !== currentMonth) {
      weekEnd.setDate(new Date(currentYear, currentMonth + 1, 0).getDate())
    }
    if (weekEnd > now) {
      weekEnd.setTime(now.getTime())
    }
    
    weeksInMonth.push({
      start: new Date(weekStart),
      end: new Date(weekEnd),
      label: `Week ${weekNumber}`
    })
    
    // Move to next week
    weekStart = new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000)
    weekNumber++
  }
  
  // Calculate views for each week
  const weeklyData = weeksInMonth.map(week => {
    return videos
      .filter(video => {
        const videoDate = parsePublishedAt(video.published_at)
        return videoDate >= week.start && videoDate <= week.end
      })
      .reduce((total, video) => total + video.view_count, 0)
  })
  
  return {
    labels: weeksInMonth.map(week => week.label),
    data: weeklyData
  }
}

/**
 * Get monthly view breakdown for specified period
 */
function getMonthlyViewBreakdown(videos: Video[], period: FilterPeriod): { labels: string[], data: number[] } {
  const now = new Date()
  const months: { start: Date, end: Date, label: string }[] = []
  
  let monthsBack = 3
  if (period === 'last_6_months') monthsBack = 6
  if (period === 'last_12_months') monthsBack = 12
  
  // Generate months
  for (let i = monthsBack - 1; i >= 0; i--) {
    const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0)
    
    // Don't go beyond current date
    if (monthEnd > now) {
      monthEnd.setTime(now.getTime())
    }
    
    months.push({
      start: monthStart,
      end: monthEnd,
      label: monthStart.toLocaleDateString('en-US', { month: 'short' })
    })
  }
  
  // Calculate views for each month
  const monthlyData = months.map(month => {
    return videos
      .filter(video => {
        const videoDate = parsePublishedAt(video.published_at)
        return videoDate >= month.start && videoDate <= month.end
      })
      .reduce((total, video) => total + video.view_count, 0)
  })
  
  return {
    labels: months.map(month => month.label),
    data: monthlyData
  }
}

/**
 * Get chart data based on filter period
 */
export function getChartData(videos: Video[], period: FilterPeriod): { labels: string[], data: number[] } {
  if (period === 'current_month') {
    return getWeeklyViewBreakdown(videos)
  } else {
    return getMonthlyViewBreakdown(videos, period)
  }
}

/**
 * Calculate all dashboard metrics based on YouTube views
 */
export function calculateDashboardMetrics(videos: Video[], period: FilterPeriod) {
  const youtubeViews = calculateViewsByPeriod(videos, period)
  
  // Realistic conversion rates based on industry standards
  const websiteVisitors = Math.floor(youtubeViews * 0.044) // ~4.4% click-through rate
  const callsBooked = Math.floor(youtubeViews * 0.002) // ~0.2% conversion to calls
  const callsAccepted = Math.floor(callsBooked * 0.566) // ~56.6% acceptance rate
  const showUps = Math.floor(callsAccepted * 0.867) // ~86.7% show-up rate
  const closes = Math.floor(showUps * 0.269) // ~26.9% close rate
  
  // Calculate percentages for display
  const showUpRate = callsAccepted > 0 ? (showUps / callsAccepted) * 100 : 0
  const acceptanceRate = callsBooked > 0 ? (callsAccepted / callsBooked) * 100 : 0
  
  // Revenue calculation (assuming average deal size)
  const avgDealSize = 4750 // Average deal size in dollars
  const totalRevenue = closes * avgDealSize
  const pifRevenue = Math.floor(totalRevenue * 0.68) // 68% pay in full
  const installmentRevenue = totalRevenue - pifRevenue
  
  return {
    youtubeViews,
    websiteVisitors,
    callsBooked,
    callsAccepted,
    showUps,
    closes,
    showUpRate,
    acceptanceRate,
    totalRevenue,
    pifRevenue,
    installmentRevenue,
    
    // Additional metrics for charts
    showUpStats: [
      { value: showUps, label: "Showed Up" },
      { value: callsAccepted - showUps, label: "No Show" }
    ],
    closesStats: [
      { value: Math.floor(closes * 0.618), label: "High-ticket" }, // ~61.8% high-ticket
      { value: Math.floor(closes * 0.382), label: "Discount" } // ~38.2% discount
    ]
  }
}

/**
 * Calculate metrics for individual video
 */
export function calculateVideoMetrics(video: Video) {
  const views = video.view_count
  
  // Calculate metrics based on realistic conversion rates with some variance
  const basePageVisitRate = 0.044 + (Math.random() - 0.5) * 0.02 // 3.4% - 5.4%
  const baseCallRate = 0.002 + (Math.random() - 0.5) * 0.001 // 0.15% - 0.25%
  
  const pageVisits = Math.floor(views * basePageVisitRate)
  const callsBooked = Math.floor(views * baseCallRate)
  const callsAccepted = Math.floor(callsBooked * (0.566 + (Math.random() - 0.5) * 0.1)) // 51.6% - 61.6%
  const showUps = Math.floor(callsAccepted * (0.867 + (Math.random() - 0.5) * 0.05)) // 84.2% - 89.2%
  const closedDeals = Math.floor(showUps * (0.269 + (Math.random() - 0.5) * 0.1)) // 21.9% - 31.9%
  
  // Revenue calculation
  const avgDealSize = 4750 + (Math.random() - 0.5) * 1000 // $4,250 - $5,250 variance
  const revenue = Math.floor(closedDeals * avgDealSize)
  const revenuePaidInFull = Math.floor(revenue * (0.68 + (Math.random() - 0.5) * 0.1)) // 63% - 73%
  const revenueInstallment = revenue - revenuePaidInFull
  
  // Calculate conversion rates
  const viewsToPageVisits = pageVisits > 0 ? (pageVisits / views) * 100 : 0
  const pageVisitsToBooked = pageVisits > 0 ? (callsBooked / pageVisits) * 100 : 0
  const bookedToClosed = callsBooked > 0 ? (closedDeals / callsBooked) * 100 : 0
  const viewsToClosed = views > 0 ? (closedDeals / views) * 100 : 0
  const revenuePerView = views > 0 ? revenue / views : 0
  
  return {
    pageVisits,
    revenue,
    callsBooked,
    callsAccepted,
    showUps,
    closedDeals,
    conversionRate: {
      viewsToPageVisits,
      pageVisitsToBooked,
      bookedToClosed,
      viewsToClosed,
    },
    revenuePerView,
    revenuePaidInFull,
    revenueInstallment,
  }
} 