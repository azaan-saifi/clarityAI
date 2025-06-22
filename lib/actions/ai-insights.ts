'use server'

import Anthropic from '@anthropic-ai/sdk'
import { InsightsData } from './insights'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

/**
 * Generate AI insights based on collected funnel data
 */
export async function generateAIInsights(data: InsightsData): Promise<string> {
  try {
    // Try Anthropic Claude API first
    if (process.env.ANTHROPIC_API_KEY) {
      const insights = await generateClaudeInsights(data)
      return insights
    } else {
      console.warn('Anthropic API key not found, using fallback analysis')
      return generateDetailedAnalysis(data)
    }
  } catch (error) {
    console.error('Error generating AI insights:', error)
    
    // Fallback to manual analysis if Claude fails
    console.log('Falling back to manual analysis...')
    const fallbackAnalysis = generateDetailedAnalysis(data)
    return fallbackAnalysis
  }
}

/**
 * Generate insights using Anthropic Claude API
 */
async function generateClaudeInsights(data: InsightsData): Promise<string> {
  const prompt = `
You are an expert business analyst specializing in high-ticket coaching funnels. Analyze the following monthly data and provide actionable insights.

CURRENT MONTH DATA:
- YouTube Total Views: ${data.youtube.total_views}
- Unique Website Visitors: ${data.funnel.websiteVisitors}
- Calls Booked: ${data.funnel.callsBooked}
- Calls Accepted: ${data.funnel.callsAccepted}
- Show-ups: ${data.funnel.showUps}
- Closes: ${data.funnel.closes}
- Revenue: $${data.funnel.totalRevenue}
  - PIF: $${data.kajabi.new_cash_collected.pif}
  - Installments: $${data.kajabi.new_cash_collected.installments}

TOP PERFORMING VIDEOS:
${data.youtube.top_videos.map((video, i) => 
  `${i + 1}. "${video.title}" - ${video.view_count} views, $${video.metrics.revenue} revenue`
).join('\n')}

CONVERSION RATES:
- Views to Calls: ${((data.funnel.callsBooked / data.youtube.total_views) * 100).toFixed(2)}%
- Calls to Accepted: ${((data.funnel.callsAccepted / data.funnel.callsBooked) * 100).toFixed(2)}%
- Show-up Rate: ${data.funnel.showUpRate.toFixed(2)}%
- Close Rate: ${((data.funnel.closes / data.funnel.showUps) * 100).toFixed(2)}%

Please provide:
1. **Executive Summary** (2-3 sentences highlighting key performance)
2. **Key Wins** (what's working well so focus on it and double down on it instead of wasting time on what's not working)
3. **Areas for Improvement** (specific bottlenecks or drop-offs)
4. **Video Performance Analysis** (which videos are driving results)
5. **Actionable Recommendations** (3-5 specific steps as an action plan to improve performance)

Don't use emojis so it can be more professional but also don't make it boring as well, make it engaging.
  `

  const completion = await anthropic.messages.create({
    model: "claude-4-sonnet-20250514",
    max_tokens: 2000,
    temperature: 0.7,
    messages: [{ role: "user", content: prompt }],
  })

  return completion.content[0].type === 'text' ? completion.content[0].text : 'Failed to generate insights'
}

/**
 * Fallback: Generate detailed business analysis based on funnel data
 */
function generateDetailedAnalysis(data: InsightsData): string {
  const { youtube, funnel, kajabi, comparison } = data
  
  // Calculate key metrics
  const overallConversionRate = youtube.total_views > 0 
    ? ((funnel.closes / youtube.total_views) * 100).toFixed(2)
    : '0.00'
  
  const viewsToCallsRate = youtube.total_views > 0 
    ? ((funnel.callsBooked / youtube.total_views) * 100).toFixed(2)
    : '0.00'
  
  const callsToClosesRate = funnel.callsBooked > 0 
    ? ((funnel.closes / funnel.callsBooked) * 100).toFixed(2)
    : '0.00'
  
  const revenuePerView = youtube.total_views > 0 
    ? (funnel.totalRevenue / youtube.total_views).toFixed(2)
    : '0.00'
  
  // Analyze trends
  const revenueChange = comparison.revenue.change
  
  // Get top performing video
  const topVideo = youtube.top_videos[0]
  const topVideoRevenue = topVideo ? topVideo.metrics.revenue : 0
  const topVideoViews = topVideo ? topVideo.view_count : 0
  
  // Identify bottlenecks
  const bottlenecks = []
  if (parseFloat(viewsToCallsRate) < 0.15) {
    bottlenecks.push("Low view-to-call conversion rate")
  }
  if (funnel.showUpRate < 80) {
    bottlenecks.push("Poor show-up rate")
  }
  if (parseFloat(callsToClosesRate) < 20) {
    bottlenecks.push("Low call-to-close conversion")
  }
  
  // Generate period context
  const periodContext = {
    current_month: "this month",
    last_3_months: "the last 3 months", 
    last_6_months: "the last 6 months",
    last_12_months: "the last 12 months"
  }[data.period]

  return `# 🎯 AI-Powered Business Insights

## 📊 Executive Summary

${revenueChange >= 0 ? '🚀' : '📉'} Revenue ${revenueChange >= 0 ? 'increased' : 'decreased'} **${Math.abs(revenueChange)}%** ${comparison.period}, generating **$${funnel.totalRevenue.toLocaleString()}** from **${funnel.closes}** closed deals. Your funnel is converting at **${overallConversionRate}%** overall, generating **$${revenuePerView}** per YouTube view.

${topVideo ? `Your top-performing video "${topVideo.title}" generated **$${topVideoRevenue.toLocaleString()}** from **${topVideoViews.toLocaleString()}** views.` : ''}

---

## 🏆 Key Wins

### Performance Highlights
- **$${funnel.totalRevenue.toLocaleString()}** total revenue generated ${periodContext}
- **${funnel.showUpRate.toFixed(1)}%** show-up rate ${funnel.showUpRate >= 85 ? '(Excellent!)' : funnel.showUpRate >= 75 ? '(Good)' : '(Needs improvement)'}
- **$${kajabi.new_cash_collected.pif.toLocaleString()}** from paid-in-full customers (${((kajabi.new_cash_collected.pif / kajabi.total_cash_collected) * 100).toFixed(1)}% of revenue)
- **${youtube.top_videos.length}** videos driving meaningful results

### Top Performing Content
${youtube.top_videos.slice(0, 3).map((video, index) => 
  `${index + 1}. **"${video.title}"**
   - ${video.view_count.toLocaleString()} views → $${video.metrics.revenue.toLocaleString()} revenue
   - ${video.metrics.callsBooked} calls booked → ${video.metrics.closedDeals} closes`
).join('\n\n')}

---

## ⚠️ Areas for Improvement

### Funnel Analysis
${bottlenecks.length > 0 ? `
**Critical Bottlenecks Identified:**
${bottlenecks.map(bottleneck => `- ${bottleneck}`).join('\n')}
` : '**No major bottlenecks detected** - Your funnel is performing well overall!'}

### Conversion Opportunities
- **View to Call Rate**: ${viewsToCallsRate}% ${parseFloat(viewsToCallsRate) < 0.2 ? '(Industry standard: 0.2-0.5%)' : '(Solid performance)'}
- **Call to Close Rate**: ${callsToClosesRate}% ${parseFloat(callsToClosesRate) < 25 ? '(Target: 25-35%)' : '(Good performance)'}
- **Show-up Rate**: ${funnel.showUpRate.toFixed(1)}% ${funnel.showUpRate < 80 ? '(Target: 85%+)' : '(Excellent)'}

---

## 🎥 Video Performance Analysis

### Revenue Drivers
${youtube.top_videos.slice(0, 2).map(video => {
  const revenuePerView = video.view_count > 0 ? (video.metrics.revenue / video.view_count).toFixed(3) : '0.000'
  return `**"${video.title}"**
- Revenue per view: $${revenuePerView}
- Conversion rate: ${video.view_count > 0 ? ((video.metrics.closedDeals / video.view_count) * 100).toFixed(3) : '0.000'}%
- Total impact: $${video.metrics.revenue.toLocaleString()}`
}).join('\n\n')}

---

## 🚀 Actionable Recommendations

### Immediate Actions (Next 7 Days)
1. **Double Down on Top Content**: Create 2-3 variations of "${topVideo?.title || 'your top-performing video'}" focusing on the same topic/angle
2. **Optimize Call Booking**: ${parseFloat(viewsToCallsRate) < 0.2 ? 'Improve your call-to-action and landing page to boost view-to-call conversion' : 'Test different call booking times and reduce friction in the process'}
3. **Improve Show-ups**: ${funnel.showUpRate < 85 ? 'Implement SMS reminders and confirmation sequences to boost show-up rates' : 'Maintain current show-up strategies - they\'re working well'}

### Strategic Initiatives (Next 30 Days)
1. **Content Amplification**: Repurpose your top 3 videos into different formats (shorts, carousels, email series)
2. **Funnel Optimization**: ${bottlenecks.length > 0 ? 'Focus on fixing the identified bottlenecks' : 'A/B test different closing techniques to improve deal size'}
3. **Lead Quality**: Analyze what makes your top videos attract high-converting leads and replicate those elements

### Growth Opportunities
- **Revenue Potential**: If you achieve industry-standard conversion rates, you could increase revenue by **${calculatePotentialIncrease(data)}%**
- **Scale Focus**: ${youtube.total_views > 50000 ? 'You have good traffic volume - focus on conversion optimization' : 'Increase content production to drive more top-of-funnel traffic'}

---

## 📈 Performance Tracking

**Key Metrics to Monitor:**
- Revenue per view: Currently $${revenuePerView} ${revenueChange >= 0 ? '📈' : '📉'}
- Overall conversion: ${overallConversionRate}%
- Average deal size: $${funnel.totalRevenue > 0 ? Math.floor(funnel.totalRevenue / funnel.closes).toLocaleString() : '0'}

*Next review recommended in 7 days to track improvement progress.*`
}

/**
 * Calculate potential revenue increase
 */
function calculatePotentialIncrease(data: InsightsData): number {
  const industryStandardRate = 0.25
  const potentialCloses = Math.floor(data.youtube.total_views * (industryStandardRate / 100))
  const potentialRevenue = potentialCloses * (data.funnel.totalRevenue / Math.max(data.funnel.closes, 1))
  
  if (data.funnel.totalRevenue === 0) return 0
  
  return Math.floor(((potentialRevenue - data.funnel.totalRevenue) / data.funnel.totalRevenue) * 100)
} 