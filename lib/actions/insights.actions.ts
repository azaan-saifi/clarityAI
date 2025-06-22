'use server'

import { getVideosInfo, Video } from './youtube.actions'
import { FilterPeriod } from '../../components/dashboard/date-filter'
import { calculateDashboardMetrics, getChartData, calculateVideoMetrics } from '../utils/youtube-filter'

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
 * Parse published_at string to a Date object
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
 * Get current month in YYYY-MM format
 */
function getCurrentMonth(): string {
  const now = new Date()
  return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`
}

/**
 * Get previous period metrics for comparison
 */
function getPreviousPeriodComparison(currentMetrics: ReturnType<typeof calculateDashboardMetrics>, period: FilterPeriod) {
  // Simulate previous period data with realistic variance
  const periodMultipliers = {
    current_month: { label: "vs last month", factor: 0.85 },
    last_3_months: { label: "vs previous 3 months", factor: 0.75 },
    last_6_months: { label: "vs previous 6 months", factor: 0.65 },
    last_12_months: { label: "vs previous 12 months", factor: 0.55 },
  }

  const { label, factor } = periodMultipliers[period]
  
  // Add metric-specific variance
  const calculateChange = (current: number, variance: number) => {
    const previous = current * factor * (0.8 + Math.random() * variance)
    const change = ((current - previous) / previous) * 100
    return {
      previous: Math.floor(previous),
      change: Number(change.toFixed(1)),
      isPositive: change >= 0
    }
  }

  return {
    period: label,
    youtubeViews: calculateChange(currentMetrics.youtubeViews, 0.4),
    websiteVisitors: calculateChange(currentMetrics.websiteVisitors, 0.3),
    callsBooked: calculateChange(currentMetrics.callsBooked, 0.5),
    revenue: calculateChange(currentMetrics.totalRevenue, 0.6),
    conversionRate: calculateChange(
      (currentMetrics.closes / currentMetrics.youtubeViews) * 100, 
      0.3
    )
  }
}

export interface InsightsData {
  period: FilterPeriod
  youtube: {
    total_views: number
    unique_views: number
    top_videos: Array<Video & { metrics: ReturnType<typeof calculateVideoMetrics> }>
  }
  funnel: ReturnType<typeof calculateDashboardMetrics>
  kajabi: {
    month: string
    new_cash_collected: {
      pif: number
      installments: number
    }
    total_cash_collected: number
    high_ticket_closes: {
      pif: number
      installments: number
    }
    discount_closes: {
      pif: number
      installments: number
    }
  }
  cal: {
    month: string
    total_booked: number
    accepted: number
    show_ups: number
    cancelled: number
    video_sources: Array<{
      video_id: string
      video_title: string
      calls_booked: number
      accepted: number
      show_ups: number
      revenue: number
    }>
  }
  trends: ReturnType<typeof getChartData>
  comparison: ReturnType<typeof getPreviousPeriodComparison>
}

/**
 * Collect and aggregate all data needed for AI insights
 */
export async function getInsightsData(period: FilterPeriod): Promise<InsightsData> {
  try {
    const videos = await getVideosInfo()
    const metrics = calculateDashboardMetrics(videos, period)
    const chartData = getChartData(videos, period)
    
    // Filter videos for the selected period
    const filteredVideos = videos.filter(video => {
      const videoDate = parsePublishedAt(video.published_at)
      return videoDate >= getFilterStartDate(period)
    })

    // Get individual video performance
    const videoPerformance = filteredVideos
      .map(video => ({
        ...video,
        metrics: calculateVideoMetrics(video)
      }))
      .sort((a, b) => b.metrics.revenue - a.metrics.revenue)
      .slice(0, 10) // Top 10 videos

    // Mock Kajabi data structure
    const kajabiData = {
      month: getCurrentMonth(),
      new_cash_collected: {
        pif: metrics.pifRevenue,
        installments: metrics.installmentRevenue
      },
      total_cash_collected: metrics.totalRevenue,
      high_ticket_closes: {
        pif: Math.floor(metrics.closes * 0.618 * 0.68),
        installments: Math.floor(metrics.closes * 0.618 * 0.32)
      },
      discount_closes: {
        pif: Math.floor(metrics.closes * 0.382 * 0.68),
        installments: Math.floor(metrics.closes * 0.382 * 0.32)
      }
    }

    // Mock Cal.com data structure
    const calData = {
      month: getCurrentMonth(),
      total_booked: metrics.callsBooked,
      accepted: metrics.callsAccepted,
      show_ups: metrics.showUps,
      cancelled: metrics.callsBooked - metrics.callsAccepted,
      video_sources: videoPerformance.slice(0, 5).map(video => ({
        video_id: video.video_id,
        video_title: video.title,
        calls_booked: video.metrics.callsBooked,
        accepted: video.metrics.callsAccepted,
        show_ups: video.metrics.showUps,
        revenue: video.metrics.revenue
      }))
    }

    // Get comparison data
    const comparison = getPreviousPeriodComparison(metrics, period)

    return {
      period,
      youtube: {
        total_views: metrics.youtubeViews,
        unique_views: Math.floor(metrics.youtubeViews * 0.85), // Assuming 85% unique
        top_videos: videoPerformance
      },
      funnel: metrics,
      kajabi: kajabiData,
      cal: calData,
      trends: chartData,
      comparison
    }
  } catch (error) {
    console.error('Error collecting insights data:', error)
    throw new Error('Failed to collect insights data')
  }
} 